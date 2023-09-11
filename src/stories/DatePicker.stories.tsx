import { DatePicker } from "@/components/ui/DatePicker";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: new Date(),
    label: "Default date picker",
  },
};

export const Disabled: Story = {
  args: {
    date: new Date(),
    label: "Disabled date picker",
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    date: new Date(),
    label: "Date picker with error displayed",
    error: "This is an error",
  },
};

export const WithPreciseDate: Story = {
  args: {
    date: new Date(1968, 10, 28),
    label: "Date picker without current date in value",
  },
};
