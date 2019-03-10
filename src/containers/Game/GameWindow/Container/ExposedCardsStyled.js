import styled from 'styled-components';

const Wrapper = styled.div`
  //background-image: url('https://www.dropbox.com/s/thb67vf353fgde6/0503.png?raw=1');
  background-size: 113% 60vh;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  width: 100%;
  height: 60vh;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;

  ${Wrapper}::after {
    content: '';
    background-image: url('https://www.dropbox.com/s/thb67vf353fgde6/0503.png?raw=1');
    background-size: 113% 60vh;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    opacity: 0.9;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: 1;
  }

  .cardsField {
    width: 93%;
    height: 52vh;
    margin: auto;
    clear: left;
    z-index: 2;
  }

  .animateExposed {
    transform: rotateY(180deg);
  }

  .view {
    display: none;
  }

  .deleteExposedAnim {
    opacity: 1; /*Элемент полностью прозрачный (невидимый)*/

    animation: deleteExposedAnim 3s 1; /* Указываем название анимации, её время и количество повторов*/
    animation-fill-mode: forwards; /* Чтобы элемент оставался в конечном состоянии анимации */
  }

  @keyframes deleteExposedAnim {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }

  .hidden {
    opacity: 0;
  }
`;

export default Wrapper;
