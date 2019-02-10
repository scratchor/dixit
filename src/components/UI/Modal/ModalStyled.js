import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  z-index: 500;
  background-color: white;
  width: 60%;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px black;
  padding: 16px;
  left: 15%;
  top: 30%;
  box-sizing: border-box;
  transition: all 0.3s ease-out;
  transform: ${props => (props.show ? 'translateY(0)' : 'translateY(-1000px)')};
  opacity: ${props => (props.show ? 1 : 0)};
`;

export default Wrapper;
