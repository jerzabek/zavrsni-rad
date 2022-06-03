import styled from "styled-components"

interface ButtonProps {
  disabled?: boolean
}

export const Button = styled.button<ButtonProps>`
  display: inline-block;
  outline: 0;
  
  border: none;
  
  padding: 0 56px;
  height: 38px;
  
  line-height: 38px;
  border-radius: 7px;

  background-color: #0070f3;
  color: white;

  font-weight: 400;
  font-size: 16px;

  box-shadow: 0 4px 14px 0 rgb(0 118 255 / 39%);
  transition: background 0.2s ease,color 0.2s ease,box-shadow 0.2s ease;
  ${({ disabled = false }) => disabled ? 'opacity: 0.6;' : `
    cursor: pointer;

    :hover{
      background: rgba(0,118,255,0.9);
      box-shadow: 0 6px 20px rgb(0 118 255 / 23%);
    }
  `}
`

export const RedButton = styled.button<ButtonProps>`
  display: inline-block;
  outline: 0;
  
  border: none;
  
  padding: 0 56px;
  height: 38px;
  margin-right: 1rem;
  
  line-height: 38px;
  border-radius: 7px;

  background-color: #d62828;
  color: white;

  font-weight: 400;
  font-size: 16px;

  box-shadow: 0 4px 14px 0 rgb(0 118 255 / 39%);
  transition: background 0.2s ease,color 0.2s ease,box-shadow 0.2s ease;
  cursor: pointer;

  :hover{
    background: rgba(214, 40, 40, 0.9);
    box-shadow: 0 6px 20px rgb(0 118 255 / 23%);
  }
`

export const OutlineButton = styled.button<ButtonProps>`
  display: inline-block;
  outline: 0;

  border: none;

  padding: 0 56px;
  height: 38px;

  line-height: 38px;
  border-radius: 7px;

  font-weight: 400;
  font-size: 16px;

  background: #fff;
  color: #696969;

  box-shadow: 0 4px 14px 0 rgb(0 0 0 / 10%);
  transition: background 0.2s ease,color 0.2s ease,box-shadow 0.2s ease;

  ${({ disabled = false }) => disabled ? 'opacity: 0.6;' : `
    cursor: pointer;

    :hover{
      background: rgba(255,255,255,0.9);
      box-shadow: 0 6px 20px rgb(93 93 93 / 23%);
    }
  `}
`