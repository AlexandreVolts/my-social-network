import type { StorybookConfig } from '@storybook/nextjs';
const path = require("path")
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {},
    },
  ],
  webpackFinal: async (config) => {
    config!.resolve!.alias = {
      ...config.resolve?.alias, 
      "@/components": path.resolve(__dirname, "../src/components"),
    } 
    return config
  },
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
