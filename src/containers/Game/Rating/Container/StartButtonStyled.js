/* eslint-disable no-use-before-define */
import styled from 'styled-components';

const Wrapper = styled.button`
  color: #fff;
  position: relative;
  height: 4vh;
  font-size: 2vw;
  cursor: pointer;
  transition: 800ms ease all;
  width: 80%;
  line-height: 1;
  text-align: center;
  margin: 1vh 0;
  box-sizing: border-box;
  font-family: 'Oswald', Helvetica;
  text-shadow: -1px -1px 0 #a84155;
  border: 1px solid #d25068;
  background-image: linear-gradient(to bottom, #f66c7b, #d25068);
  border-radius: 5px;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.5) inset,
    0 -1px 0 rgba(255, 255, 255, 0.1) inset, 0 4px 0 #ad4257,
    0 4px 2px rgba(0, 0, 0, 0.5);

  ${Wrapper}:hover {
    background: rgba(235, 252, 0, 0.7);
    color: #000;
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.5) inset,
      0 -1px 0 rgb(0, 0, 0) inset, 0 4px 0 rgb(0, 0, 0), 0 4px 2px rgb(0, 0, 0);
    border: 1px solid rgb(0, 0, 0);
  }
  ${Wrapper}:before, ${Wrapper}:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 2px;
    width: 0;
    background: #000;
    transition: 400ms ease all;
  }
  ${Wrapper}:hover:before, ${Wrapper}:hover:after {
    width: 100%;
    transition: 800ms ease all;
  }
  ${Wrapper}:active {
    left: 0.01em;
    box-shadow: 0 0 0 60px rgba(0, 0, 0, 0.05) inset;
    -webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.5) inset,
      0 -1px 0 rgba(255, 255, 255, 0.1) inset;
    top: 5px;
  }
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
  ${Wrapper}:active:before {
    top: -11px;
    bottom: -5px;
    content: '';
  }
`;

export default Wrapper;
