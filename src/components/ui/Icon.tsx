import { getIconSvg, type IconName } from './icons/registry';

export type { IconName };

interface IconProps {
  name: IconName;
  className?: string;
  style?: React.CSSProperties;
}

export default function Icon({ name, className = '', style }: IconProps) {
  return (
    <span
      className={`icon ${className}`.trim()}
      style={style}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: getIconSvg(name) }}
    />
  );
}
