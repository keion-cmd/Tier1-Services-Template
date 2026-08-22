const APPOINTMENT_SHEET_NAME = 'Appointment Requests';
const APPOINTMENT_STATUS = 'Pending staff review';
const REVIEW_SHEET_NAME = 'Review Submissions';
const REVIEW_STATUS = 'Pending staff review';

function doPost(event) {
  try {
    const payload = JSON.parse(event?.postData?.contents || '{}');
    const expectedSecret = PropertiesService.getScriptProperties().getProperty('APPOINTMENT_INTAKE_SECRET');

    if (!expectedSecret || payload.intakeSecret !== expectedSecret) {
      return jsonResponse({ ok: false, error: 'unauthorized' });
    }

    if (payload.kind === 'review') return recordReview(payload.review || {});
    return recordAppointment(payload.request || {});
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: 'invalid_request' });
  }
}

function recordAppointment(request) {
  const required = ['name', 'email', 'phone', 'petName', 'message'];
  const missing = required.filter((key) => !normalise(request[key]));
  if (missing.length) return jsonResponse({ ok: false, error: 'missing_required_fields', fields: missing });

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return jsonResponse({ ok: false, error: 'temporarily_unavailable' });

  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(APPOINTMENT_SHEET_NAME);
    if (!sheet) return jsonResponse({ ok: false, error: 'sheet_not_found' });

    const requestId = Utilities.getUuid();
    sheet.appendRow([
      new Date().toISOString(), requestId, APPOINTMENT_STATUS,
      normalise(request.name, 120), normalise(request.email, 254), normalise(request.phone, 60),
      normalise(request.petName, 120), normalise(request.service, 120), normalise(request.preferredDate, 32),
      normalise(request.message, 2000), request.consentConfirmed === true ? 'Yes' : 'No',
      'Paws+Pine website', '', ''
    ]);
    return jsonResponse({ ok: true, requestId, status: APPOINTMENT_STATUS });
  } finally {
    lock.releaseLock();
  }
}

function recordReview(review) {
  const required = ['name', 'email', 'feedback'];
  const missing = required.filter((key) => !normalise(review[key]));
  const rating = Number(review.rating);
  if (missing.length || !Number.isInteger(rating) || rating < 1 || rating > 5 || review.consentConfirmed !== true) {
    return jsonResponse({ ok: false, error: 'invalid_review_submission', fields: missing });
  }

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return jsonResponse({ ok: false, error: 'temporarily_unavailable' });

  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(REVIEW_SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(REVIEW_SHEET_NAME);
      sheet.appendRow(['UTC Timestamp', 'Review ID', 'Status', 'Name', 'Email', 'Rating', 'Feedback', 'Consent', 'Source', 'Staff Notes', 'Publication Approval']);
      sheet.setFrozenRows(1);
    }
    const requestId = Utilities.getUuid();
    sheet.appendRow([
      new Date().toISOString(), requestId, REVIEW_STATUS,
      normalise(review.name, 120), normalise(review.email, 254), rating,
      normalise(review.feedback, 2000), 'Yes', 'Paws+Pine website', '', 'Pending staff decision'
    ]);
    return jsonResponse({ ok: true, requestId, status: REVIEW_STATUS });
  } finally {
    lock.releaseLock();
  }
}

function normalise(value, maxLength) {
  const text = String(value || '').trim();
  return maxLength ? text.slice(0, maxLength) : text;
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

