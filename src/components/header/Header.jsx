import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const StyledHeader = styled.header`
  height: 50px;
  padding: 10px 50px 15px;
  
  img {
    height:25px;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
        <Link to='/'>
          <img src={logo}/>
        </Link>
    </StyledHeader>
    
  )
}

export default Header