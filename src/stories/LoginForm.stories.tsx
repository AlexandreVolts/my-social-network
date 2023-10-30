import { LoginForm } from "@/components/LoginForm";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/LoginForm",
  component: LoginForm,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
