import { CommentCard } from "@/components/CommentCard";
import { PostCard } from "@/components/PostCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/PostCard",
  component: PostCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof PostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Rodolphe",
    surname: "Cochet",
    createdAt: new Date(2001, 7, 19),
    updatedAt: new Date(2001, 7, 19),
    likeCount: 22,
    text: "So apparently I just arrived",
    isLiked: false,
    isLoading: false,
    children: <></>,
  },
};

export const PostedNow: Story = {
  args: {
    name: "dzz",
    surname: "d",
    createdAt: new Date(),
    updatedAt: new Date(),
    likeCount: 0,
    text: "This is a post card for which I entered a date of post equal to new Date()",
    isLiked: false,
    isLoading: false,
    children: <></>,
  },
};

export const FullOfText: Story = {
  args: {
    name: "Spammer",
    surname: "Spamton",
    createdAt: new Date(0),
    updatedAt: new Date(0),
    likeCount: 666,
    text: Array.from({ length: 1000 })
      .map(() => "Lorem Ipsum")
      .join(" "),
    isLiked: false,
    isLoading: false,
    children: <></>,
  },
};

export const CharLimit: Story = {
  args: {
    name: "zg",
    surname: " fefe",
    //@ts-ignore
    createdAt: new Date(new Date() - 1000 * 60 * 60 * 12),
    //@ts-ignore
    updatedAt: new Date(new Date() - 1000 * 60 * 60 * 12),
    likeCount: 10,
    text: Array.from({ length: 250 })
      .map(() => "W")
      .join(""),
    isAuthor: false,
    isLiked: false,
    isLoading: false,
    children: <></>,
  },
};

export const AuthorMode: Story = {
  args: {
    name: "Christophen",
    surname: "Allen",
    //@ts-ignore
    createdAt: new Date(new Date() - 1000 * 60 * 60 * 24 * 2),
    //@ts-ignore
    updatedAt: new Date(new Date() - 1000 * 60 * 60 * 24 * 2),
    likeCount: 0,
    text: "This is a post in author mode",
    isAuthor: true,
    isLiked: false,
    isLoading: false,
    children: <></>,
  },
};

export const Liked: Story = {
  args: {
    name: "John",
    surname: "Doe",
    //@ts-ignore
    createdAt: new Date(new Date() - 1000 * 60 * 60 * 24 * 2),
    //@ts-ignore
    updatedAt: new Date(new Date() - 1000 * 60 * 60 * 24 * 2),
    likeCount: 5,
    text: "I know you liked me, don't lie.",
    isAuthor: false,
    isLiked: true,
    isLoading: false,
    children: <></>,
  },
};

export const Updated: Story = {
  args: {
    name: "Katty",
    surname: "Perry",
    //@ts-ignore
    createdAt: new Date(new Date() - 1000 * 60 * 60 * 24 * 3),
    //@ts-ignore
    updatedAt: new Date(new Date() - 1000 * 60 * 60 * 24 * 2),
    likeCount: 5,
    text: "I said something very bad, so I edited and now nobody will see it.",
    isAuthor: false,
    isLiked: false,
    isLoading: false,
    children: <></>,
  },
};

export const LoadingPopups: Story = {
  args: {
    name: "John",
    surname: "Doe",
    //@ts-ignore
    createdAt: new Date(new Date() - 1000 * 60 * 60 * 24 * 2),
    //@ts-ignore
    updatedAt: new Date(new Date() - 1000 * 60 * 60 * 24 * 2),
    likeCount: 5,
    text: "The process of loading is infinitely slow over there.",
    isAuthor: true,
    isLiked: true,
    isLoading: true,
    children: <></>,
  },
};

export const WithComments: Story = {
  args: {
    name: "3ll0n",
    surname: "Musc",
    //@ts-ignore
    createdAt: new Date(new Date() - 1000 * 60 * 60 * 23),
    //@ts-ignore
    updatedAt: new Date(new Date() - 1000 * 60 * 60 * 23),
    likeCount: 50,
    text: "I'm the CEO now.",
    isAuthor: false,
    isLiked: false,
    isLoading: false,
    children: (
      <CommentCard
        name="Ellon"
        surname="Musk"
        createdAt={new Date()}
        updatedAt={new Date()}
        likeCount={500}
        text="You're banned now"
        isLiked={false}
        onEdit={() => {}}
        onComment={() => {}}
        onShare={() => {}}
        onLike={() => {}}
        onDelete={() => {}}
      />
    ),
  },
};
