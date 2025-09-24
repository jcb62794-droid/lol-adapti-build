export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      champions: {
        Row: {
          abilities: Json | null
          ban_rate: number
          counters: string[] | null
          created_at: string
          difficulty: number
          id: string
          image: string | null
          name: string
          pick_rate: number
          recommended_items: string[]
          role: string
          stats: Json | null
          strong_against: string[] | null
          tags: string[]
          tier: string
          title: string | null
          updated_at: string
          win_rate: number
        }
        Insert: {
          abilities?: Json | null
          ban_rate: number
          counters?: string[] | null
          created_at?: string
          difficulty: number
          id?: string
          image?: string | null
          name: string
          pick_rate: number
          recommended_items: string[]
          role: string
          stats?: Json | null
          strong_against?: string[] | null
          tags: string[]
          tier: string
          title?: string | null
          updated_at?: string
          win_rate: number
        }
        Update: {
          abilities?: Json | null
          ban_rate?: number
          counters?: string[] | null
          created_at?: string
          difficulty?: number
          id?: string
          image?: string | null
          name?: string
          pick_rate?: number
          recommended_items?: string[]
          role?: string
          stats?: Json | null
          strong_against?: string[] | null
          tags?: string[]
          tier?: string
          title?: string | null
          updated_at?: string
          win_rate?: number
        }
        Relationships: []
      }
      items: {
        Row: {
          active: string | null
          build_rate: number | null
          builds_from: string[] | null
          builds_into: string[] | null
          categories: string[]
          cost: number
          created_at: string
          damage_type: string
          description: string | null
          id: string
          image: string | null
          name: string
          passive: string | null
          stats: Json | null
          tags: string[]
          tier: string
          updated_at: string
          win_rate: number | null
        }
        Insert: {
          active?: string | null
          build_rate?: number | null
          builds_from?: string[] | null
          builds_into?: string[] | null
          categories: string[]
          cost: number
          created_at?: string
          damage_type: string
          description?: string | null
          id?: string
          image?: string | null
          name: string
          passive?: string | null
          stats?: Json | null
          tags: string[]
          tier: string
          updated_at?: string
          win_rate?: number | null
        }
        Update: {
          active?: string | null
          build_rate?: number | null
          builds_from?: string[] | null
          builds_into?: string[] | null
          categories?: string[]
          cost?: number
          created_at?: string
          damage_type?: string
          description?: string | null
          id?: string
          image?: string | null
          name?: string
          passive?: string | null
          stats?: Json | null
          tags?: string[]
          tier?: string
          updated_at?: string
          win_rate?: number | null
        }
        Relationships: []
      }
      match_analysis: {
        Row: {
          ally_team: Json | null
          analysis_data: Json | null
          champion_name: string
          confidence_score: number | null
          counter_picks: string[] | null
          created_at: string
          enemy_team: Json
          id: string
          recommended_build: Json
          user_id: string | null
          user_lane: string
        }
        Insert: {
          ally_team?: Json | null
          analysis_data?: Json | null
          champion_name: string
          confidence_score?: number | null
          counter_picks?: string[] | null
          created_at?: string
          enemy_team: Json
          id?: string
          recommended_build: Json
          user_id?: string | null
          user_lane: string
        }
        Update: {
          ally_team?: Json | null
          analysis_data?: Json | null
          champion_name?: string
          confidence_score?: number | null
          counter_picks?: string[] | null
          created_at?: string
          enemy_team?: Json
          id?: string
          recommended_build?: Json
          user_id?: string | null
          user_lane?: string
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
