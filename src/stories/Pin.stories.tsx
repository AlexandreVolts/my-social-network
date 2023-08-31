import { ActionIcon } from "@/components/ui/ActionIcon";
import { Pin } from "@/components/ui/Pin";
import type { Meta, StoryObj } from "@storybook/react";
import { IconBell, IconBook, IconDots, IconSettings } from "@tabler/icons-react";

const meta = {
  title: "UI/Pin",
  component: Pin,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Pin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <ActionIcon>
        <IconDots />
      </ActionIcon>
    ),
  },
};

export const Warn: Story = {
  args: {
    children: (
      <ActionIcon>
        <IconSettings />
      </ActionIcon>
    ),
    color: "red"
  }
}

export const Update: Story = {
  args: {
    children: (
      <ActionIcon>
        <IconBook />
      </ActionIcon>
    ),
    color: "green"
  }
}

export const WithNumber: Story = {
  args: {
    children: (
      <ActionIcon>
        <IconBell />
      </ActionIcon>
    ),
    notificationNb: 8,
  }
}
