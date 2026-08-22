# Paws+Pine Tier 1 appointment-request intake

This bound Google Apps Script accepts **server-mediated appointment requests only**. It appends valid requests to `Appointment Requests` with `Pending staff review`; it never creates a calendar event or confirms an appointment.

## One-time deployment

1. Open [Paws+Pine Tier 1 Appointment Requests](https://docs.google.com/spreadsheets/d/1pKfxKgk2tzNaXRzyFKjFTuiVacrmxlvTR6NMbyoUlIw/edit), then choose **Extensions → Apps Script**.
2. Replace the default `Code.gs` with the supplied `Code.gs` file and replace the manifest with `appsscript.json`.
3. In **Project Settings → Script properties**, add `APPOINTMENT_INTAKE_SECRET` with a long random value. Do not put this value in the script source or public website code.
4. Choose **Deploy → New deployment → Web app**. Set **Execute as** to the deploying account and set access so the website's server can call it. Deploy and authorize the requested spreadsheet permissions.
5. Copy the `/exec` web-app URL. It and the shared secret will be stored as project secrets, used only on the server, and never delivered to visitors.

## Appointment request columns

The handler writes a UTC timestamp, request ID, `Pending staff review` status, contact and pet details, care path, preferred date, request context, consent, source, and blank staff-only follow-up columns. Keep Sheet editing limited to approved clinic staff.

## Reviews

The homepage Reviews form has no Google Sheet, server, or external storage path. It shows a submitted review only in the visitor’s current browser session and clears it on refresh. The form never sends the review email, name, rating, or review text to Apps Script.
