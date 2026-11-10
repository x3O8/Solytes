// Paste into Extensions > Apps Script in SOLYTES Website Enquiries.
const SPREADSHEET_ID = '1Jm8y0N3rqHu1cvWvODouUBIcovjsIE-OYZm6z2YFl24';
const TAB = 'Enquiries';
function doPost(event) {
  const json = (value) => ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
  const lock = LockService.getScriptLock();
  let locked = false;
  try {
    const token = PropertiesService.getScriptProperties().getProperty('SOLYTES_WEBHOOK_TOKEN');
    const raw = event && event.postData && event.postData.contents;
    if (!token || !raw || raw.length > 16000) return json({ ok: false });
    const data = JSON.parse(raw);
    if (data.token !== token) return json({ ok: false });
    if (!/^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i.test(data.id)) return json({ ok: false });
    const limits = { name: 120, phone: 40, email: 254, interest: 200, message: 5000, source: 500 };
    for (const key in limits) if (typeof data[key] !== 'string' || !data[key].trim() || data[key].length > limits[key]) return json({ ok: false });
    if (!/^\S+@\S+\.\S+$/.test(data.email)) return json({ ok: false });
    lock.waitLock(15000); locked = true;
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(TAB);
    if (!sheet) return json({ ok: false });
    const last = sheet.getLastRow();
    if (last > 1 && sheet.getRange(2, 2, last - 1, 1).createTextFinder(data.id).matchEntireCell(true).findNext()) return json({ ok: true, id: data.id });
    // Prefix all visitor input to keep phone numbers and formula-like text literal.
    const row = [new Date().toISOString(), data.id, data.name, data.phone, data.email, data.interest, data.message, data.source].map(value => "'" + value);
    sheet.getRange(last + 1, 1, 1, row.length).setValues([row]);
    SpreadsheetApp.flush();
    return json({ ok: true, id: data.id });
  } catch { return json({ ok: false }); }
  finally { if (locked) lock.releaseLock(); }
}
