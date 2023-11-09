import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/gray-logo.png';

const StyledFooter = styled.footer`
  padding: 42px 10px;

  img {
    height:50px;
  }
`;

const Footer = () => {
  return (
    <StyledFooter className='flex ai-fc jc-fc'>
        <Link to='/'>
          <img src={logo}/>
        </Link>
    </StyledFooter>
  )
}

export default Footer;