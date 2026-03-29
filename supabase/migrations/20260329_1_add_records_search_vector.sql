BEGIN;

CREATE EXTENSION IF NOT EXISTS unaccent;

ALTER TABLE emotion_records
ADD COLUMN IF NOT EXISTS search_document tsvector;

CREATE OR REPLACE FUNCTION public.update_emotion_records_search_document()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.search_document :=
    to_tsvector(
      'simple',
      unaccent(
        concat_ws(
          ' ',
          coalesce(NEW.story, ''),
          coalesce(NEW.reaction, ''),
          coalesce(NEW.results, ''),
          coalesce(NEW.feelings, ''),
          coalesce(NEW.expect, ''),
          coalesce(NEW.actions, '')
        )
      )
    );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS update_emotion_records_search_document ON emotion_records;

CREATE TRIGGER update_emotion_records_search_document
BEFORE INSERT OR UPDATE OF story, reaction, results, feelings, expect, actions
ON emotion_records
FOR EACH ROW
EXECUTE FUNCTION public.update_emotion_records_search_document();

UPDATE emotion_records
SET search_document =
  to_tsvector(
    'simple',
    unaccent(
      concat_ws(
        ' ',
        coalesce(story, ''),
        coalesce(reaction, ''),
        coalesce(results, ''),
        coalesce(feelings, ''),
        coalesce(expect, ''),
        coalesce(actions, '')
      )
    )
  )
WHERE search_document IS NULL;

CREATE INDEX IF NOT EXISTS idx_emotion_records_search_document
ON emotion_records
USING GIN (search_document);

CREATE OR REPLACE FUNCTION public.search_emotion_records_paginated(
  p_user_id uuid,
  p_locale text DEFAULT NULL,
  p_start_date timestamptz DEFAULT NULL,
  p_end_date timestamptz DEFAULT NULL,
  p_keyword_query text DEFAULT NULL,
  p_matching_card_ids int[] DEFAULT NULL,
  p_page int DEFAULT 1,
  p_per_page int DEFAULT 10
)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  story text,
  reaction text,
  results text,
  feelings text,
  expect text,
  actions text,
  card_1_id int,
  card_2_id int,
  card_3_id int,
  before_level_1 int,
  before_level_2 int,
  before_level_3 int,
  after_level_1 int,
  after_level_2 int,
  after_level_3 int,
  is_shared boolean,
  created_at timestamptz,
  updated_at timestamptz,
  total_count bigint
)
LANGUAGE sql
STABLE
AS $$
  WITH filtered_records AS (
    SELECT
      er.*
    FROM emotion_records er
    WHERE er.user_id = p_user_id
      AND (p_start_date IS NULL OR er.created_at >= p_start_date)
      AND (p_end_date IS NULL OR er.created_at <= p_end_date)
      AND (
        NULLIF(trim(coalesce(p_keyword_query, '')), '') IS NULL
        OR er.search_document @@ websearch_to_tsquery('simple', unaccent(p_keyword_query))
        OR (
          coalesce(array_length(p_matching_card_ids, 1), 0) > 0
          AND (
            er.card_1_id = ANY(p_matching_card_ids)
            OR er.card_2_id = ANY(p_matching_card_ids)
            OR er.card_3_id = ANY(p_matching_card_ids)
          )
        )
      )
  ),
  counted_records AS (
    SELECT
      fr.*,
      COUNT(*) OVER () AS total_count
    FROM filtered_records fr
  )
  SELECT
    cr.id,
    cr.user_id,
    cr.story,
    cr.reaction,
    cr.results,
    cr.feelings,
    cr.expect,
    cr.actions,
    cr.card_1_id,
    cr.card_2_id,
    cr.card_3_id,
    cr.before_level_1,
    cr.before_level_2,
    cr.before_level_3,
    cr.after_level_1,
    cr.after_level_2,
    cr.after_level_3,
    cr.is_shared,
    cr.created_at,
    cr.updated_at,
    cr.total_count
  FROM counted_records cr
  ORDER BY cr.created_at DESC
  LIMIT GREATEST(coalesce(p_per_page, 10), 1)
  OFFSET GREATEST(coalesce(p_page, 1) - 1, 0) * GREATEST(coalesce(p_per_page, 10), 1);
$$;

COMMIT;
