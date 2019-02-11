import styled from 'styled-components';

const Wrapper = styled.div`
  font-weight: bold;
  background-image: url(${props => props.imgObj.url});
  background-size: cover;
  background-position: 50% 50%;
  height: 80%;
  float: left;
  width: 22%;
  box-sizing: border-box;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;
export default Wrapper;
