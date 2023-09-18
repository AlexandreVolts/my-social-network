import { Drawer } from "@/components/ui/Drawer";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    opened: true,
    title: "Default Title",
    children: (
      <></>
    ),
    onClose: () => {},
  },
};

export const Menu: Story = {
  args: {
    opened: true,
    title: "This is a Menu",
    children: (
      <ul>
        <li>Home</li>
        <li>Profile</li>
        <li>Messages</li>
        <li>NOtifications</li>
      </ul>
    ),
    onClose: () => {},
  },
};
