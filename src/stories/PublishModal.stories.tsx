import { PublishModal } from "@/components/PublishModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/PublishModal",
  component: PublishModal,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof PublishModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    opened: true,
    isLoading: false,
    title: "Title of the default modal",
    value: "",
  },
};

export const Loading: Story = {
  args: {
    opened: true,
    isLoading: true,
    title: "Title of the loading modal",
    value: "",
  },
};
