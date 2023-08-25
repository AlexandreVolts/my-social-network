import { SupabaseClient } from "@supabase/supabase-js";

export async function getPosts(client: SupabaseClient) {
  return await client.from("posts").select("*, users(name, surname)")
}