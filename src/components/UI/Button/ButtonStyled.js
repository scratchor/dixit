import styled from 'styled-components';

const Wrapper = styled.button`
  color: white;
  cursor: pointer;
  padding: 20px;
  margin-left: 20px;

  :hover {
    outline-offset: -5px;
    outline: 1px solid grey;
  }
`;

export default Wrapper;
