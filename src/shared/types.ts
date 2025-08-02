import z from "zod";

// Lead data schema
export const LeadSchema = z.object({
  id: z.number(),
  platform: z.string(),
  username: z.string().nullable(),
  channel_name: z.string(),
  channel_url: z.string(),
  follower_count: z.number().nullable(),
  bio: z.string().nullable(),
  email: z.string().nullable(),
  keywords_matched: z.string().nullable(),
  is_qualified: z.boolean(),
  is_exported: z.boolean(),
  scraped_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Lead = z.infer<typeof LeadSchema>;

// Scraping run schema
export const ScrapingRunSchema = z.object({
  id: z.number(),
  platform: z.string(),
  keywords: z.string(),
  min_followers: z.number(),
  max_followers: z.number(),
  total_found: z.number(),
  total_qualified: z.number(),
  status: z.string(),
  error_message: z.string().nullable(),
  apify_cost_credits: z.number().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type ScrapingRun = z.infer<typeof ScrapingRunSchema>;

// API request schemas
export const StartScrapingRequestSchema = z.object({
  platform: z.enum(['youtube', 'instagram', 'skool', 'whop']),
  keywords: z.array(z.string()).min(1),
  min_followers: z.number().min(0).default(5000),
  max_followers: z.number().max(1000000).default(100000),
  limit: z.number().min(1).max(1000).default(50),
  session_ids: z.array(z.string()).optional(),
});

export type StartScrapingRequest = z.infer<typeof StartScrapingRequestSchema>;

export const ExportLeadsRequestSchema = z.object({
  lead_ids: z.array(z.number()),
  format: z.enum(['csv', 'json']).default('csv'),
});

export type ExportLeadsRequest = z.infer<typeof ExportLeadsRequestSchema>;

// DM Campaign schema
export const DMCampaignSchema = z.object({
  id: z.number(),
  name: z.string(),
  platform: z.string(),
  message_template: z.string(),
  status: z.string(),
  total_leads: z.number(),
  sent_count: z.number(),
  success_count: z.number(),
  failed_count: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type DMCampaign = z.infer<typeof DMCampaignSchema>;

// DM Message schema
export const DMMessageSchema = z.object({
  id: z.number(),
  campaign_id: z.number(),
  lead_id: z.number(),
  platform: z.string(),
  recipient_username: z.string(),
  message_content: z.string(),
  status: z.string(),
  apify_run_id: z.string().nullable(),
  error_message: z.string().nullable(),
  sent_at: z.string().nullable(),
  delivered_at: z.string().nullable(),
  read_at: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type DMMessage = z.infer<typeof DMMessageSchema>;

// Instagram Session schema
export const InstagramSessionSchema = z.object({
  id: z.number(),
  session_id: z.string(),
  session_cookie: z.string(),
  username: z.string().nullable(),
  is_active: z.boolean(),
  last_used_at: z.string().nullable(),
  daily_dm_count: z.number(),
  rate_limit_reset_at: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type InstagramSession = z.infer<typeof InstagramSessionSchema>;

// API request schemas for DM functionality
export const CreateDMCampaignRequestSchema = z.object({
  name: z.string().min(1),
  platform: z.enum(['instagram']),
  message_template: z.string().min(1),
  lead_ids: z.array(z.number()).min(1),
});

export type CreateDMCampaignRequest = z.infer<typeof CreateDMCampaignRequestSchema>;

export const SendDMsRequestSchema = z.object({
  campaign_id: z.number(),
  session_ids: z.array(z.string()).min(1),
  batch_size: z.number().min(1).max(50).default(10),
  delay_between_messages: z.number().min(5).max(300).default(30), // seconds
});

export type SendDMsRequest = z.infer<typeof SendDMsRequestSchema>;

export const AddInstagramSessionRequestSchema = z.object({
  session_id: z.string().min(1),
  session_cookie: z.string().min(1),
  username: z.string().optional(),
});

export type AddInstagramSessionRequest = z.infer<typeof AddInstagramSessionRequestSchema>;

// Predefined target keywords
export const TARGET_KEYWORDS = [
  'Coach',
  'Mentor', 
  'Guru',
  'Onlinecoach',
  'DM me',
  'DM',
  'Entrepreneur',
  'Fitness',
  'Dating',
  'CEO',
  'Business coach',
  'Life coach',
  'Fitness coach',
  'Dating coach',
  'Mindset coach',
  'Sales coach',
  'Marketing guru',
  'FBA mentor',
  'Dropshipping',
  'E-commerce'
];

// Platform configuration
export const PLATFORM_CONFIG = {
  youtube: {
    name: 'YouTube',
    actor: 'apify/youtube-channel-scraper',
    description: 'Scrape YouTube channels and creators'
  },
  instagram: {
    name: 'Instagram', 
    actor: 'apify/instagram-scraper',
    description: 'Scrape Instagram profiles and posts'
  },
  skool: {
    name: 'Skool',
    actor: 'apify/web-scraper',
    description: 'Scrape Skool community members'
  },
  whop: {
    name: 'Whop',
    actor: 'apify/web-scraper', 
    description: 'Scrape Whop marketplace creators'
  }
};
