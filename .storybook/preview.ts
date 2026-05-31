import type { Preview } from "@storybook/nextjs-vite";
import "./globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    backgrounds: {
      options: {
        dark: { name: "Dark", value: "#171717" }, // neutral-900
        light: { name: "Light", value: "#ffffff" },
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/it",
      },
    },
  },
};

export default preview;
