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
    commentCount: 1,
    text: "So apparently I just arrived",
  }
}

export const PostedNow: Story = {
  args:{
    name: "dzz",
    surname: "d",
    createdAt: new Date(),
    likeCount: 0,
    commentCount: 0,
    text: "This is a post card for which I entered a date of post equal to new Date()",
  }
}

export const FullOfText: Story = {
  args: {
    name: "Spammer",
    surname: "Spamton",
    createdAt: new Date(0),
    likeCount: 666,
    commentCount: 2045,
    text: Array.from({length: 1000}).map(()=>"Lorem Ipsum").join(" "),
  }
}

export const CharLimit: Story = {
  args:{
    name: "zg",
    surname: " fefe",
    //@ts-ignore
    createdAt: new Date()-1000*60*60*12,
    likeCount: 10,
    commentCount: 0,
    text: Array.from({length: 250}).map(()=>"W").join(""),
  }
}

export const AuthorMode: Story = {
  args: {
    name: "Christophen",
    surname: "Allen",
    //@ts-ignore
    createdAt: new Date()-1000*60*60*24*2,
    likeCount: 0,
    commentCount: 0,
    text: "This is a post in author mode",
    isAuthor: true,
  }
}
