import { ReadMoreText } from "@/components/ui/ReadMoreText";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/ReadMoreText",
  component: ReadMoreText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ReadMoreText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args:{
    text: "This is a default short text"
  }
}

export const LongText: Story = {
  args: {
    text: "W"+Array.from({length: 250}).map(()=>"A").join("") + "RIO TIME!!"
  }
}

export const ShortCutText: Story=  {
  args:{
    text: "This won't be cut, right ?",
    charLimit: 10,
  }
}

export const LongNoCutText: Story = {
  args:{
    text: Array.from({length: 250}).map(()=>"Lorem Ipsum").join(" "),
    charLimit: 1000
  }
}