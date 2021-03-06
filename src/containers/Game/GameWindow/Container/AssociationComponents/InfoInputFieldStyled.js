import styled from 'styled-components';

const Wrapper = styled.div`
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  p {
    width: 100%;
    font-size: 1.2em;
    word-break: break-all;
  }
  input {
    width: 100%;
    text-align: center;
  }
`;

export default Wrapper;
