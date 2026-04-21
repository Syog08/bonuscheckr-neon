import { supabase, type AuthorRow } from "./supabase";

export interface Author {
  id: string;
  name: string;
  initials: string;
  bio: string | null;
  expertise: string | null;
  long_bio: string | null;
  methodology: string | null;
  credentials: string[] | null;
  disclosure: string | null;
}

export async function getAuthorById(id: string): Promise<Author | null> {
  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;

  const row = data as AuthorRow;
  return {
    id: row.id,
    name: row.name,
    initials: row.initials,
    bio: row.bio,
    expertise: row.expertise,
    long_bio: row.long_bio,
    methodology: row.methodology,
    credentials: row.credentials,
    disclosure: row.disclosure,
  };
}

export async function getAllAuthorIds(): Promise<string[]> {
  const { data } = await supabase.from("authors").select("id");
  return (data || []).map((r: { id: string }) => r.id);
}
