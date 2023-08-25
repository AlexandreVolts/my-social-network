import { Toaster } from "@/components/ui/Toaster";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Toaster",
  component: Toaster,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args:{
    opened: true,
    title: "Default Toaster",
    message: "This is a default error toaster",
  }
}

export const LongMsg: Story = {
  args:{
    opened: true,
    title: "Toaster with long message",
    message: Array.from({length: 300}).map(()=>"A").join(""),
  }
}

export const Valid: Story = {
  args: {
    opened: true,
    title: "Valid toaster",
    message: "This is a validation toaster",
    isValid: true,
  }
}