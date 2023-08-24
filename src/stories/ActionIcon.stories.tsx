import { ActionIcon } from "@/components/ui/ActionIcon";
import type { Meta, StoryObj } from "@storybook/react";
import { Icon123, Icon24Hours } from "@tabler/icons-react";

const meta = {
  title: "UI/ActionIcon",
  component: ActionIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ActionIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Icon123 />
  }
}

export const Disabled: Story = {
  args: {
    children: <Icon24Hours />,
    disabled: true,
  }
}
