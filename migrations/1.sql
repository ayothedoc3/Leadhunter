
CREATE TABLE leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  platform TEXT NOT NULL,
  username TEXT,
  channel_name TEXT NOT NULL,
  channel_url TEXT NOT NULL,
  follower_count INTEGER,
  bio TEXT,
  email TEXT,
  keywords_matched TEXT,
  is_qualified BOOLEAN DEFAULT 1,
  is_exported BOOLEAN DEFAULT 0,
  scraped_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE scraping_runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  platform TEXT NOT NULL,
  keywords TEXT NOT NULL,
  min_followers INTEGER,
  max_followers INTEGER,
  total_found INTEGER DEFAULT 0,
  total_qualified INTEGER DEFAULT 0,
  status TEXT DEFAULT 'running',
  error_message TEXT,
  apify_cost_credits REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dm_campaigns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  platform TEXT NOT NULL,
  message_template TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  total_leads INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0,
  success_count INTEGER DEFAULT 0,
  failed_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dm_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  campaign_id INTEGER NOT NULL,
  lead_id INTEGER NOT NULL,
  platform TEXT NOT NULL,
  recipient_username TEXT NOT NULL,
  message_content TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  apify_run_id TEXT,
  error_message TEXT,
  sent_at DATETIME,
  delivered_at DATETIME,
  read_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (campaign_id) REFERENCES dm_campaigns(id),
  FOREIGN KEY (lead_id) REFERENCES leads(id)
);

CREATE TABLE instagram_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  session_cookie TEXT NOT NULL,
  username TEXT,
  is_active BOOLEAN DEFAULT 1,
  last_used_at DATETIME,
  daily_dm_count INTEGER DEFAULT 0,
  rate_limit_reset_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
