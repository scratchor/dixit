import styled from 'styled-components';

const Wrapper = styled.div`
  width: 18%;
  height: 25vh;
  box-sizing: border-box;
  margin: 0.5vh 1%;
  background-color: green;
  position: relative;
  float: left;
  border: 1px solid white;
  border-radius: 7px;
  transform-style: preserve-3d;
  transition: all 1s linear;

  img {
    width: 100%;
    height: 100%;
    border-radius: 7px;
  }

  .face.back {
    transform: rotateY(180deg);
    box-sizing: border-box;
    display: block;
  }
  .face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }

  ${Wrapper}:hover {
    transform: rotateY(180deg);
  }
`;

export default Wrapper;
