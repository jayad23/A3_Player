import styled from "styled-components";

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
  align-items: center;
  flex-direction: column;
  `;

export const FormContainer = styled.form`
  gap: 2px;
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
`;

export const MutedLink = styled.a`
  font-size: 11px;
  font-weight: 500;
  text-decoration: none;
  color: rgba(200, 200, 200, 0.8);
`;

export const BoldLink = styled.a`
  font-size: 11px;
  margin: 0 4px;
  font-weight: 500;
  text-decoration: none;
  color:rgb(47,64,182);
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: none;
  padding: 0px 10px;
  font-size: 12px;
  transition: all 200ms ease-in-out;
  border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(47,64,182);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 11px 35%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgb(47,64,182);
  &:hover {
    filter: brightness(1.03);
  }
`;
