import { UserListModal } from "@/components/UserListModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/UserListModal",
  component: UserListModal,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof UserListModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    opened: true,
    title: "This is a default list modal",
    list: [{name: "Elem", surname: "1", id: "1"},{name: "Elem", surname: "2", id: "2"}]
  }
}