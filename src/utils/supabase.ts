import { FollowProps } from "@/types/FollowProps";
import { LikeProps } from "@/types/LikeProps";
import { MessageProps } from "@/types/MessageProps";
import { PostProps } from "@/types/PostProps";
import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

// TODO: DB management will have to be refactored
// TODO: Tables must be protected
// TODO: A separated API must be made when back-end dev available

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

export const getUserMessages = cache(
  async (
    client: SupabaseClient,
    userId?: string
  ): Promise<PostgrestSingleResponse<MessageProps[]>> => {
    return await client
      .from("messages")
      .select()
      .match({ target: userId ?? '' })
      .order("created_at", { ascending: false });
  }
);

export const sendMessage = async (
  client: SupabaseClient,
  message: string,
  target: string
) => {
  await client.from('messages').insert({ target, message });
};

export const getLikes = cache(
  async (
    client: SupabaseClient
  ): Promise<PostgrestSingleResponse<LikeProps[]>> => {
    return await client.from("likes").select();
  }
);

export const getLike = async (
  client: SupabaseClient,
  userId: string,
  postId: string
) => {
  return await client
    .from("likes")
    .select()
    .match({ user_id: userId, post_id: postId });
};

export const getUserInfos = cache(
  async (client: SupabaseClient, userId: string) => {
    return await client.from("users").select().match({ id: userId });
  }
);

export const getAllFollows = cache(
  async (
    client: SupabaseClient
  ): Promise<PostgrestSingleResponse<FollowProps[]>> => {
    return await client
      .from("follows")
      .select(
        "*, follower:users!follows_follower_fkey(name, surname, id), target:users!follows_target_fkey(name, surname, id)"
      );
  }
);
