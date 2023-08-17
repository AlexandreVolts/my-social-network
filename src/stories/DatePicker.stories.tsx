import { DatePicker } from '@/components/ui/DatePicker';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'UI/DatePicker',
  component: DatePicker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        date: new Date(),
        label: "Default date picker"
    }
}

export const Disabled: Story = {
  args: {
    date: new Date(),
    label: "Disabled date picker",
    disabled: true,
  }
}

export const WithError: Story = {
  args: {
    date: new Date(),
    label: "Date picker with error displayed",
    error: "This is an error"
  }
}

export const WithPreciseDate: Story = {
  args: {
    date: new Date(1968, 10, 28),
    label: "Date picker without current date in value",
  }
}