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
