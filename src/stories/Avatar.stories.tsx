import { Avatar } from '@/components/ui/Avatar';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://hatscripts.github.io/circle-flags/flags/fr.svg",
    name: "Rod",
    surname: "C",
    size: "lg",
    color: "#000000",
  }
}

export const SmallNoSrc: Story = {
  args: {
    name: "rodolphe",
    surname: "cochet",
    size: "sm",
    color: "#FF0000",
  }
}

export const MediumNoSrc: Story = {
  args: {
    name: "alexandre",
    surname: "c",
    size: "md",
    color: "#0000FF",
  }
}

export const LargeNoSrc: Story = {
  args:{
    name: "esdc",
    surname: "rfsefs",
    size: "lg",
  }
}

export const SmallWithSrc : Story = {
  args: {
    src: "https://hatscripts.github.io/circle-flags/flags/uk.svg",
    name: "rod",
    surname: "tailselrayo",
    color: "#00FF00",
    size: "sm",
  }
}

export const MediumWithSrc : Story = {
  args: {
    src: "https://hatscripts.github.io/circle-flags/flags/es.svg",
    name: "rod",
    surname: "tailselrayo",
    color: "#00FF00",
    size: "sm",
  }
}