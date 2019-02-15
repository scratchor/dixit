import styled from 'styled-components';

const Wrapper = styled.li`
  display: flex;

  .active {
    outline-offset: -5px;
    outline: 1px solid grey;
  }

  :hover {
    outline-offset: -5px;
    outline: 1px solid grey;
  }
`;

export default Wrapper;
