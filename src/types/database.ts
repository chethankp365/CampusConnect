export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = 'student' | 'organizer' | 'admin';
export type MaterialType = 'notes' | 'question_paper' | 'assignment' | 'syllabus' | 'cheatsheet' | 'project_report';
export type ContentStatus = 'pending' | 'approved' | 'rejected';
export type EventCategory = 'hackathon' | 'workshop' | 'cultural' | 'tech_talk' | 'symposium' | 'competition' | 'webinar';
export type EventMode = 'in_person' | 'online' | 'hybrid';
export type RegistrationStatus = 'registered' | 'waitlisted' | 'cancelled';
export type OpportunityType = 'internship' | 'full_time' | 'hackathon' | 'research' | 'freelance' | 'fellowship';
export type ConnectionStatus = 'pending' | 'accepted' | 'declined' | 'blocked';
export type AttendanceStatus = 'present' | 'absent' | 'cancelled';
export type ApplicationStatus = 'saved' | 'applied' | 'interview' | 'offer' | 'rejected';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type AnnouncementPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Database {
  public: {
    Tables: {
      colleges: {
        Row: {
          id: string;
          name: string;
          city: string;
          state: string;
          email_domain: string | null;
          logo_url: string | null;
          verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['colleges']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['colleges']['Insert']>;
      };
      profiles: {
        Row: {
          id: string;
          full_name: string;
          username: string;
          avatar_url: string | null;
          college_id: string | null;
          course: string | null;
          branch: string | null;
          semester: number | null;
          bio: string | null;
          interests: string[];
          looking_for: string | null;
          github_url: string | null;
          linkedin_url: string | null;
          portfolio_url: string | null;
          role: UserRole;
          is_mentor: boolean;
          is_alumni: boolean;
          xp: number;
          level: number;
          streak_count: number;
          longest_streak: number;
          last_active_date: string;
          is_public: boolean;
          embedding: number[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['profiles']['Row']> & { id: string; full_name: string; username: string };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: string;
          created_at: string;
        };
        Insert: { name: string; category: string };
        Update: Partial<Database['public']['Tables']['skills']['Insert']>;
      };
      profile_skills: {
        Row: {
          id: string;
          profile_id: string;
          skill_id: string;
          level: SkillLevel;
          created_at: string;
        };
        Insert: { profile_id: string; skill_id: string; level?: SkillLevel };
        Update: Partial<Database['public']['Tables']['profile_skills']['Insert']>;
      };
      subjects: {
        Row: {
          id: string;
          name: string;
          code: string | null;
          branch: string | null;
          semester: number | null;
          created_at: string;
        };
        Insert: { name: string; code?: string | null; branch?: string | null; semester?: number | null };
        Update: Partial<Database['public']['Tables']['subjects']['Insert']>;
      };
      study_materials: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          subject_id: string | null;
          college_id: string | null;
          semester: number | null;
          type: MaterialType;
          file_path: string | null;
          external_url: string | null;
          tags: string[];
          ai_summary: string | null;
          uploader_id: string;
          status: ContentStatus;
          downloads: number;
          upvotes: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          description?: string | null;
          subject_id?: string | null;
          college_id?: string | null;
          semester?: number | null;
          type?: MaterialType;
          file_path?: string | null;
          external_url?: string | null;
          tags?: string[];
          ai_summary?: string | null;
          uploader_id: string;
          status?: ContentStatus;
        };
        Update: Partial<Database['public']['Tables']['study_materials']['Insert']>;
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          organizer: string;
          club: string | null;
          college_id: string | null;
          category: EventCategory;
          mode: EventMode;
          venue: string | null;
          online_link: string | null;
          start_time: string;
          end_time: string;
          registration_deadline: string;
          eligibility: string | null;
          capacity: number;
          tags: string[];
          banner_path: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          description: string;
          organizer: string;
          club?: string | null;
          college_id?: string | null;
          category?: EventCategory;
          mode?: EventMode;
          venue?: string | null;
          online_link?: string | null;
          start_time: string;
          end_time: string;
          registration_deadline: string;
          eligibility?: string | null;
          capacity?: number;
          tags?: string[];
          banner_path?: string | null;
          is_published?: boolean;
        };
        Update: Partial<Database['public']['Tables']['events']['Insert']>;
      };
      event_registrations: {
        Row: {
          id: string;
          event_id: string;
          user_id: string;
          status: RegistrationStatus;
          qr_token: string;
          checked_in_at: string | null;
          created_at: string;
        };
        Insert: {
          event_id: string;
          user_id: string;
          status?: RegistrationStatus;
          qr_token?: string;
        };
        Update: Partial<Database['public']['Tables']['event_registrations']['Insert']>;
      };
      certificates: {
        Row: {
          id: string;
          user_id: string;
          event_id: string;
          code: string;
          title: string;
          issuer: string;
          issued_at: string;
        };
        Insert: {
          user_id: string;
          event_id: string;
          code: string;
          title: string;
          issuer: string;
        };
        Update: Partial<Database['public']['Tables']['certificates']['Insert']>;
      };
      announcements: {
        Row: {
          id: string;
          title: string;
          body: string;
          category: string;
          priority: AnnouncementPriority;
          pinned: boolean;
          publisher: string;
          audience_college: string | null;
          audience_branch: string | null;
          audience_semester: number | null;
          attachment_path: string | null;
          expires_at: string | null;
          ai_summary: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          body: string;
          category?: string;
          priority?: AnnouncementPriority;
          pinned?: boolean;
          publisher: string;
          audience_college?: string | null;
          audience_branch?: string | null;
          audience_semester?: number | null;
          attachment_path?: string | null;
          expires_at?: string | null;
          ai_summary?: string | null;
        };
        Update: Partial<Database['public']['Tables']['announcements']['Insert']>;
      };
      opportunities: {
        Row: {
          id: string;
          title: string;
          organization: string;
          type: OpportunityType;
          description: string;
          skills_required: string[];
          eligibility: string | null;
          location: string | null;
          mode: EventMode;
          stipend: string | null;
          deadline: string;
          apply_url: string | null;
          posted_by: string;
          is_active: boolean;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          organization: string;
          type?: OpportunityType;
          description: string;
          skills_required?: string[];
          eligibility?: string | null;
          location?: string | null;
          mode?: EventMode;
          stipend?: string | null;
          deadline: string;
          apply_url?: string | null;
          posted_by: string;
          is_active?: boolean;
          featured?: boolean;
        };
        Update: Partial<Database['public']['Tables']['opportunities']['Insert']>;
      };
      opportunity_tracker: {
        Row: {
          id: string;
          user_id: string;
          opportunity_id: string;
          status: ApplicationStatus;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          opportunity_id: string;
          status?: ApplicationStatus;
          notes?: string | null;
        };
        Update: Partial<Database['public']['Tables']['opportunity_tracker']['Insert']>;
      };
      connections: {
        Row: {
          id: string;
          requester_id: string;
          receiver_id: string;
          status: ConnectionStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          requester_id: string;
          receiver_id: string;
          status?: ConnectionStatus;
        };
        Update: Partial<Database['public']['Tables']['connections']['Insert']>;
      };
      conversations: {
        Row: {
          id: string;
          title: string | null;
          is_group: boolean;
          created_at: string;
        };
        Insert: { title?: string | null; is_group?: boolean };
        Update: Partial<Database['public']['Tables']['conversations']['Insert']>;
      };
      conversation_members: {
        Row: {
          id: string;
          conversation_id: string;
          user_id: string;
          joined_at: string;
        };
        Insert: { conversation_id: string; user_id: string };
        Update: Partial<Database['public']['Tables']['conversation_members']['Insert']>;
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string;
          body: string;
          read_at: string | null;
          created_at: string;
        };
        Insert: { conversation_id: string; sender_id: string; body: string };
        Update: Partial<Database['public']['Tables']['messages']['Insert']>;
      };
      collab_posts: {
        Row: {
          id: string;
          creator_id: string;
          title: string;
          description: string;
          skills_needed: string[];
          team_size: number;
          current_size: number;
          is_open: boolean;
          created_at: string;
        };
        Insert: {
          creator_id: string;
          title: string;
          description: string;
          skills_needed?: string[];
          team_size?: number;
          current_size?: number;
          is_open?: boolean;
        };
        Update: Partial<Database['public']['Tables']['collab_posts']['Insert']>;
      };
      attendance_subjects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          code: string | null;
          color: string;
          min_required: number;
          is_archived: boolean;
          created_at: string;
        };
        Insert: {
          user_id: string;
          name: string;
          code?: string | null;
          color?: string;
          min_required?: number;
          is_archived?: boolean;
        };
        Update: Partial<Database['public']['Tables']['attendance_subjects']['Insert']>;
      };
      attendance_logs: {
        Row: {
          id: string;
          subject_id: string;
          user_id: string;
          date: string;
          status: AttendanceStatus;
          created_at: string;
        };
        Insert: {
          subject_id: string;
          user_id: string;
          date?: string;
          status: AttendanceStatus;
        };
        Update: Partial<Database['public']['Tables']['attendance_logs']['Insert']>;
      };
      points_ledger: {
        Row: {
          id: string;
          user_id: string;
          action: string;
          points: number;
          ref_type: string | null;
          ref_id: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          action: string;
          points: number;
          ref_type?: string | null;
          ref_id?: string | null;
        };
        Update: Partial<Database['public']['Tables']['points_ledger']['Insert']>;
      };
      badges: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string;
          icon: string;
          criteria: Json | null;
          created_at: string;
        };
        Insert: {
          slug: string;
          name: string;
          description: string;
          icon: string;
          criteria?: Json | null;
        };
        Update: Partial<Database['public']['Tables']['badges']['Insert']>;
      };
      user_badges: {
        Row: {
          id: string;
          user_id: string;
          badge_id: string;
          awarded_at: string;
        };
        Insert: { user_id: string; badge_id: string };
        Update: Partial<Database['public']['Tables']['user_badges']['Insert']>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: string;
          link: string | null;
          read: boolean;
          created_at: string;
        };
        Insert: {
          user_id: string;
          title: string;
          message: string;
          type: string;
          link?: string | null;
          read?: boolean;
        };
        Update: Partial<Database['public']['Tables']['notifications']['Insert']>;
      };
    };
  };
}
