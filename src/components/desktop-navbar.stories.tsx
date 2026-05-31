import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DesktopNavbar from "./desktop-navbar";
import { DECORATIVE_SRC, sampleInternalProps } from "../stories/fixtures/sample-props";

const meta: Meta<typeof DesktopNavbar> = {
  title: "Internal/DesktopNavbar",
  component: DesktopNavbar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: sampleInternalProps,
  argTypes: {
    layout: { control: { type: 'select' }, options: ['logo-center','logo-left','logo-right'] },
    ctaPlacement: { control: { type: 'select' }, options: ['actions','nav','logo'] },
    showLanguageSwitcher: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Layout variants
export const LogoCenter: Story = { name: 'Layout / Logo Center', args: { layout: 'logo-center' } };
export const LogoLeft: Story = { name: 'Layout / Logo Left', args: { layout: 'logo-left' } };
export const LogoRight: Story = { name: 'Layout / Logo Right', args: { layout: 'logo-right' } };

// CTA placement
export const CtaInActions: Story = { name: 'CTA / In Actions (default)', args: { ctaPlacement: 'actions' } };
export const CtaInNav: Story = { name: 'CTA / In Nav', args: { ctaPlacement: 'nav' } };

// Presence variants
export const NoCTA: Story = { name: 'Presence / No CTA', args: { cta: undefined } };
export const NoLanguageSwitcher: Story = { name: 'Presence / No Language Switcher', args: { icons: [], showLanguageSwitcher: false } };
export const NoLanguageSwitcherNoCTA: Story = { name: 'Presence / No Language Switcher + No CTA', args: { icons: [], showLanguageSwitcher: false, cta: undefined } };
export const NoNavItems: Story = { name: 'Presence / No Nav Items', args: { items: [] } };

// Customization
export const CustomCTAClass: Story = {
  name: 'Customization / Custom CTA Class',
  args: { classNames: { cta: 'bg-purple-900 hover:bg-purple-950 hover:scale-105 transition-transform duration-200 rounded-md text-white' } },
};
export const CustomNavClass: Story = {
  name: 'Customization / Custom Nav Class',
  args: { classNames: { link: 'text-purple-900 hover:text-purple-950 hover:scale-105 transition-transform duration-200' } },
};
export const CustomLogoClass: Story = {
  name: 'Customization / Custom Logo Class',
  args: { classNames: { logo: 'hover:scale-105 transition-transform duration-200 rounded-full border-2 border-purple-900' } },
};
export const CustomContainerClass: Story = {
  name: 'Customization / Custom Container Class',
  args: { classNames: { container: 'drop-shadow-lg bg-white' } },
};

// Decorative border
export const WithDecorativeBorder: Story = {
  name: 'Decorative Border / With Decorative Border',
  args: { decorativeBorderSrc: DECORATIVE_SRC },
};