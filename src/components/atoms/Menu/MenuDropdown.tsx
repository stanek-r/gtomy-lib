import React, { ReactNode } from 'react';

export interface MenuDropdownProps {
  title: string;
  children?: ReactNode;
}

export function MenuDropdown({ title, children }: MenuDropdownProps) {
  return (
    <li>
      <details>
        <summary>{title}</summary>
        <ul className="rounded-t-none bg-neutral p-2">{children}</ul>
      </details>
    </li>
  );
}
