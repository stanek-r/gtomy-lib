import React, { useRef, useState } from 'react';
import { Button, TextInput } from '../atoms';
import { useAuth } from '../../utils';

interface Props {
  backURL?: string;
}

export function LoginPage({ backURL }: Props) {
  const { isAuthenticated, login, logout } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!usernameRef.current || !passwordRef.current) return;
    if (usernameRef.current.value.trim() === '' || passwordRef.current.value.trim() === '') return;
    login(usernameRef.current.value, passwordRef.current.value).then((value) => {
      if (value) {
        window.location.replace(backURL || '/');
      } else {
        setError('Invalid username or password');
      }
    });
  };

  if (isAuthenticated) {
    return (
      <div className="flex flex-col w-[500px] gap-y-3">
        <h1 className="text-3xl font-bold">You are already logged in!</h1>
        <Button onClick={logout}>Logout</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-[500px] mx-auto gap-y-3">
      <h1 className="text-3xl font-bold">Login</h1>
      <TextInput ref={usernameRef} placeholder="Username" name="username" />
      <TextInput type="password" ref={passwordRef} placeholder="Password" name="password" />
      {error && <p className="text-red-500">{error}</p>}
      <Button onClick={handleSubmit}>Login</Button>
    </div>
  );
}
