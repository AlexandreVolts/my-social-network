import { CreatePostCard } from "@/components/CreatePostCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/CreatePostCard",
  component: CreatePostCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CreatePostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLoading: false,
  }
}
export const Loading: Story = {
  args: {
    isLoading: true,
  }
}