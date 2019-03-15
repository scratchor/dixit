import styled from 'styled-components';

const Wrapper = styled.div`
  background-position: 50% 50%;
  background-size: cover;
  background-image: url(https://www.dropbox.com/s/hv6omwzxuq1anv4/%D0%B6%D0%B8%D1%80%D0%B0%D1%84.png?raw=1);
  width: 90%;
  height: 60vh;
  z-index: 2;
  top: 7vh;
  right: -10%;
  position: relative;
  animation: notification 15s linear 1;
  animation-fill-mode: forwards;

  div {
    width: 50%;
    height: 50%;
    position: absolute;
    top: 46%;
    right: 27%;
    color: yellow;
    font-family: Georgia;
    word-spacing: 2px;
    line-height: 1.2;
  }

  p {
    margin-top: 3vh;
  }

  //.notification {
  //   color: white;
  //  animation: notification 3s linear 1; /* Указываем название анимации, её время и количество повторов*/
  //  animation-fill-mode: forwards; /* Чтобы элемент оставался в конечном состоянии анимации */
  //}

  @keyframes notification {
    0% {
      transform: translateX(0);
    }

    20% {
      transform: translateX(-100%);
    }
    80% {
      transform: translateX(-100%);
    }

    100% {
      transform: translateX(0);
    }
  }
`;

export default Wrapper;
