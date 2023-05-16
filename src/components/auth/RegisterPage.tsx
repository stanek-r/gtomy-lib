import React, { useRef, useState } from 'react';
import { Button, TextInput, Typography } from '../atoms';
import { useAuth } from '../../utils';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { config } from '../../config';
import { Applications } from '../../utils/applications';

export function RegisterPage() {
  const { isAuthenticated, user, register, logout } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  let backAppLoginUrl: string | undefined;
  if (searchParams.has('backApp')) {
    const application = Applications.getByName(searchParams.get('backApp')!);
    if (application) {
      backAppLoginUrl = application.baseUrl + '/login';
    }
  }

  const handleSubmit = () => {
    if (!usernameRef.current || !passwordRef.current || !password2Ref.current || !emailRef.current) return;
    if (
      usernameRef.current.value.trim() === '' ||
      passwordRef.current.value.trim() === '' ||
      emailRef.current.value.trim() === ''
    )
      return;
    if (passwordRef.current.value !== password2Ref.current.value) return;
    register(usernameRef.current.value, passwordRef.current.value, emailRef.current.value).then((value) => {
      if (value) {
        if (backAppLoginUrl) {
          window.location.href = backAppLoginUrl;
        } else {
          navigate('/login');
        }
      } else {
        setError('Cannot register with this username or password');
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
            {backAppLoginUrl ? (
              <Button as="a" href={backAppLoginUrl}>
                Back
              </Button>
            ) : (
              <Button as={Link} to="/">
                Back
              </Button>
            )}
            <Button onClick={logout}>Logout</Button>
          </div>
        </div>
      </div>
    );
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
        <TextInput ref={password2Ref} type="password" placeholder="Password again" name="passwordAgain" />
        <TextInput ref={emailRef} type="email" placeholder="Email" name="email" />
        {error && (
          <Typography color="red" className="text-center">
            {error}
          </Typography>
        )}
        <div className="btn-group justify-center">
          {backAppLoginUrl ? (
            <Button as="a" href={backAppLoginUrl} className="w-1/2 sm:w-1/3">
              Login
            </Button>
          ) : (
            <Button as={Link} to="/login" className="w-1/2 sm:w-1/3">
              Login
            </Button>
          )}
          <Button onClick={handleSubmit} className="w-1/2 sm:w-1/3" color="primary">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
