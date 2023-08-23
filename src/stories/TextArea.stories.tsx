import { TextArea } from "@/components/ui/TextArea";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default TextArea",
    value: "",
    placeholder: "Text",
  },
};

export const MultipleLines: Story = {
  args: {
    label: "Multiple lines TextArea",
    value: "test\nhello\nworld",
    placeholder: "Text",
  },
};

export const Error: Story = {
  args: {
    label: "TextArea with error",
    value: "",
    placeholder: "Text",
    error: "this is an error",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled TextArea",
    value: "",
    placeholder: "Text",
    disabled: true,
  },
};