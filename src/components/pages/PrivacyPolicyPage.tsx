import React from 'react';
import { useTranslation } from '@/utils';
import { ColumnPage } from '@/components/layout';
import { Typography } from '@/components/atoms/Typography';

export interface PrivacyPolicyPageProps {
  width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function PrivacyPolicyPage({ width }: PrivacyPolicyPageProps) {
  const { t } = useTranslation('gtomy');
  return (
    <ColumnPage width={width}>
      <Typography size="4xl" weight="semibold">
        {t('privacy.title')}
      </Typography>
      <Typography size="xl" weight="semibold">
        Effective Date: 25.02.2024
      </Typography>
      <p>
        This Privacy Policy applies to all websites, applications, and services (collectively, &quot;Services&quot;)
        operated by GTomy (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). We are committed to protecting the
        privacy of our users (&quot;you&quot; or &quot;your&quot;). This policy outlines how we collect, use, disclose,
        and safeguard your information when you visit our Services.
      </p>
      <Typography size="xl" weight="medium">
        Information We Collect
      </Typography>
      <p>
        Upon registration, either directly via email and password or through your Google account, we collect the
        following information:
      </p>
      <ul>
        <li>Email Address: Used as part of your login credentials.</li>
        <li>Password: Encrypted and stored securely for authentication purposes (only if registering directly).</li>
        <li>
          Profile picture: Optional for enhancing your profile visibility. Display Name: To personalize your user
          experience across our platforms.
        </li>
      </ul>
      <p>
        Additionally, while using our services, certain technical data like IP address/browser details may be logged by
        Sentry for error tracking and improving application stability.
      </p>
      <Typography size="xl" weight="medium">
        How We Use Your Information
      </Typography>
      <p>The collected information is used in various ways:</p>
      <ul>
        <li>To facilitate account creation and logon process across our different platforms.</li>
        <li>Enhance user experience by allowing customization options like display names and profile pictures.</li>
        <li>Maintain security standards and protect against unauthorized access or usage.</li>
        <li>For maintaining the performance of our Services including troubleshooting issues through error logs.</li>
        <li>To personalize user experience across all applications under our ecosystem.</li>
      </ul>
      <Typography size="xl" weight="medium">
        Sharing of Your Information
      </Typography>
      <p>
        We do not sell or rent personal information to third parties. However, aggregated anonymized data might be
        shared for analytics purposes without revealing any personally identifiable information.
      </p>
      <p>
        In cases where it becomes necessary to share personal information with third-party service providers (e.g.,
        Sentry), they are bound by confidentiality agreements prohibiting the misuse of such data beyond its intended
        purpose.
      </p>
      <Typography size="xl" weight="medium">
        Data Security
      </Typography>
      <p>
        We implement a variety of security measures aimed at protecting against unauthorized access or alteration of
        your personal data. Despite these efforts no method over the internet can be guaranteed as completely secure
        therefore we cannot ensure absolute security.
      </p>
      <Typography size="xl" weight="medium">
        Your Rights Under GDPR
      </Typography>
      <p>
        If you reside in the European Union (EU), European Economic Area (EEA), or United Kingdom (UK), General Data
        Protection Regulation grants rights concerning personal data:
      </p>
      <ul>
        <li>Right to Access: Request copies of personal data we hold about you.</li>
        <li>Right to Rectification: Correct inaccurate personal data about yourself that we possess.</li>
        <li>Right to Erasure: Request deletion of your personal data under certain conditions.</li>
        <li>Right to Restrict Processing: Request restriction on how we process your personal data.</li>
        <li>
          Right to Data Portability: Receive a copy of the data we have about you in a structured, machine-readable
          format and request the transfer of this data to another controller.
        </li>
        <li>Right to Object: Object at any time to processing of personal data concerning you.</li>
      </ul>
      <p>
        To exercise these rights, please contact us using the information provided below. Note that some requests may
        require identity verification.
      </p>
      <Typography size="xl" weight="medium">
        Children&apos;s Privacy
      </Typography>
      <p>
        Our Services are not intended for individuals under the age of 16. We do not knowingly collect personally
        identifiable information from children under 16. If you become aware that a child has provided us with personal
        data without parental consent, please contact us so that we can take steps to remove such information and
        terminate the child’s account.
      </p>
      <Typography size="xl" weight="medium">
        Changes To This Policy
      </Typography>
      <p>
        We reserve the right to make changes to this privacy policy at any time. When updated, we will revise the
        &quot;Effective Date&quot; at the top of this policy and post the new policy on our services. We encourage users
        to frequently check this page for any changes. Your continued use of our services following posting changes will
        constitute your acceptance of those changes.
      </p>
      <Typography size="xl" weight="medium">
        Contact Us
      </Typography>
      <p>
        If you have questions or concerns about our Privacy Policy or wish to exercise your rights as described above,
        please contact us through:
      </p>
      <ul>
        <li>Email: stanek@gtomy.net</li>
        <li>IG/Threads: @gtomyasek</li>
      </ul>
      <p>
        By providing clear channels for communication regarding privacy concerns and exercising GDPR rights, we aim at
        maintaining transparency and trust with our users while ensuring compliance with applicable laws and
        regulations.
      </p>
      <p>
        Remember that protecting your privacy starts with being mindful about what information you share online. Always
        think twice before sharing sensitive details on websites or applications.
      </p>
    </ColumnPage>
  );
}
