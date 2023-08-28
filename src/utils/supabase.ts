import { PostProps } from "@/types/PostProps";
import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

export const getPosts = cache(async (client: SupabaseClient): Promise<PostgrestSingleResponse<PostProps[]>> => {
  return await client.from("posts").select("*, users(name, surname, id)").order("created_at", {ascending: false})
})

export const deletePost = cache(async (client: SupabaseClient, user: string) => {
  return (await client.from("posts").delete().match({author: user}))
})

export const addLike = cache(async (client: SupabaseClient, user: string, post: string) => {
  return (await client.from("post_likes").insert({user, post}))
})

export const removeLike = cache(async (client: SupabaseClient, user: string, post: string) => {
  return (await client.from("post_likes").delete().match({user, post}))
})

export const getUserLikes = cache(async (client: SupabaseClient, user: string)=>{
  return (await client.from("post_likes").select("post").match({user}))
})

export const getPostLikes = cache(async (client: SupabaseClient, post: string) => {
  return (await client.from("posts").select().match({post}))
})
