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
        <ul className="p-2 bg-base-100 rounded-t-none">{children}</ul>
      </details>
    </li>
  );
}
