import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DesktopNavbar from "./desktop-navbar";
import { sampleInternalProps } from "../stories/fixtures/sample-props";

const meta: Meta<typeof DesktopNavbar> = {
  title: "Internal/DesktopNavbar",
  component: DesktopNavbar,
  parameters: {
    layout: "fullscreen",
  },
  args: sampleInternalProps,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LogoLeft: Story = {
  args: { layout: "logo-left" },
};

export const LogoCenter: Story = {
  args: { layout: "logo-center" },
};

export const LogoRight: Story = {
  args: { layout: "logo-right" },
};

export const NoCTA: Story = {
  name: "No CTA",
  args: { cta: undefined },
};

export const NoLanguageSwitcher: Story = {
  name: "No Language Switcher",
  args: { icons: [], showLanguageSwitcher: false },
};
