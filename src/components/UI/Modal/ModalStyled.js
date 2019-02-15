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
  background-image: url(https://previews.dropbox.com/p/thumb/AAUUK-HPugEa_1YI40PkahKSrvZmUMPMReKtdnwgNVzpuxMg5QrhumUQmM-bCxaXOlgC8I88KZiqU85kERzObcIUs2WRkda_-0DitYJLV0Vmea6cGNAOVIlMQ8fsZa63_07Qh7wnHibC2J92NYfI2zdTjTKHlb61bplOoV0l2gx2V4e5TBnlvf-tg2rz2HDx7A51JyNCjAJP_7E2eEX_SOs7GbuvgtL8Cn_bfoegnNwAEA/p.png?size_mode=5);
  background-position: -130px -78px;
  background-repeat: no-repeat;
  background-size: 147%;
  height: 600px;
`;

export default Wrapper;
