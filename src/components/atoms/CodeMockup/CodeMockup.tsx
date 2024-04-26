import { twMerge } from 'tailwind-merge';

export const codeMockupColorClasses = {
  neutral: 'bg-neutral text-neutral-content',
  primary: 'bg-primary text-primary-content',
  secondary: 'bg-secondary text-secondary-content',
  success: 'bg-success text-success-content',
  error: 'bg-error text-error-content',
  warning: 'bg-warning text-warning-content',
  info: 'bg-info text-info-content',
};

export interface CodeMockupProps {
  rows: string[];
  color?: 'neutral' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  className?: string;
  numbered?: boolean;
}

export function CodeMockup({ rows, color, className, numbered = true }: CodeMockupProps) {
  return (
    <div className={twMerge('mockup-code', color && codeMockupColorClasses[color], className)}>
      {rows.map((row, index) =>
        numbered ? (
          <pre key={index} data-prefix={index + 1}>
            <code>{row}</code>
          </pre>
        ) : (
          <pre key={index}>
            <code>{row}</code>
          </pre>
        )
      )}
    </div>
  );
}
