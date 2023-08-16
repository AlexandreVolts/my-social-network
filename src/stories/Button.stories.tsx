import { Button } from '@/components/ui/Button';
import type { Meta, StoryObj } from '@storybook/react';
import { IconHome } from '@tabler/icons-react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    label: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    secondary: true,
  },
};
export const Small: Story = {
  args: {
    label: 'Small Button',
    size: "sm",
  },
};
export const Large: Story = {
  args: {
    label: 'Large Button',
    size: "lg",
  },
};
export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true,
  }
}
export const WithIcon: Story = {
  args: {
    label: 'Button with Icon',
    icon: <IconHome />,
  }
}
