# Hayop Kalinga Tier 1 appointment intake

This bound Google Apps Script accepts **server-mediated** appointment requests and appends them to the `Appointment Requests` tab with a `Pending staff review` status. It never creates a calendar event or represents a request as confirmed.

## One-time deployment

1. Open the client-approved appointment request Sheet, then choose **Extensions → Apps Script**.
2. Replace the default `Code.gs` with the supplied `Code.gs` file and replace the manifest with `appsscript.json`.
3. In **Project Settings → Script properties**, add `APPOINTMENT_INTAKE_SECRET` with a long random value. Do not put this value in the script source or public website code.
4. Choose **Deploy → New deployment → Web app**. Set **Execute as** to the deploying account and set access so the website's server can call it. Deploy and authorize the requested spreadsheet permissions.
5. Copy the `/exec` web-app URL. It and the shared secret will be stored as project secrets, used only on the server, and never delivered to visitors.

## Request columns

The handler writes a UTC timestamp, request ID, `Pending staff review` status, contact and pet details, care path, preferred date, request context, consent, source, and blank staff-only follow-up columns. Keep Sheet editing limited to approved clinic staff.
***
