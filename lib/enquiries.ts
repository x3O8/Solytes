type Settings = { url?: string; token?: string };
const reply = (status: number, body: object) =>
  Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
export async function saveEnquiry(
  request: Request,
  settings: Settings,
  send: typeof fetch = fetch,
) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin)
    return reply(403, { error: 'Submit this form from the SOLYTES website.' });
  if (!request.headers.get('content-type')?.includes('application/json'))
    return reply(415, { error: 'Invalid submission format.' });
  if (Number(request.headers.get('content-length')) > 16000)
    return reply(413, { error: 'Your message is too long.' });
  let data;
  try {
    const reader = request.body?.getReader();
    if (!reader) throw new Error('Missing body');
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16000) {
        await reader.cancel();
        return reply(413, { error: 'Your message is too long.' });
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.length;
    }
    data = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return reply(400, { error: 'Please check the form and try again.' });
  }
  if (!data || typeof data !== 'object')
    return reply(400, { error: 'Invalid enquiry.' });
  const limits = {
    name: 120,
    phone: 40,
    email: 254,
    interest: 200,
    message: 5000,
    source: 500,
  };
  const values: Record<string, string> = {};
  for (const [key, limit] of Object.entries(limits)) {
    if (
      typeof data[key] !== 'string' ||
      !data[key].trim() ||
      data[key].trim().length > limit
    )
      return reply(400, { error: `Please check the ${key} field.` });
    values[key] = data[key].trim();
  }
  if (
    !/^\S+@\S+\.\S+$/.test(values.email) ||
    !/^[+\d\s().-]{7,40}$/.test(values.phone) ||
    values.phone.replace(/\D/g, '').length < 7
  )
    return reply(400, {
      error: 'Enter a valid email address and phone number.',
    });
  if (
    typeof data.id !== 'string' ||
    !/^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i.test(
      data.id,
    )
  )
    return reply(400, { error: 'Please refresh this page and try again.' });
  if (!settings.url || !settings.token)
    return reply(503, {
      error:
        'Online enquiries are temporarily unavailable. Please email info@solytes.com.',
    });
  try {
    const endpoint = new URL(settings.url);
    if (
      endpoint.protocol !== 'https:' ||
      endpoint.hostname !== 'script.google.com' ||
      !/^\/macros\/s\/[^/]+\/exec$/.test(endpoint.pathname)
    )
      throw new Error('Invalid endpoint');
    const result = await send(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, id: data.id, token: settings.token }),
      signal: AbortSignal.timeout(20000),
      redirect: 'follow',
    });
    const saved = (await result.json()) as { ok?: boolean; id?: string } | null;
    if (!result.ok || saved?.ok !== true || saved.id !== data.id)
      throw new Error('Save not confirmed');
    return reply(200, { ok: true, id: data.id });
  } catch {
    return reply(502, {
      error:
        'We could not confirm your enquiry was saved. Your details are still here; please try again.',
    });
  }
}
