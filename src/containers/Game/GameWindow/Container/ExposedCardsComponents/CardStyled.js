import styled from 'styled-components';

const Wrapper = styled.div`
  width: 18%;
  height: 25vh;
  box-sizing: border-box;
  margin: 0.5vh 1%;
  position: relative;
  float: left;
  transform-style: preserve-3d;
  transition: all 1s linear;
  cursor: pointer;

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

  .back {
    overflow: hidden;
  }

  .selected:after {
    content: 'SELECTED';
    background: #c76649;
    z-index: 800;
    padding-top: 3px;
    color: white;
    font-family: Roboto;
    letter-spacing: 1px;
    font-weight: 400;
    text-transform: none;
    text-align: center;
    display: inline-block;
    width: 100px;
    font-size: 12px;
    line-height: 14px;
    transform-origin: center center;
    top: 19px;
    border-bottom: 2px solid #7a3521;
    right: -22px;
    transform: rotate(45deg);
    position: absolute;
    box-shadow: 0 0 10px 5px rgba(221,221,221,0.4);
};
  }
`;

export default Wrapper;
