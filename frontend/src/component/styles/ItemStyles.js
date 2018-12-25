import styled from 'styled-components';

const Item = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  opacity: ${props => props.archive ? 0.7: 1};
  &:hover{
     opacity: 1;
  }
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  h3{
    font-family: ${props => props.theme.fontAlt};
    padding: 0 1rem;
    text-transform: uppercase;
    letter-spacing: 1.4px;
  }
  p {
    line-height: 1.4;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 1rem;
    font-size: 1rem;
    margin: 0 0 1rem;
  }
  .attachments{
     position: absolute;
     right: 1px;
     top: 1px;
     a{
      color: ${props => props.theme.black};
     }
     img, svg{
       max-width: 3rem;
       max-height: 3rem;
     }
     .pin{
       position: absolute;
       right: -12px;
       top: -12px;
       z-index: 99;  
       color: ${props => props.theme.red};
       transform: rotate(45deg);
     }
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-family: ${props => props.theme.fontAlt};
      letter-spacing: 3px;
      font-size: 1rem;
      padding: 1rem;
      text-decoration: none;
      color:  ${props => props.theme.darkgrey};
    }
    svg{
       padding-bottom: 2px;
    }
    a.danger{
        color:  ${props => props.theme.red};
    }
  }
`;

export default Item;
