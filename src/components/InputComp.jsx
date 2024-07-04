import styled from 'styled-components';

const Input = styled.input`
  padding: 10px 20px;
  border: 2px solid #6a0dad;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: bold;
`;

export const InputComp = (props) => {
  return (
    <Input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  )
}