BEGIN;

CREATE INDEX IF NOT EXISTS idx_emotion_records_user_created_at
ON emotion_records (user_id, created_at DESC);

COMMIT;
