import { neon, NeonQueryFunction } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL;

let sqlInstance: NeonQueryFunction<boolean, boolean> | null = null;

function getSql() {
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  if (!sqlInstance) {
    sqlInstance = neon(DATABASE_URL);
  }
  return sqlInstance;
}

export { getSql };

export async function ensureSchema() {
  const db = getSql();
  await db`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      slug TEXT NOT NULL,
      title TEXT NOT NULL,
      location TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT 'Residential',
      year TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      images TEXT[] NOT NULL DEFAULT '{}',
      aspect_ratio TEXT NOT NULL DEFAULT 'aspect-[4/5]',
      client_name TEXT NOT NULL DEFAULT '',
      project_size TEXT NOT NULL DEFAULT '',
      budget_range TEXT NOT NULL DEFAULT '',
      timeline TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'Planning',
      featured BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;

  await db`
    CREATE TABLE IF NOT EXISTS admin_images (
      id TEXT PRIMARY KEY,
      filename TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      data BYTEA NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;

  await db`
    CREATE TABLE IF NOT EXISTS testimonials (
      id TEXT PRIMARY KEY,
      quote TEXT NOT NULL DEFAULT '',
      author TEXT NOT NULL DEFAULT '',
      role TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;

  await db`
    ALTER TABLE projects ADD COLUMN IF NOT EXISTS videos TEXT[] NOT NULL DEFAULT '{}'
  `;
}
