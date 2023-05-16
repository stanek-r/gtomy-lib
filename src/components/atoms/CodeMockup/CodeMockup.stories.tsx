import type { Meta, StoryObj } from '@storybook/react';
import { CodeMockup } from './CodeMockup';

const meta: Meta<typeof CodeMockup> = {
  title: 'CodeMockup',
  component: CodeMockup,
};

export default meta;
type Story = StoryObj<typeof CodeMockup>;

const rows = [
  "import { BrowserRouter, Route, Routes } from 'react-router-dom';",
  "import { LoginPage, RequireAuth, ThemeProvider } from 'gtomy-lib';",
  "import { TestChat } from './components/TestChat';",
  '',
  'export default function App() {',
  '  return (',
  '    <ThemeProvider>',
  '      <BrowserRouter>',
  '        <Routes>',
  '          <Route',
  '            path="/"',
  '            element={',
  '              <RequireAuth>',
  '                <TestChat />',
  '              </RequireAuth>',
  '            }',
  '          />',
  '          <Route path="/login" element={<LoginPage />} />',
  '        </Routes>',
  '      </BrowserRouter>',
  '    </ThemeProvider>',
  '  );',
  '}',
];

export const Default: Story = {
  args: {
    rows: rows,
  },
};

export const Primary: Story = {
  args: {
    rows: rows,
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    rows: rows,
    color: 'secondary',
  },
};

export const Success: Story = {
  args: {
    rows: rows,
    color: 'success',
  },
};

export const Error: Story = {
  args: {
    rows: rows,
    color: 'error',
  },
};

export const Warning: Story = {
  args: {
    rows: rows,
    color: 'warning',
  },
};

export const Info: Story = {
  args: {
    rows: rows,
    color: 'info',
  },
};