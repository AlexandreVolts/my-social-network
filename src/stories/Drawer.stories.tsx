import { Card } from "@/components/ui/Card";
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
    children: <></>,
    onClose: () => {},
  },
};

export const WithCards: Story = {
  args: {
    opened: true,
    title: "Various templates",
    children: (
      <ul className="space-y-2">
        {Array.from({ length: 15 }).map((_, index) => {
          return (
            <li key={index}>
              <Card>{index}</Card>
            </li>
          );
        })}
      </ul>
    ),
    onClose: () => {},
  },
};
