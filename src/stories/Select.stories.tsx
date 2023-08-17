import { Select } from '@/components/ui/Select';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: "dog",
        label: "default select",
        onChange: ()=>{},
        children: (
            <>
                <Select.Option value="dog" label="Dog" />
                <Select.Option value="cat" label="Cat"/>
                <Select.Option value="duck" label="Duck"/>
            </>
        )
    }
}

export const YearSelect: Story = {
  args: {
    value: "",
    label: "select with a lot of year options",
    onChange: ()=>{},
    children: (
      <>
        {Array.from({length: 100}).map((_,index)=>{
          return(
            <Select.Option key={index} value={(2023-index).toString()} label={(2023-index).toString()}/>
          )
        })}
      </>
    ) 
  }
}