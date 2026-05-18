const GRADIENT_LOGO = 'linear-gradient(135deg, #196BEE 0%, #6535E5 50%, #E715D1 100%)';
const GRADIENT_HEADLINE = 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.72) 100%)';

export interface OgTemplateProps {
  title: string;
  description: string;
  portraitSrc: string;
  faviconSrc: string;
}

function titleFontSize(title: string): number {
  if (title.length > 72) return 40;
  if (title.length > 48) return 46;
  return 52;
}

export function OgTemplate({ title, description, portraitSrc, faviconSrc }: OgTemplateProps) {
  const titleSize = titleFontSize(title);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '48px 56px',
        backgroundColor: '#0A0A12',
        fontFamily: 'Inter',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <img src={faviconSrc} width={32} height={32} alt="" />
        <div
          style={{
            display: 'flex',
            fontFamily: 'Clash Grotesk',
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}
        >
          <span style={{ color: '#FFFFFF' }}>Rimo</span>
          <span
            style={{
              backgroundImage: GRADIENT_LOGO,
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Byte
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          gap: 56,
          marginTop: 36,
        }}
      >
        <img
          src={portraitSrc}
          width={280}
          height={280}
          alt=""
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid rgba(255,255,255,0.07)',
            flexShrink: 0,
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            gap: 20,
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontFamily: 'Clash Grotesk',
              fontSize: titleSize,
              fontWeight: 500,
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              backgroundImage: GRADIENT_HEADLINE,
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {title}
          </div>
          <p
            style={{
              margin: 0,
              fontFamily: 'Inter',
              fontSize: 22,
              lineHeight: 1.45,
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
