import styled from 'styled-components';

const Wrapper = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .avatar {
    font-weight: bold;
    background-size: cover;
    background-position: 50% 50%;
    height: 35px;
    width: 35px;
    box-sizing: border-box;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 5%;
  }

  .name {
    height: 20%;
    width: 100%;
    margin-top: 4%;
    display: block;
  }

  .avatarName {
    height: 100%;
    width: 90%;

    text-align: center;
  }

  .button:active {
    top: 0.1em;
    left: 0.1em;
    box-shadow: 0 0 0 60px rgba(0, 0, 0, 0.05) inset;
  }

  .button {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    cursor: pointer;
    font-family: Roboto;
    text-transform: uppercase;
    user-select: none;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 50%;
    border: 2px solid rgb(251, 255, 15);
    transition: box-shadow 400ms cubic-bezier(0.2, 0, 0.7, 1),
      transform 200ms cubic-bezier(0.1, 0, 0.7, 1.5);
    &:after {
      content: 'GO!';
      font-size: 2vw;
    }
    z-index: 2;
  }
  .button:hover {
    background: #e9ff00;
    transform: rotate(-360deg);
    box-shadow: 0 0 1px 15px rgba(#8a3b58, 0.4), 0 0 1px 30px rgba(#8a3b58, 0.1),
      0 0 1px 45px rgba(#8a3b58, 0.1);
    color: #000;
  }
  .button:active {
    box-shadow: inset 0px 2px 8px -1px #d7143b;
  }
  .fancy-button {
    margin: auto;
    position: relative;
    width: 50px;
    height: 50px;
  }

  .frills,
  .frills:after,
  .frills:before {
    position: absolute;
    background: #e9ff00;
    border-radius: 4px;
    height: 8px;
  }
  .frills:after,
  .frills:before {
    content: '';
    display: block;
  }
  .frills:before {
    bottom: 45px;
  }
  .frills:after {
    top: 45px;
  }
  .left-frills {
    right: 164px;
    top: 28.5px;
  }
  .active .left-frills {
    animation: move-left 0.38s ease-out, width-to-zero 0.38s ease-out;
  }
  .left-frills:before,
  .left-frills:after {
    left: 15px;
  }
  .active .left-frills:before {
    animation: width-to-zero 0.38s ease-out, move-up 0.38s ease-out;
  }
  .active .left-frills:after {
    animation: width-to-zero 0.38s ease-out, move-down 0.38s ease-out;
  }
  .right-frills {
    left: 164px;
    top: 28.5px;
  }
  .active .right-frills {
    animation: move-right 0.38s ease-out, width-to-zero 0.38s ease-out;
  }
  .right-frills:before,
  .right-frills:after {
    right: 15px;
  }
  .active .right-frills:before {
    animation: width-to-zero 0.38s ease-out, move-up 0.38s ease-out;
  }
  .active .right-frills:after {
    animation: width-to-zero 0.38s ease-out, move-down 0.38s ease-out;
  }
  .left-frills:before,
  .right-frills:after {
    transform: rotate(34deg);
  }
  .left-frills:after,
  .right-frills:before {
    transform: rotate(-34deg);
  }
  @keyframes move-left {
    0% {
      transform: none;
    }
    65% {
      transform: translateX(-80px);
    }
    100% {
      transform: translateX(-80px);
    }
  }
  @keyframes move-right {
    0% {
      transform: none;
    }
    65% {
      transform: translateX(80px);
    }
    100% {
      transform: translateX(80px);
    }
  }
  @keyframes width-to-zero {
    0% {
      width: 38px;
    }
    100% {
      width: 8px;
    }
  }
  @keyframes move-up {
    100% {
      bottom: 69.75px;
    }
  }
  @keyframes move-down {
    100% {
      top: 69.75px;
    }
  }
`;
export default Wrapper;
