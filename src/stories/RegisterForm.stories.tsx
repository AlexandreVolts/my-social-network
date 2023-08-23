import { RegisterForm } from "@/components/RegisterForm";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/RegisterForm",
  component: RegisterForm,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof RegisterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: () => {},
    onSwitch: () => {},
  },
};

export const Loading: Story = {
  args: {
    onSubmit: () => {},
    onSwitch: () => {},
    isLoading: true,
  },
};
