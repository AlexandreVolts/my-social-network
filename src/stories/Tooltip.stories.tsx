import { ActionIcon } from "@/components/ui/ActionIcon";
import { Button } from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";
import type { Meta, StoryObj } from "@storybook/react";
import { IconDots } from "@tabler/icons-react";

const meta = {
  title: "UI/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default tooltip on an actionicon",
    children: (
      <ActionIcon>
        <IconDots />
      </ActionIcon>
    ),
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled tooltip",
    children: (
      <Button label="Disabled button" disabled/>
    ),
    disabled: true,
  }
}

export const BigChild: Story = {
  args: {
    label: "Tooltip on big div",
    children: <div className="bg-gray-200 w-96 h-96"></div>
  }
}
