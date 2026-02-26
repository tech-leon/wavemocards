/**
 * Database Types for Wavemocards
 * Generated based on Supabase schema
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      emotion_categories: {
        Row: {
          id: number;
          name: string;
          slug: string;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          slug: string;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          slug?: string;
          display_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      emotion_cards: {
        Row: {
          id: number;
          category_id: number;
          name: string;
          description: string | null;
          example: string | null;
          image_path: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          category_id: number;
          name: string;
          description?: string | null;
          example?: string | null;
          image_path?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          category_id?: number;
          name?: string;
          description?: string | null;
          example?: string | null;
          image_path?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'emotion_cards_category_id_fkey';
            columns: ['category_id'];
            referencedRelation: 'emotion_categories';
            referencedColumns: ['id'];
          }
        ];
      };
      about_emotions: {
        Row: {
          id: number;
          key: string;
          title: string;
          content: string;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          key: string;
          title: string;
          content: string;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          key?: string;
          title?: string;
          content?: string;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          workos_user_id: string;
          email: string;
          title: string | null;
          first_name: string | null;
          last_name: string | null;
          day_of_birth: string | null;
          gender: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null;
          phone: string | null;
          legacy_user_id: number | null;
          legacy_username: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          workos_user_id: string;
          email: string;
          title?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          day_of_birth?: string | null;
          gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null;
          phone?: string | null;
          legacy_user_id?: number | null;
          legacy_username?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          workos_user_id?: string;
          email?: string;
          title?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          day_of_birth?: string | null;
          gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null;
          phone?: string | null;
          legacy_user_id?: number | null;
          legacy_username?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      emotion_records: {
        Row: {
          id: string;
          user_id: string;
          story: string | null;
          reaction: string | null;
          results: string | null;
          feelings: string | null;
          expect: string | null;
          actions: string | null;
          card_1_id: number | null;
          card_2_id: number | null;
          card_3_id: number | null;
          before_level_1: number | null;
          before_level_2: number | null;
          before_level_3: number | null;
          after_level_1: number | null;
          after_level_2: number | null;
          after_level_3: number | null;
          is_shared: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          story?: string | null;
          reaction?: string | null;
          results?: string | null;
          feelings?: string | null;
          expect?: string | null;
          actions?: string | null;
          card_1_id?: number | null;
          card_2_id?: number | null;
          card_3_id?: number | null;
          before_level_1?: number | null;
          before_level_2?: number | null;
          before_level_3?: number | null;
          after_level_1?: number | null;
          after_level_2?: number | null;
          after_level_3?: number | null;
          is_shared?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          story?: string | null;
          reaction?: string | null;
          results?: string | null;
          feelings?: string | null;
          expect?: string | null;
          actions?: string | null;
          card_1_id?: number | null;
          card_2_id?: number | null;
          card_3_id?: number | null;
          before_level_1?: number | null;
          before_level_2?: number | null;
          before_level_3?: number | null;
          after_level_1?: number | null;
          after_level_2?: number | null;
          after_level_3?: number | null;
          is_shared?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'emotion_records_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'emotion_records_card_1_id_fkey';
            columns: ['card_1_id'];
            referencedRelation: 'emotion_cards';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'emotion_records_card_2_id_fkey';
            columns: ['card_2_id'];
            referencedRelation: 'emotion_cards';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'emotion_records_card_3_id_fkey';
            columns: ['card_3_id'];
            referencedRelation: 'emotion_cards';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// ============================================
// Convenience Types
// ============================================

// Table row types (for reading data)
export type EmotionCategory = Database['public']['Tables']['emotion_categories']['Row'];
export type EmotionCard = Database['public']['Tables']['emotion_cards']['Row'];
export type AboutEmotion = Database['public']['Tables']['about_emotions']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type EmotionRecord = Database['public']['Tables']['emotion_records']['Row'];

// Insert types (for creating data)
export type EmotionCategoryInsert = Database['public']['Tables']['emotion_categories']['Insert'];
export type EmotionCardInsert = Database['public']['Tables']['emotion_cards']['Insert'];
export type AboutEmotionInsert = Database['public']['Tables']['about_emotions']['Insert'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type EmotionRecordInsert = Database['public']['Tables']['emotion_records']['Insert'];

// Update types (for updating data)
export type EmotionCategoryUpdate = Database['public']['Tables']['emotion_categories']['Update'];
export type EmotionCardUpdate = Database['public']['Tables']['emotion_cards']['Update'];
export type AboutEmotionUpdate = Database['public']['Tables']['about_emotions']['Update'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];
export type EmotionRecordUpdate = Database['public']['Tables']['emotion_records']['Update'];

// ============================================
// Extended Types with Relations
// ============================================

/**
 * Emotion card with its category information
 */
export interface EmotionCardWithCategory extends EmotionCard {
  category: EmotionCategory;
}

/**
 * Emotion record with full card information
 */
export interface EmotionRecordWithCards extends EmotionRecord {
  card_1: EmotionCardWithCategory | null;
  card_2: EmotionCardWithCategory | null;
  card_3: EmotionCardWithCategory | null;
}

/**
 * Gender options
 */
export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';

/**
 * Emotion level (1-10 scale)
 */
export type EmotionLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
