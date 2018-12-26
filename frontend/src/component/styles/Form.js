import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  margin: ${props => props.full ? '0' :  '0 auto' };
  max-width: ${props => props.full ? '100%' :  '480px' };
  h2{
    font-size: 1.5rem;
    font-weight: 100;
    margin: 0;
    font-family: ${props => props.theme.fontAlt};
    letter-spacing: 1.4px;
    &.center{
      text-align: center;
    }
 
  }
  label {
    display: block;
    margin: 1.5rem 0;
    font-size: 1rem;
    font-weight: 100;
    p{
        margin: 0;
        padding: 0;
        font-size: 12px;
        color: ${props => props.theme.red};
        font-style: italic
    }
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid ${props => props.theme.darkgrey};
    font-family: "Open Sans", Arial, sans-serif;
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.black};
    }
    &.invalid{
      border-color: ${props => props.theme.red};
    }
  }
  button,
  input[type='submit'] {
    width: auto;
    background: red;
    color: white;
    border: 0;
    font-size: 1rem;
    font-weight: 400;
    padding: 0.5rem 1.2rem;
    &.disabled{
       opacity: 0.4
    }
  }
  fieldset {
    border: 0;
    padding: 0.4rem 0;
    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 1px;
      content: '';
      display: block;
      background-image: linear-gradient(to right, #ff3019 0%, #e2b04a 50%, #ff3019 100%);
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
  div.error{
     font-size: 1rem;
     color:  ${props => props.theme.red};
     margin: 0.4rem 0;
     text-align: center;
     font-weight: 100;
  }
  ul.error{
     margin: 10 0;
     padding: 0;
     font-size: 1rem;
     font-weight: 100;
     color:  ${props => props.theme.red};
     list-style: none;
     li {
        line-height: 16px;
        font-size:14px;
     }
  }
  
  .upload-container{
     background: ${props => props.theme.offWhite};
     padding: 0.4rem 1rem;
     margin-bottom: 1rem;
     position: relative;
     p{
        font-weight: 100;
        font-family: ${props => props.theme.fontAlt};
        letter-spacing: 1.4px;
        font-size:1rem;
     }
     .remove-attachment{
         position: absolute;
         right: 16px;
         top: 24px;
         font-size: 12px;
         cursor: pointer;
         color:  ${props => props.theme.red};
         
     }
  }
  
`;

export default Form;
