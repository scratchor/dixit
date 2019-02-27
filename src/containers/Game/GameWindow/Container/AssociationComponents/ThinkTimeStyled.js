import styled from 'styled-components';

const Wrapper = styled.div`
  width: 25%;
  height: 100%;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  line-height: 100%;

  div {
    height: 50%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5vw;
    letter-spacing: 1px;
  }
`;

export default Wrapper;
