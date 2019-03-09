import styled from 'styled-components';

const Wrapper = styled.div`
  font-weight: bold;
  height: 6.5vh;
  margin: 1vh 0;
  box-sizing: border-box;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  position: relative;

  .view {
    display: none;
  }

  .showAndHide {
    opacity: 0; /*Элемент полностью прозрачный (невидимый)*/
    transition-timing-function: linear;
    transition-duration: 2s;

    animation: showAndHide 7s 1; /* Указываем название анимации, её время и количество повторов*/
    animation-fill-mode: forwards; /* Чтобы элемент оставался в конечном состоянии анимации */
    animation-delay: 1s; /* Задержка перед началом */
  }

  @keyframes showAndHide {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export default Wrapper;
