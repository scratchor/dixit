import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: red;
  width: 100%;
  box-sizing: border-box;
  margin: 0.5vh auto 1vh auto;
  height: 83vh;
  text-align: center;
  overflow: auto;

  .hey {
    width: 100%;
    height: 10vh;
    background-color: blue;
    margin: 5px auto;
  }

  .messages {
    height: auto;
    width: 90%;
    text-align: center;
    margin: 0 auto 11vh auto;
  }
`;

export default Wrapper;
