import { sql } from "@vercel/postgres";

export async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  await sql`
    CREATE TABLE IF NOT EXISTS progress (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      xp INTEGER DEFAULT 0,
      streak INTEGER DEFAULT 0,
      answered JSONB DEFAULT '{}'::jsonb,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id)
    )`;

  await sql`
    CREATE TABLE IF NOT EXISTS sessions (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      token VARCHAR(255) UNIQUE NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  await sql`CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_progress_user_id ON progress(user_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_progress_xp ON progress(xp DESC)`;
}

export { sql };

