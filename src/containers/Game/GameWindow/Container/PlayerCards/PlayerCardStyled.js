import styled from 'styled-components';

const Wrapper = styled.img`
  background-color: yellow;
  width: 18%;
  height: 20vh;
  margin: 1vh 1%;
  box-sizing: border-box;
  display: inline-block;
  border: 1px solid white;
  border-radius: 7px;
  cursor: pointer;

  .playerCard {
  }

  .animation {
    opacity: 0; /*Элемент полностью прозрачный (невидимый)*/
    transition: 1s; /*Скорость перехода состояния элемента*/

    animation: show 3s 1; /* Указываем название анимации, её время и количество повторов*/
    animation-fill-mode: forwards; /* Чтобы элемент оставался в конечном состоянии анимации */
    animation-delay: 1s; /* Задержка перед началом */
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
