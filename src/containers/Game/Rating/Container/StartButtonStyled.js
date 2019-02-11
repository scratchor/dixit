/* eslint-disable no-use-before-define */
import styled from 'styled-components';

const Wrapper = styled.button`
  background: #000;
  color: #fff;
  border: none;
  position: relative;
  height: 6vh;
  font-size: 1.8vw;
  padding: 0 2em;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
  width: 80%;
  line-height: 1;  

  ${Wrapper}:hover {
    background: #fff;
    color: #000;
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
  ${Wrapper}:after {
    right: inherit;
    top: inherit;
    left: 0;
    bottom: 0;
  }
  ${Wrapper}:hover:before, ${Wrapper}:hover:after {
    width: 100%;
    transition: 800ms ease all;
  }
`;

export default Wrapper;
