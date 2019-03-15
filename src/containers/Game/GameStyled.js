import styled from 'styled-components';

const Wrapper = styled.div`
  background-position: 50% 50%;
  background-size: cover;
  background-color: rgba(13, 7, 68, 0.8);
  width: 100%;
  height: 94vh;
  min-width: 800px;
  position: relative;
  //min-height: 100vw;

  ${Wrapper}::after {
    content: '';
    background-image: url('https://www.dropbox.com/s/ft16g7l3yohjgky/%D0%9C%D0%BE%D0%BD%D1%82%D0%B0%D0%B6%D0%BD%D0%B0%D1%8F%20%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C%201.png?raw=1');
    background-position: 50% 50%;
    background-size: cover;
    background-color: rgba(13, 7, 68, 1);
    opacity: 0.5;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }
`;

export default Wrapper;
