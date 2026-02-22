CREATE TABLE IF NOT EXISTS nouns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  singular TEXT NOT NULL,
  article TEXT NOT NULL CHECK (article IN ('der', 'die', 'das')),
  plural TEXT NOT NULL,
  tags TEXT NOT NULL DEFAULT '[]', -- JSON array of tags
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_nouns_article ON nouns(article);
CREATE INDEX IF NOT EXISTS idx_nouns_singular ON nouns(singular);
