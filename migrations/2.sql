-- Add settings table for storing configuration
CREATE TABLE settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  encrypted BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO settings (key, value, encrypted) VALUES 
('apify_api_token', '', 1),
('apify_actors_youtube_comments', 'dtrungtin/youtube-comments-scraper', 0),
('apify_actors_instagram_profile', 'apify/instagram-profile-scraper', 0),
('apify_actors_instagram_dm', 'custom/instagram-dm-sender', 0);