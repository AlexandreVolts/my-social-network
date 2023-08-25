import { PostProps } from "@/types/PostProps";
import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

export const getPosts = cache(async (client: SupabaseClient): Promise<PostgrestSingleResponse<PostProps[]>> => {
  return await client.from("posts").select("*, users(name, surname, id)").order("created_at", {ascending: false})
})

export const deletePost = cache(async (client: SupabaseClient, user: string) => {
  return (await client.from("posts").delete().match({author: user}))
})