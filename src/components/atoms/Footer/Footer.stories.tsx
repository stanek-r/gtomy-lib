import { StoryObj } from '@storybook/react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Footer } from '@/components/atoms/Footer/Footer';
import { FooterSocialItem } from '@/components/atoms/Footer/FooterSocialItem';
import { FooterItem } from '@/components/atoms/Footer/FooterItem';
import { CpuChipIcon } from '@heroicons/react/24/outline';

export default {
  title: 'Atoms/Footer',
  component: Footer,
  decorators: [(Story: any) => <BrowserRouter>{Story()}</BrowserRouter>],
};

type Story = StoryObj<typeof Footer>;

export const Short: Story = {
  render: () => {
    return <Footer title="Best page ever" />;
  },
};

export const ShortWithIcon: Story = {
  render: () => {
    return <Footer title="Best page ever" icon={CpuChipIcon} showIcon />;
  },
};

export const ShortWithSocial: Story = {
  render: () => {
    return (
      <Footer
        title="Best page ever"
        socialMedia={
          <>
            <FooterSocialItem href="/" type="bluesky" />
            <FooterSocialItem href="/" type="youtube" />
            <FooterSocialItem href="/" type="instagram" />
          </>
        }
      />
    );
  },
};

export const TallWithSocial: Story = {
  render: () => {
    return (
      <Footer
        title="Best page ever"
        subtitle="Amazing subtitle"
        height="tall"
        showSettings
        socialMedia={
          <>
            <FooterSocialItem href="/" type="bluesky" />
            <FooterSocialItem href="/" type="youtube" />
            <FooterSocialItem href="/" type="instagram" />
          </>
        }
      />
    );
  },
};

export const TallWithLinks: Story = {
  render: () => {
    return (
      <Footer
        title="Best page ever"
        subtitle="Amazing subtitle"
        height="tall"
        showSettings
        links={[
          {
            header: 'Test header',
            links: (
              <>
                <FooterItem as={Link} to="/">
                  Test link
                </FooterItem>
                <FooterItem as={Link} to="/">
                  Test link 2
                </FooterItem>
                <FooterItem as={Link} to="/">
                  Test link 3
                </FooterItem>
              </>
            ),
          },
          {
            header: 'Test header 2',
            links: (
              <>
                <FooterItem as={Link} to="/">
                  Test link 4
                </FooterItem>
                <FooterItem as={Link} to="/">
                  Test link 5
                </FooterItem>
                <FooterItem as={Link} to="/">
                  Test link 6
                </FooterItem>
              </>
            ),
          },
        ]}
      />
    );
  },
};

export const TallWithSocialAndLinks: Story = {
  render: () => {
    return (
      <Footer
        title="Best page ever"
        subtitle="Amazing subtitle"
        height="tall"
        showSettings
        socialMedia={
          <>
            <FooterSocialItem href="/" type="bluesky" />
            <FooterSocialItem href="/" type="youtube" />
            <FooterSocialItem href="/" type="instagram" />
          </>
        }
        links={[
          {
            header: 'Test header',
            links: (
              <>
                <FooterItem as={Link} to="/">
                  Test link
                </FooterItem>
                <FooterItem as={Link} to="/">
                  Test link 2
                </FooterItem>
                <FooterItem as={Link} to="/">
                  Test link 3
                </FooterItem>
              </>
            ),
          },
          {
            header: 'Test header 2',
            links: (
              <>
                <FooterItem as={Link} to="/">
                  Test link 4
                </FooterItem>
                <FooterItem as={Link} to="/">
                  Test link 5
                </FooterItem>
                <FooterItem as={Link} to="/">
                  Test link 6
                </FooterItem>
              </>
            ),
          },
        ]}
      />
    );
  },
};
