import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { useAuth } from "./useAuth";
import Loader from "component/Loader";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

export function LoginForm() {
  const { switchToSignup } = useContext(AccountContext);

  const { loginValues, handleChange, handleLogin, loaders } = useAuth();

  return (
    <BoxContainer>
      <FormContainer id="myloginform" onSubmit={handleLogin}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={loginValues.email}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={loginValues.password}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton form="myloginform" type="submit">
        {
          loaders.login ? (
            <Loader size="17" color="#eee" />
          ) : (
            "Sign in"
          )
        }
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don&apos;t have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
