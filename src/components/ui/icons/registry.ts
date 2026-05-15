import chevronDownIcon from './chevron-down.svg?raw';
import cornerBrIcon from './corner-br.svg?raw';
import cornerTlIcon from './corner-tl.svg?raw';
import globeIcon from './globe.svg?raw';
import mailIcon from './mail.svg?raw';
import quoteOrnateIcon from './quote-ornate.svg?raw';
import shoppingBagIcon from './shopping-bag.svg?raw';
import whatsappIcon from './whatsapp.svg?raw';
import wrenchIcon from './wrench.svg?raw';

export const icons = {
  'chevron-down': chevronDownIcon,
  'corner-br': cornerBrIcon,
  'corner-tl': cornerTlIcon,
  globe: globeIcon,
  mail: mailIcon,
  'quote-ornate': quoteOrnateIcon,
  'shopping-bag': shoppingBagIcon,
  whatsapp: whatsappIcon,
  wrench: wrenchIcon,
} as const;

export type IconName = keyof typeof icons;

export function getIconSvg(name: IconName): string {
  return icons[name];
}

/** Data URI para usar como background-image (color en hex/rgb, sin URL-encode) */
export function iconDataUri(name: IconName, color = '#2B47EC'): string {
  const svg = icons[name]
    .replace(/currentColor/g, color)
    .replace(/\s+/g, ' ')
    .trim();
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
