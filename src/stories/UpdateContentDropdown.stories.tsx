import { UpdateContentDropdown } from "@/components/UpdateContentDropdown";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/UpdateContentDropdown",
  component: UpdateContentDropdown,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof UpdateContentDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: '',
  },
};

export const Admin: Story = {
  args: {
    text: '',
    isAdmin: true,
  },
};

export const Loading: Story = {
  args: {
    text: '',
    isLoading: true,
  },
};