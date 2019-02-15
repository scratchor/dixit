import styled from 'styled-components';

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 130px;
  margin-top: 270px;

  button {
    margin-top: 5px;
    margin-right: 75px;
    border: 1px solid white;
    cursor: pointer;
    color: white;
    padding: 6px;
    width: 100px;
    text-align: center;
    border-radius: 5px;
    font-size: 19px;

    :hover {
      background-color: white;
      color: black;
    }
  }

  p {
    margin: 0;
    color: red;
    font-size: 12px;
  }

  label {
    margin: 10px;
    color: white;
  }

  input {
    margin-left: 20px;
    height: 27px;
    border-radius: 3px;
  }

  p {
    height: 0.9rem;
  }
`;

export default Wrapper;
