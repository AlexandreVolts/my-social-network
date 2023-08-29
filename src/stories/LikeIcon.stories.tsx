import { LikeIcon } from "@/components/ui/LikeIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/LikeIcon",
  component: LikeIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LikeIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLiked: false
  }
}
