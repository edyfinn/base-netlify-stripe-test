import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useIdentityContext } from 'react-netlify-identity';

/*import {
  AuthOption,
  AuthText,
  Button,
  ButtonGoogle,
  Container,
  Form,
  Input,
  Label,
  Header,
  TextError,
} from '../../components';*/

export const LogIn: React.FunctionComponent = () => {
  const { loginUser } = useIdentityContext();
  const [error, setError] = useState(false);
  const emailInput = useRef<HTMLInputElement>(null!);
  const passwordInput = useRef<HTMLInputElement>(null!);
  const logInButton = useRef<HTMLButtonElement>(null!);

  useEffect(() => {
    logInButton.current.disabled = true;
  }, [emailInput, passwordInput]);

  const handleChange = (): void => {
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    if (email && password) {
      logInButton.current.disabled = false;
    } else {
      logInButton.current.disabled = true;
    }
  };

  const logIn = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    loginUser(email, password, true)
      .then(() => {
        <Link to="/home" />;
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };

  return (
    <>
    <div>
        <div>
            <h1>Log in</h1>
            <p>Log in with email:</p>
            <form onSubmit={logIn}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              ref={emailInput}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              ref={passwordInput}
              onChange={handleChange}
            />
            {error ? (
              <p>
                The email and/or password seems to be incorrect. Please check it
                and try again.
              </p>
            ) : null}
            <button type="submit" ref={logInButton}>
              Log in
            </button>
            </form>
        </div>
    </div>
     {/*  <Header name={'Log in'} />
      <Container>
        <AuthOption>
          <AuthText>Log in with email:</AuthText>
          <Form narrow onSubmit={logIn}>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              ref={emailInput}
              onChange={handleChange}
            />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              ref={passwordInput}
              onChange={handleChange}
            />
            {error ? (
              <TextError>
                The email and/or password seems to be incorrect. Please check it
                and try again.
              </TextError>
            ) : null}
            <Button type="submit" ref={logInButton}>
              Log in
            </Button>
          </Form>
        </AuthOption>
        <AuthOption>
          <AuthText>Or log in with Google:</AuthText>
          <ButtonGoogle>Log in with Google</ButtonGoogle>
        </AuthOption>
      </Container> */}
    </>
  );
};
