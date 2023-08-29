import { LikeProps } from "@/types/LikeProps";
import { PostProps } from "@/types/PostProps";
import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

export const getPosts = cache(
  async (
    client: SupabaseClient
  ): Promise<PostgrestSingleResponse<PostProps[]>> => {
    return await client
      .from("posts")
      .select("*, users!posts_author_fkey(name, surname, id)")
      .order("created_at", { ascending: false });
  }
);

export const deletePost = cache(
  async (client: SupabaseClient, user: string) => {
    return await client.from("posts").delete().match({ author: user });
  }
);

export const addLike = async (
  client: SupabaseClient,
  userId: string,
  postId: string
) => {
  return await client
    .from("post_likes")
    .insert({ user_id: userId, post_id: postId });
};

export const removeLike = async (
  client: SupabaseClient,
  userId: string,
  postId: string
) => {
  return await client
    .from("post_likes")
    .delete()
    .match({ user_id: userId, post_id: postId });
};

export const getLikes = cache(
  async (
    client: SupabaseClient
  ): Promise<PostgrestSingleResponse<LikeProps[]>> => {
    return await client.from("post_likes").select();
  }
);

export const getALike = async (client: SupabaseClient, userId: string, postId: string) => {
  return await client.from("post_likes").select().match({user_id: userId, post_id: postId})
}
