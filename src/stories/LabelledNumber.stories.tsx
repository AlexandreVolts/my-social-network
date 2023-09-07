import { LabelledNumber } from "@/components/LabelledNumber";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/LabelledNumber",
  component: LabelledNumber,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LabelledNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
      value: 5,
      label: "Followers",
    }
}