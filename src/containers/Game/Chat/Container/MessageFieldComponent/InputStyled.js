import styled from 'styled-components';

const Wrapper = styled.div`
  width: 18%;
  height: auto;
  text-align: center;
  position: fixed;
  bottom: 7.4vh;
  opacity: 0.8;
  margin: 0 auto;

  textarea {
    overflow: hidden;
    box-sizing: content-box;
    width: 85%;
    font-size: 14px;
    border-radius: 10px;
    border: 6px solid #556677;
    height: auto;
    margin: auto;
  }
`;

export default Wrapper;
