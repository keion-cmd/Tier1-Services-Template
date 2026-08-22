# Paws+Pine Tier 1 staff-review intake

This bound Google Apps Script accepts **server-mediated** appointment requests and review submissions. Appointment requests append to `Appointment Requests` with `Pending staff review`; review submissions append to a separate `Review Submissions` tab with `Displayed on website` after the sender selects the required display agreement. The script never creates a calendar event or confirms an appointment.

## One-time deployment

1. Open [Paws+Pine Tier 1 Appointment Requests](https://docs.google.com/spreadsheets/d/1pKfxKgk2tzNaXRzyFKjFTuiVacrmxlvTR6NMbyoUlIw/edit), then choose **Extensions → Apps Script**.
2. Replace the default `Code.gs` with the supplied `Code.gs` file and replace the manifest with `appsscript.json`.
3. In **Project Settings → Script properties**, add `APPOINTMENT_INTAKE_SECRET` with a long random value. Do not put this value in the script source or public website code.
4. Choose **Deploy → New deployment → Web app**. Set **Execute as** to the deploying account and set access so the website's server can call it. Deploy and authorize the requested spreadsheet permissions.
5. Copy the `/exec` web-app URL. It and the shared secret will be stored as project secrets, used only on the server, and never delivered to visitors.

## Appointment request columns

The handler writes a UTC timestamp, request ID, `Pending staff review` status, contact and pet details, care path, preferred date, request context, consent, source, and blank staff-only follow-up columns. Keep Sheet editing limited to approved clinic staff.

## Review submission columns

On the first valid review submission, the script creates the `Review Submissions` tab with UTC timestamp, review ID, displayed-on-website status, name, email, rating, review text, display agreement, source, and staff notes. The public website receives only review ID, name, rating, and review text; it never reads email or staff notes. There are no invented or placeholder reviews.

## Required update before using custom reviews

After copying the updated `Code.gs`, choose **Deploy → Manage deployments → Edit**, select the new version, and redeploy the web app. The existing project endpoint and server-only secret can remain unchanged. Do not use the review form on a production site until that deployment update is complete.
