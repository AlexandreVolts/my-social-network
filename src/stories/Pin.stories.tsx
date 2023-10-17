import { ActionIcon } from "@/components/ui/ActionIcon";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
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
    value: 8,
  }
}

export const OnAvatar: Story = {
  args: {
    children: (
      <Avatar name="Rodolphe" surname="C" size="sm" />
    ),
  }
}

export const OnButton: Story = {
  args:{
    children: (
      <Button label="Test button" />
    )
  }
}