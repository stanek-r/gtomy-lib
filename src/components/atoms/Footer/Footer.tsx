import React, { ReactNode } from 'react';
import { LanguageSelect } from '@/components/atoms/LanguageSelect';
import { ThemeSelect } from '@/components/atoms/Theme';
import { useTranslation } from '@/utils/hooks';
import { Icon, IconType } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';

const AppIcon = <img src="/favicon.ico" className="size-8 rounded shrink-0" alt="Application icon" />;

export interface FooterLinks {
  header: string;
  links: ReactNode;
}

export interface FooterProps {
  title: string;
  subtitle?: string;
  height?: 'short' | 'tall';
  socialMedia?: ReactNode;
  links?: FooterLinks[];
  showSettings?: boolean;
  showIcon?: boolean;
  icon?: IconType;
}

function FooterSettings() {
  const { t } = useTranslation('common');
  return (
    <nav>
      <header className="footer-title">{t('footer.settings')}</header>
      <div className="flex flex-wrap gap-2 text-base-content">
        <LanguageSelect />
        <ThemeSelect />
      </div>
    </nav>
  );
}

export function Footer({
  title,
  subtitle,
  height = 'short',
  links = [],
  socialMedia,
  showSettings,
  icon = AppIcon,
  showIcon,
}: FooterProps) {
  const { t } = useTranslation('common');

  if (height === 'short') {
    if (socialMedia == null) {
      return (
        <footer className="footer footer-center bg-neutral p-4 text-neutral-content min-h-16">
          <aside className="grid-flow-col items-center">
            {showIcon && <Icon icon={icon} size="xl" />}
            <Typography weight="semibold">{title}</Typography>
          </aside>
        </footer>
      );
    }
    return (
      <footer className="footer items-center bg-neutral p-4 text-neutral-content min-h-16">
        <aside className="grid-flow-col items-center">
          {showIcon && <Icon icon={icon} size="xl" />}
          <Typography weight="semibold">{title}</Typography>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">{socialMedia}</nav>
      </footer>
    );
  }

  if (links.length === 0) {
    return (
      <footer className="footer bg-neutral p-10 text-neutral-content min-h-16">
        <aside>
          {showIcon && <Icon icon={icon} size="xl" />}
          <p>
            <Typography weight="semibold">{title}</Typography>
            {subtitle && (
              <>
                <br />
                {subtitle}
              </>
            )}
          </p>
        </aside>
        <nav>
          <header className="footer-title">{t('footer.social')}</header>
          <div className="grid grid-flow-col gap-4">{socialMedia}</div>
        </nav>
        {showSettings && <FooterSettings />}
      </footer>
    );
  }
  if (socialMedia == null) {
    return (
      <footer className="footer bg-neutral p-10 text-neutral-content min-h-16">
        <aside>
          {showIcon && <Icon icon={icon} size="xl" />}
          <p>
            <Typography weight="semibold">{title}</Typography>
            {subtitle && (
              <>
                <br />
                {subtitle}
              </>
            )}
          </p>
        </aside>
        {links.map((link, index) => (
          <nav key={index}>
            <header className="footer-title">{link.header}</header>
            {link.links}
          </nav>
        ))}
        {showSettings && <FooterSettings />}
      </footer>
    );
  }

  return (
    <>
      <footer className="footer bg-neutral p-10 text-neutral-content min-h-16">
        {links.map((link, index) => (
          <nav key={index}>
            <header className="footer-title">{link.header}</header>
            {link.links}
          </nav>
        ))}
        {showSettings && <FooterSettings />}
      </footer>
      <footer className="footer border-t border-base-300 bg-neutral px-10 py-4 text-neutral-content min-h-16">
        <aside className="grid-flow-col items-center">
          {showIcon && <Icon icon={icon} size="xl" />}
          <p>
            <Typography weight="semibold">{title}</Typography>
            {subtitle && (
              <>
                <br />
                {subtitle}
              </>
            )}
          </p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">{socialMedia}</div>
        </nav>
      </footer>
    </>
  );
}
