import styled from 'styled-components';

const Wrapper = styled.button`
  position: relative;
  width: 70%;
  height: 90%;
  text-align: center;
  color: #fff;
  margin: auto;
  font-family: 'Oswald', Helvetica;
  text-shadow: -1px -1px 0 #2c7982;
  background: #3eacba;
  border: 1px solid #379aa4;
  background-image: linear-gradient(top, #48c6d4, #3eacba);
  border-radius: 5px;
  line-height: 40%;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.5) inset,
    0 -1px 0 rgba(255, 255, 255, 0.1) inset, 0 4px 0 #338a94,
    0 4px 2px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;

  ${Wrapper}:before {
    background: #f0f0f0;
    background-image: -webkit-gradient(
      linear,
      0% 0%,
      0% 100%,
      from(#d0d0d0),
      to(#f0f0f0)
    );
    border-radius: 5px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) inset, 0 1px 0 #fff;

    position: absolute;
    content: '';
    left: -6px;
    right: -6px;
    top: -6px;
    bottom: -10px;
    z-index: -1;
  }

  ${Wrapper}:active {
    -webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.5) inset,
      0 -1px 0 rgba(255, 255, 255, 0.1) inset;
    top: 5px;
  }
  ${Wrapper}:active:before {
    top: -11px;
    bottom: -5px;
    content: '';
  }

  ${Wrapper}:hover {
    background: #48c6d4;
    background-image: linear-gradient(top, #3eacba, #48c6d4);
  }
`;

export default Wrapper;
