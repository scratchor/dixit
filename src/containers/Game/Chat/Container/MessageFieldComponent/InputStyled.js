import styled from 'styled-components';

const Wrapper = styled.div`
  width: 16%;
  height: auto;
  text-align: center;
  position: fixed;
  bottom: 7.4vh;
  opacity: 0.8;
  margin: 0 0.2%;

  textarea {
    overflow: hidden;
    box-sizing: content-box;
    width: 100%;
    font-size: 14px;
    border-radius: 10px;
    border: 6px solid #556677;
    height: auto;
    margin: auto;
  }
`;

export default Wrapper;
