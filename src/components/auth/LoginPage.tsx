import React, { useRef, useState } from 'react';
import { Button, TextInput, Typography } from '../atoms';
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
        <div className="flex flex-col w-[500px] max-w-full gap-y-4">
          <Typography size="3xl" weight="bold" className="text-center">
            You are already logged in as {user?.displayName}!
          </Typography>
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
  let registerUrl: string | undefined;
  if (config.application) {
    if (config.application.name !== Applications.GTOMY_NET.name) {
      registerUrl = Applications.GTOMY_NET.baseUrl + '/register?backApp=' + config.application.name;
    }
  } else {
    registerUrl = Applications.GTOMY_NET.baseUrl + '/register';
  }

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col w-[400px] max-w-full gap-y-3">
        {config.application?.displayName && (
          <Typography as="h1" size="3xl" weight="bold" className="text-center mb-3">
            {config.application.displayName}
          </Typography>
        )}
        <TextInput ref={usernameRef} placeholder="Username" name="username" />
        <TextInput ref={passwordRef} type="password" placeholder="Password" name="password" />
        {error && (
          <Typography color="red" className="text-center">
            {error}
          </Typography>
        )}
        <div className="btn-group justify-center">
          <Button onClick={handleSubmit} className="w-1/2 sm:w-1/3" color="primary">
            Login
          </Button>
          {registerUrl ? (
            <Button as="a" href={registerUrl} className="w-1/2 sm:w-1/3">
              Register
            </Button>
          ) : (
            <Button as={Link} to="/register" className="w-1/2 sm:w-1/3">
              Register
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
