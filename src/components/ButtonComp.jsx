// components/ButtonComp.js
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${(props) => props.bgColor || 'blue'};
  color: ${(props) => props.color || 'white'};
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 50px;
`;

export const ButtonComp = ({ type, content, bgColor, color, onClick }) => (
  <Button type={type} bgColor={bgColor} color={color} onClick={onClick}>
    {content}
  </Button>
);


