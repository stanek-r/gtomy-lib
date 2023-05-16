import React, { useRef, useState } from 'react';
import { Button, TextInput } from '../atoms';
import { useAuth } from '../../utils';
import { Link, useNavigate } from 'react-router-dom';
import { config } from '../../config';
import { Applications } from '../../utils/applications';

interface Props {
  backURL?: string;
}

export function LoginPage({ backURL }: Props) {
  const { isAuthenticated, user, login, logout } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!usernameRef.current || !passwordRef.current) return;
    if (usernameRef.current.value.trim() === '' || passwordRef.current.value.trim() === '') return;
    login(usernameRef.current.value, passwordRef.current.value).then((value) => {
      if (value) {
        navigate(backURL || '/');
      } else {
        setError('Invalid username or password');
      }
    });
  };

  if (isAuthenticated) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="flex flex-col w-[400px] max-w-full gap-y-4">
          <span className="text-3xl text-center font-bold">You are already logged in as {user?.displayName}!</span>
          <div className="flex justify-center gap-x-2">
            <Button as={Link} to="/">
              Back
            </Button>
            <Button onClick={logout}>Logout</Button>
          </div>
        </div>
      </div>
    );
  }

  let registerUrl = Applications.GTOMY_NET.baseUrl + '/register';
  if (config.application) {
    registerUrl += '?backApp=' + config.application.name;
  }

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col w-[400px] max-w-full gap-y-3">
        {config.application?.displayName && (
          <h1 className="text-3xl font-bold text-center mb-8">{config.application.displayName}</h1>
        )}
        <TextInput ref={usernameRef} placeholder="Username" name="username" />
        <TextInput ref={passwordRef} type="password" placeholder="Password" name="password" />
        {error && <p className="text-red-500">{error}</p>}
        <div className="btn-group justify-center">
          <Button onClick={handleSubmit} className="w-1/2 sm:w-1/3" color="primary">
            Login
          </Button>
          <Button as="a" href={registerUrl} className="w-1/2 sm:w-1/3">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
