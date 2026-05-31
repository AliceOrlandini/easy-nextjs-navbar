import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MobileNavbar from "./mobile-navbar.client";
import { DECORATIVE_SRC, sampleInternalProps } from "../stories/fixtures/sample-props";

const meta: Meta<typeof MobileNavbar> = {
  title: "Internal/MobileNavbar",
  component: MobileNavbar,
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "mobile2" },
  },
  args: sampleInternalProps,
  argTypes: {
    showCtaInMobile: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Presence variants
export const Default: Story = { name: "Mobile / Default (closed)" };
export const NoCtaInMobile: Story = { name: "Mobile / CTA hidden in mobile", args: { showCtaInMobile: false } };
export const WithBrandName: Story = { name: "Mobile / With Brand Name", args: { brandName: "My Brand" } };
export const NoLanguageSwitcher: Story = { name: "Mobile / No Language Switcher", args: { icons: [], showLanguageSwitcher: false } };

// Customization
export const CustomHamburgerClass: Story = {
  name: "Mobile / Custom Hamburger Class",
  args: { classNames: { hamburger: "text-purple-950 hover:scale-105 transition-transform duration-200 rounded-md" } },
};
export const CustomMobileMenuItemClass: Story = {
  name: "Mobile / Custom Mobile Menu Item Class",
  args: { classNames: { mobileMenuItem: "text-purple-900 hover:text-purple-950 hover:scale-105 transition-transform duration-200" } },
};
export const CustomContainerClass: Story = {
  name: "Mobile / Custom Container Class",
  args: { classNames: { container: "drop-shadow-lg bg-white" } },
};
export const CustomCTAClass: Story = {
  name: "Mobile / Custom CTA Class",
  args: { classNames: { cta: "bg-purple-900 hover:bg-purple-950 hover:scale-105 transition-transform duration-200 rounded-md text-white" } },
};
export const WithDecorativeBorder: Story = {
  name: "Mobile / With Decorative Border",
  args: { decorativeBorderSrc: DECORATIVE_SRC },
};