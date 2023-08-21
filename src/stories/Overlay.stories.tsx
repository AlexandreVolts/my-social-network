import { Card } from '@/components/ui/Card';
import { Overlay } from '@/components/ui/Overlay';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'UI/Overlay',
  component: Overlay,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
} satisfies Meta<typeof Overlay>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const WithOpacity: Story = {
  args: {
    children: <></>,
    onClick: () => {},
    opened: true,
    opacity: true,
  },
};

export const WithChildren: Story = {
  args: {
    children: <Card><h2>Hello world!</h2></Card>,
    onClick: () => {},
    opened: true,
    opacity: true,
  },
};