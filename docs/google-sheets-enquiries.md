# Activate Google Sheets enquiries

Sheet: https://docs.google.com/spreadsheets/d/1Jm8y0N3rqHu1cvWvODouUBIcovjsIE-OYZm6z2YFl24/edit

The homepage and contact-page forms POST to /api/enquiries. The server validates all fields and sends them to an authenticated Google Apps Script receiver. Success appears only after Google confirms the saved submission ID. Failed requests preserve the form. Retries of the same unchanged submission reuse the ID; the receiver locks the sheet and avoids duplicate rows. Visitor text is stored literally to prevent spreadsheet formula execution. No visitor details are sent until Submit is clicked.

## One-time Google activation

1. Open the sheet, then Extensions > Apps Script.
2. Replace Code.gs with the contents of scripts/google-sheets-enquiries.gs from this repository. Save.
3. Open Project Settings > Script properties. Add SOLYTES_WEBHOOK_TOKEN. Copy its value from SOLYTES_SHEETS_WEBHOOK_TOKEN in the local ignored .env.local file. Keep this value private.
4. Choose Deploy > New deployment > Web app. Execute as yourself. Allow access to Anyone so the website server can call it without an interactive Google sign-in. The script checks the private token before accessing the sheet; the spreadsheet itself stays private. Authorize the script using the account that owns this sheet. If your organization's policy blocks this access mode, use a service-account Sheets API integration instead.
5. Copy the deployment URL ending in /exec and provide it to Codex, or set SOLYTES_SHEETS_WEBHOOK_URL in .env.local yourself.
6. Restart the local server. For the live website, add SOLYTES_SHEETS_WEBHOOK_URL and SOLYTES_SHEETS_WEBHOOK_TOKEN as server environment variables on the actual hosting project, then redeploy. Do not prefix these with NEXT_PUBLIC_ or VITE_. Keep the token out of git and chat.
7. Submit a clearly labelled test enquiry, check its row in Enquiries, and confirm the browser success message. If a request times out, retry without editing the fields; its submission ID prevents duplicate rows during that page session. A page reload or changed fields creates a new enquiry.

Google connector access in this chat does not provide runtime credentials to a deployed website or permission to deploy Google Apps Script, so Google authorization and the /exec URL are still required. Until configured, the form shows a service-unavailable message and does not claim a save.

## Fields

Received at (UTC), submission ID, name, phone, email, interest, message / site details, source page. The source is the pathname only; query strings are not collected. Existing email quote-basket and newsletter flows are separate from the enquiry form.

## Verification

Run `node --test scripts/enquiries.test.mjs`, `npm run lint`, `npx tsc --noEmit`, and `npm run build`. The local tests mock Google, including its lock and sheet append behavior; a real end-to-end check is required after deployment. Apply host-level request rate limits if the public form receives spam; the shared secret authenticates the Google receiver, not visitors to the public form.
