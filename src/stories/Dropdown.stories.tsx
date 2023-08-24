import { Dropdown } from "@/components/ui/Dropdown";
import type { Meta, StoryObj } from "@storybook/react";
import { IconDots } from "@tabler/icons-react";

const meta = {
  title: "UI/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    opened: true,
    target: <IconDots />,
    children: (
      <>
        <Dropdown.Item onClick={() => {}}>Dog</Dropdown.Item>
        <Dropdown.Item onClick={() => {}}>Cat</Dropdown.Item>
        <Dropdown.Item onClick={() => {}}>Duck</Dropdown.Item>
      </>
    ),
  },
};
