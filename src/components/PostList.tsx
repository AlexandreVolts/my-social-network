import { PostProps } from "@/types/PostProps";
import { LikeProps } from "@/types/LikeProps";
import { PostCard } from "./PostCard";
import { CommentCard } from "./CommentCard";
import { UUID } from "crypto";

interface PostListProps {
  posts: PostProps[];
  likes: LikeProps[];
  userId?: UUID;
  isLoading: boolean;
  onComment: (content: string, answerTo: UUID) => void;
  onDelete: (id: UUID) => void;
  onEdit: (id: UUID, content: string) => void;
  onLike: (id: UUID) => void;
}
export function PostList(props: PostListProps) {
  // TODO: The way to join likes to posts is very expensive and must be improved.

  return (
    <div className="w-full space-y-2">
      {props.posts
        .filter((post) => !post.answer_to)
        .map((post) => {
          console.log(props.userId, post.users.id);
          return (
            <PostCard
              key={post.id}
              name={post.users.name}
              surname={post.users.surname}
              createdAt={new Date(post.created_at)}
              updatedAt={new Date(post.updated_at)}
              text={post.content}
              userId={post.users.id}
              likeCount={
                props.likes.filter((like) => like.post_id === post.id).length ??
                0
              }
              isLiked={
                !!props.likes.find(
                  (like) =>
                    like.post_id === post.id && like.user_id === props.userId
                )
              }
              isAuthor={props.userId === post.users.id}
              isLoading={props.isLoading}
              onComment={(comment) => props.onComment(comment, post.id)}
              onDelete={() => props.onDelete(post.id)}
              onEdit={(content) => props.onEdit(post.id, content)}
              onLike={() => props.onLike(post.id)}
              onShare={() => {}}
            >
              {props.posts
                .filter((comment) => comment.answer_to === post.id)
                .map((comment) => {
                  return (
                    <CommentCard
                      key={comment.id}
                      name={comment.users.name}
                      surname={comment.users.surname}
                      createdAt={new Date(comment.created_at)}
                      updatedAt={new Date(comment.updated_at)}
                      userId={comment.users.id}
                      text={comment.content}
                      likeCount={
                        props.likes.filter((like) => like.post_id === comment.id)
                          .length ?? 0
                      }
                      isLiked={
                        !!props.likes.find(
                          (like) =>
                            like.post_id === comment.id &&
                            like.user_id === props.userId
                        )
                      }
                      isAuthor={props.userId === comment.users.id}
                      isAdmin={props.userId === post.users.id}
                      onComment={(content) => props.onComment(content, comment.id)}
                      onDelete={() => props.onDelete(comment.id)}
                      onEdit={(content) => props.onEdit(comment.id, content)}
                      onLike={() => props.onLike(comment.id)}
                      onShare={() => {}}
                    />
                  );
                })}
            </PostCard>
          );
        })}
    </div>
  );
}
