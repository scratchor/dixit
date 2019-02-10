import styled from 'styled-components';

const List = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  margin-top: 10px;
  border: 1px solid black;
  cursor: pointer;
  padding: 5px;

  :hover {
    background-color: black;
    color: white;
  }
`;

export { List, Button };
