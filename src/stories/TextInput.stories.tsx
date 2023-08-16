import { TextInput } from '@/components/ui/TextInput';
import type { Meta, StoryObj } from '@storybook/react';
import { IconEye, IconSearch } from '@tabler/icons-react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'UI/TextInput',
  component: TextInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args:{
        label:"Default Input",
        value:"",
        placeholder: "Text",
    }
}

export const Error: Story = {
    args: {
        label: "Input with error",
        value: "",
        placeholder: "Text",
        error: "this is an error",
    }
}

export const Disabled: Story = {
    args: {
        label: "Disabled Input",
        value: "",
        placeholder: "Text",
        disabled: true,
    }
}

export const WithRightIcon: Story = {
    args: {
        label: "Input with right icon",
        value: "",
        placeholder: "Text",
        withRightIcon: <IconEye />,
    }
}

export const WithLeftIcon: Story = {
    args: {
        label: "Input with (left) icon",
        value: "",
        placeholder: "Text",
        withIcon: <IconSearch />,
    }
}