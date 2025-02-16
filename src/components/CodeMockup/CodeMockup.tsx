import { twMerge } from 'tailwind-merge';
import { codeMockupColorClasses, CodeMockupProps } from '@/components/CodeMockup/CodeMockup.core';

export function CodeMockup({ rows, color, className, numbered = true }: CodeMockupProps) {
  const classes = twMerge('mockup-code', color && codeMockupColorClasses[color], className);

  return (
    <div className={classes}>
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
