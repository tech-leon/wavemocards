/**
 * Shared types for record detail views.
 * Used by RecordDetail, RecordDetailContent, and related components.
 */

export interface CardInfo {
  id: number;
  name: string;
  category_id: number;
  description?: string | null;
  image_path?: string | null;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface RecordData {
  id: string;
  created_at: string;
  card_1_id: number | null;
  card_2_id: number | null;
  card_3_id: number | null;
  before_level_1: number | null;
  before_level_2: number | null;
  before_level_3: number | null;
  after_level_1: number | null;
  after_level_2: number | null;
  after_level_3: number | null;
  story: string | null;
  actions: string | null;
  results: string | null;
  feelings: string | null;
  expect: string | null;
  reaction: string | null;
  card_1: CardInfo | null;
  card_2: CardInfo | null;
  card_3: CardInfo | null;
}

export interface RecordDetailProps {
  recordId: string;
  initialRecord?: RecordData | null;
}
