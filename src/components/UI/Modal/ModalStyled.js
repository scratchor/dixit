import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  z-index: 500;
  width: 500px;
  padding: 16px;
  left: 35%;
  top: 15%;
  box-sizing: border-box;
  transition: all 0.3s ease-out;
  transform: ${props => (props.show ? 'translateY(0)' : 'translateY(-1000px)')};
  opacity: ${props => (props.show ? 1 : 0)};
  background-image: url(https://www.dropbox.com/s/hv6omwzxuq1anv4/%D0%B6%D0%B8%D1%80%D0%B0%D1%84.png?raw=1);
  background-position: -130px -78px;
  background-repeat: no-repeat;
  background-size: 147%;
  height: 600px;
`;

export default Wrapper;
