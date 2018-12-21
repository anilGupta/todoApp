import React from 'react'
import styled from 'styled-components';

const SpinnerStyle = styled.div`
    text-align: center;
    min-height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;


const
  Spinner = () => {
    return (
      <SpinnerStyle>
        <img src="/assets/images/spinner.svg" alt="loading"/>
      </SpinnerStyle>
    )
  };
export default Spinner;