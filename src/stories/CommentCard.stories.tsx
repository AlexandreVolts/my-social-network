import { CommentCard } from "@/components/CommentCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/CommentCard",
  component: CommentCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CommentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Rodolphe",
    surname: "Cochet",
    text: "My first comment Pog",
    //@ts-ignore
    createdAt: new Date()-1000*60*60,
    likeCount: 0,
  }
}

export const LongComment: Story = {
  args:{
    name: "Snail",
    surname: "Enjoyer",
    text: "A snail is a shelled gastropod. The name is most often applied to land snails, terrestrial pulmonate gastropod molluscs. However, the common name snail is also used for most of the members of the molluscan class Gastropoda that have a coiled shell that is large enough for the animal to retract completely into. When the word snail is used in this most general sense, it includes not just land snails but also numerous species of sea snails and freshwater snails. Gastropods that naturally lack a shell, or have only an internal shell, are mostly called slugs, and land snails that have only a very small shell (that they cannot retract into) are often called semi-slugs. Snails have considerable human relevance, including as food items, as pests, and as vectors of disease, and their shells are used as decorative objects and are incorporated into jewelry.[1] The snail has also had some cultural significance, tending to be associated with lethargy. The snail has also been used as a figure of speech in reference to slow-moving things. The snail is the same or similar shape as the cochlea.",
    likeCount: 10,
    isLiked: false,
    //@ts-ignore
    createdAt: new Date(new Date()-1000*60*60*24*4),
    //@ts-ignore
    updatedAt: new Date(new Date()-1000*60*60*24*4),
  }
}

export const MeanComment: Story = {
  args: {
    name: "Serial",
    surname: "Hater",
    text: "tldr",
    likeCount: 666,
    isLiked: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export const LikedComment: Story = {
  args: {
    name: "Serial",
    surname: "Lover",
    text: "Everyone loves me, including you.",
    likeCount: 90,
    isLiked: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}