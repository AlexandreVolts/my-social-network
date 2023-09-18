import { LoginForm } from "@/components/LoginForm";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    opened: true,
    title: "Default Title",
    children: (
      <div>
        <ul>
          <li>line 1</li>
          <li>line 2</li>
          <li>line 3</li>
        </ul>
      </div>
    ),
    onClose: () => {},
  },
};

export const WithCardIn: Story = {
  args: {
    opened: true,
    title: "Modal with a card inside",
    children: (
      <Card>
        <Card>
          <></>
        </Card>
      </Card>
    ),
    onClose: () => {},
  },
};

export const WithBigComponentIn: Story = {
  args: {
    opened: true,
    title: "Modal with a login form inside",
    children: <LoginForm onSubmit={() => {}} onSwitch={() => {}} />,
    onClose: () => {},
  },
};
