-- =============================================================================
-- [BUSINESS_NAME] — SUPABASE DATABASE SCHEMA
-- Run this in: Supabase Dashboard > SQL Editor > New Query
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- TABLE 1: bookings — primary record for every booking-modal submission
-- =============================================================================
CREATE TABLE IF NOT EXISTS bookings (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reference           TEXT NOT NULL UNIQUE DEFAULT ('BK-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8))),
  full_name           TEXT NOT NULL CHECK (char_length(full_name) >= 2),
  phone               TEXT NOT NULL,
  email               TEXT NOT NULL CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  service_interest    TEXT NOT NULL,
  insurance_provider  TEXT NOT NULL,
  other_insurance     TEXT,
  notes               TEXT NOT NULL,
  status              TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'cancelled')),
  sms_consent         BOOLEAN NOT NULL DEFAULT FALSE,
  sms_consent_timestamp TIMESTAMPTZ,
  page_source         TEXT,
  synced_to_sheets    BOOLEAN NOT NULL DEFAULT FALSE,
  sheets_sync_at      TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created ON bookings(created_at DESC);

-- =============================================================================
-- TABLE 2: appointments — lightweight lead-tracking mirror of bookings, kept
-- separate so a CRM/ops team can update scheduling status without touching the
-- raw booking submission.
-- =============================================================================
CREATE TABLE IF NOT EXISTS appointments (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  booking_id     UUID REFERENCES bookings(id) ON DELETE SET NULL,
  first_name     TEXT,
  last_name      TEXT,
  phone          TEXT,
  email          TEXT,
  service        TEXT,
  insurance      TEXT,
  message        TEXT,
  page_source    TEXT,
  status         TEXT NOT NULL DEFAULT 'New Lead'
);

CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_created ON appointments(created_at DESC);

-- =============================================================================
-- TABLE 3: chat_interactions — one row per chat session, upserted as the
-- conversation progresses; captures lead-capture info and outcome.
-- =============================================================================
CREATE TABLE IF NOT EXISTS chat_interactions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_id     TEXT NOT NULL UNIQUE,
  lead_name      TEXT,
  lead_phone     TEXT,
  message_count  INTEGER NOT NULL DEFAULT 0,
  converted      BOOLEAN NOT NULL DEFAULT FALSE,
  transcript     JSONB
);

CREATE INDEX IF NOT EXISTS idx_chat_interactions_session ON chat_interactions(session_id);

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================
ALTER TABLE bookings          ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments      ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_interactions ENABLE ROW LEVEL SECURITY;

-- Public inserts are not allowed directly — all writes go through the API
-- routes using the service-role key (supabaseAdmin), which bypasses RLS.
-- No anon policies are defined, so the anon client is read-only-by-default
-- (and in fact has no SELECT policies either, since none of this data is
-- rendered publicly).
