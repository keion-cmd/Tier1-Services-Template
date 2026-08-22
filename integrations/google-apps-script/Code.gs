const APPOINTMENT_SHEET_NAME = 'Appointment Requests';
const APPOINTMENT_STATUS = 'Pending staff review';

function doPost(event) {
  try {
    const payload = JSON.parse(event?.postData?.contents || '{}');
    const expectedSecret = PropertiesService.getScriptProperties().getProperty('APPOINTMENT_INTAKE_SECRET');

    if (!expectedSecret || payload.intakeSecret !== expectedSecret) {
      return jsonResponse({ ok: false, error: 'unauthorized' });
    }

    const request = payload.request || {};
    const required = ['name', 'email', 'phone', 'petName', 'message'];
    const missing = required.filter((key) => !normalise(request[key]));
    if (missing.length) {
      return jsonResponse({ ok: false, error: 'missing_required_fields', fields: missing });
    }

    const lock = LockService.getScriptLock();
    if (!lock.tryLock(5000)) {
      return jsonResponse({ ok: false, error: 'temporarily_unavailable' });
    }

    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(APPOINTMENT_SHEET_NAME);
      if (!sheet) {
        return jsonResponse({ ok: false, error: 'sheet_not_found' });
      }

      const requestId = Utilities.getUuid();
      sheet.appendRow([
        new Date().toISOString(),
        requestId,
        APPOINTMENT_STATUS,
        normalise(request.name, 120),
        normalise(request.email, 254),
        normalise(request.phone, 60),
        normalise(request.petName, 120),
        normalise(request.service, 120),
        normalise(request.preferredDate, 32),
        normalise(request.message, 2000),
        request.consentConfirmed === true ? 'Yes' : 'No',
        'Hayop Kalinga website',
        '',
        ''
      ]);
      return jsonResponse({ ok: true, requestId, status: APPOINTMENT_STATUS });
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: 'invalid_request' });
  }
}

function normalise(value, maxLength) {
  const text = String(value || '').trim();
  return maxLength ? text.slice(0, maxLength) : text;
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
