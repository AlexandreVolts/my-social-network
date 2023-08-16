import { Card } from '@/components/ui/Card';
import { TextInput } from '@/components/ui/TextInput';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithText: Story = {
    args:{
        children: <p className="text-justify">{Array.from({length: 1000}).map(()=>"Lorem Ipsum").join(" ")}</p>
    }
}

export const withInput: Story = {
    args: {
        children: (
            <TextInput 
                value=""
                label="Text input in a card"
                placeholder="Text"
                onChange={()=>{}}
            />
        )
    }
}