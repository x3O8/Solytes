import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { saveEnquiry } from '../lib/enquiries.ts';
const payload = {
  id: '7d874226-27da-4c2e-83ed-d4a9829a1ea4',
  name: 'Test enquiry',
  phone: '+91 90000 00000',
  email: 'test@example.com',
  interest: 'Rooftop solar',
  message: '=1+1',
  source: '/contact',
};
const settings = {
  url: 'https://script.google.com/macros/s/test/exec',
  token: 'test-secret',
};
const request = (body = payload, origin = 'https://solytes.com') =>
  new Request('https://solytes.com/api/enquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: origin },
    body: JSON.stringify(body),
  });
await test('only acknowledges the exact saved submission', async () => {
  const result = await saveEnquiry(request(), settings, async (url, init) => {
    assert.equal(new URL(url).hostname, 'script.google.com');
    assert.equal(JSON.parse(init.body).token, settings.token);
    return Response.json({ ok: true, id: payload.id });
  });
  assert.equal(result.status, 200);
  assert.deepEqual(await result.json(), { ok: true, id: payload.id });
});
await test('never reports success for rejection, mismatched ID, outage or login HTML', async () => {
  for (const mock of [
    async () => Response.json({ ok: false }),
    async () => Response.json({ ok: true, id: 'wrong' }),
    async () => {
      throw new Error('offline');
    },
    async () => new Response('<html>Sign in</html>'),
  ]) {
    assert.equal((await saveEnquiry(request(), settings, mock)).status, 502);
  }
});
await test('validates fields, size, origin, configuration before sending', async () => {
  const never = async () => {
    throw new Error('must not call');
  };
  for (const change of [
    { name: '' },
    { phone: 'abc' },
    { email: 'bad' },
    { id: 'bad' },
    { message: 'a'.repeat(5001) },
  ])
    assert.equal(
      (await saveEnquiry(request({ ...payload, ...change }), settings, never))
        .status,
      400,
    );
  assert.equal(
    (await saveEnquiry(request(payload, 'https://other.test'), settings, never))
      .status,
    403,
  );
  assert.equal((await saveEnquiry(request(), {}, never)).status, 503);
  assert.equal(
    (
      await saveEnquiry(
        request({ ...payload, message: 'a'.repeat(17000) }),
        settings,
        never,
      )
    ).status,
    413,
  );
});
await test('Google receiver writes literal text once and rejects unauthenticated writes', () => {
  const rows = [['headers']];
  let released = 0;
  const context = vm.createContext({
    ContentService: {
      MimeType: { JSON: 'json' },
      createTextOutput: (text) => ({ setMimeType: () => JSON.parse(text) }),
    },
    PropertiesService: {
      getScriptProperties: () => ({ getProperty: () => settings.token }),
    },
    LockService: {
      getScriptLock: () => ({
        waitLock() {},
        releaseLock() {
          released++;
        },
      }),
    },
    SpreadsheetApp: {
      openById: () => ({
        getSheetByName: () => ({
          getLastRow: () => rows.length,
          getRange: () => ({
            setValues: (values) => rows.push(values[0]),
            createTextFinder: (id) => ({
              matchEntireCell: () => ({
                findNext: () => rows.some((value) => value[1] === "'" + id),
              }),
            }),
          }),
        }),
      }),
      flush() {},
    },
  });
  vm.runInContext(
    readFileSync('scripts/google-sheets-enquiries.gs', 'utf8'),
    context,
  );
  context.event = {
    postData: { contents: JSON.stringify({ ...payload, token: 'wrong' }) },
  };
  assert.equal(vm.runInContext('doPost(event).ok', context), false);
  context.event.postData.contents = JSON.stringify({
    ...payload,
    token: settings.token,
  });
  assert.equal(vm.runInContext('doPost(event).ok', context), true);
  assert.equal(vm.runInContext('doPost(event).ok', context), true);
  assert.equal(rows.length, 2);
  assert.equal(rows[1][6], "'=1+1");
  assert.equal(rows[1][3], "'+91 90000 00000");
  assert.equal(released, 2);
});
