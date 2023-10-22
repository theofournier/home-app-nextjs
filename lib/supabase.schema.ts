export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      movie_favorites: {
        Row: {
          created_at: string
          id: string
          image_url: string
          is_favorite: boolean
          media_type: string
          movie_id: number
          release_date: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string
          is_favorite?: boolean
          media_type?: string
          movie_id: number
          release_date?: string
          title?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          is_favorite?: boolean
          media_type?: string
          movie_id?: number
          release_date?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "movie_favorites_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
