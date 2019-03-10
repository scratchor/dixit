import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: rgba(214, 115, 34, 0.3);
  width: 93%;
  height: 22vh;
  clear: left;
  box-sizing: border-box;
  margin: 0 auto;
  box-shadow: 0 0 10px 5px rgba(221, 221, 221, 0.4);
  border-radius: 5px;

  .hidden {
    visibility: hidden;
  }

  .opacity {
    opacity: 0;
  }

  .animation {
    opacity: 0; /*Элемент полностью прозрачный (невидимый)*/
    transition: 1s; /*Скорость перехода состояния элемента*/

    animation: show 3s 1; /* Указываем название анимации, её время и количество повторов*/
    animation-fill-mode: forwards; /* Чтобы элемент оставался в конечном состоянии анимации */
  }

  @keyframes show {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;

export default Wrapper;
