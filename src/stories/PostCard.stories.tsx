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
    likeCount: 22,
    text: "So apparently I just arrived",
    children: <></>,
  }
}

export const PostedNow: Story = {
  args:{
    name: "dzz",
    surname: "d",
    createdAt: new Date(),
    likeCount: 0,
    text: "This is a post card for which I entered a date of post equal to new Date()",
    children: <></>,
  }
}

export const FullOfText: Story = {
  args: {
    name: "Spammer",
    surname: "Spamton",
    createdAt: new Date(0),
    likeCount: 666,
    text: Array.from({length: 1000}).map(()=>"Lorem Ipsum").join(" "),
    children: <></>,
  }
}

export const CharLimit: Story = {
  args:{
    name: "zg",
    surname: " fefe",
    //@ts-ignore
    createdAt: new Date()-1000*60*60*12,
    likeCount: 10,
    text: Array.from({length: 250}).map(()=>"W").join(""),
    children: <></>,
  }
}

export const AuthorMode: Story = {
  args: {
    name: "Christophen",
    surname: "Allen",
    //@ts-ignore
    createdAt: new Date()-1000*60*60*24*2,
    likeCount: 0,
    text: "This is a post in author mode",
    isAuthor: true,
    children: <></>,
  }
}

export const WithComments: Story = {
  args: {
    name: "3ll0n",
    surname: "Musc",
    //@ts-ignore
    createdAt: new Date() - 1000*60*60*23,
    likeCount: 50,
    text: "I'm the CEO now.",
    isOpened: true,
    children: (
      <CommentCard
        name="Ellon"
        surname="Musk"
        createdAt={new Date()}
        likeCount={500}
        text="You're banned now"
        onCommentClick={()=>{}}
        onLikeClick={()=>{}}
        onSettingClick={()=>{}}
        onShareClick={()=>{}}
      />
    ),
  }
}

export const WithCommentsNoSettings: Story = {
  args: {
    name: "Poster",
    surname: "1",
    //@ts-ignore
    createdAt: new Date() - 1000*60*60*23,
    likeCount: 50,
    text: "*tells a spannish joke*",
    isOpened: true,
    isAuthor: true,
    children: (
      <CommentCard
        name="Commenter"
        surname="1"
        createdAt={new Date()}
        likeCount={1}
        text={Array.from({length: 250}).map(()=>"JA").join("")}
        isAuthor={true}
        onCommentClick={()=>{}}
        onLikeClick={()=>{}}
        onSettingClick={()=>{}}
        onShareClick={()=>{}}
      />
    ),
  }
}