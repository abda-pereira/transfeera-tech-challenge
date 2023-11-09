import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import config from '../../config/config';
import { useLocation } from 'react-router-dom';
import { ImCross } from 'react-icons/im';

const StyledNavbar = styled.nav`
  height: 50px;
  gap: 30px;
  background-color: #1FBFAE;
  padding: 0 51px;
`

const NavItem = styled(Link)`
  color: #FFF;
  border-bottom: 3px solid ${props => props.$isActive ? '#FFF' : '#1FBFAE'};
  padding: 7px 13px 5px 1px;
`

const CloseButton = styled(Link)`
  color: #FFF;
  position: absolute;
  top: 67px;
  right: 15px;
`;

const Navbar = () => {
  const pathname = useLocation().pathname;
  const [selected, setSelected] = useState(config.selected);

  return (
    <StyledNavbar className='flex ai-fc'>
      {pathname !== '/receiver' ? config.menu.map((item) => {
            return <NavItem $isActive={selected === item.id} key={item.id} to={item.url} className='flex ai-fc h-100'
            onClick={() => setSelected(item.id)}>{item.label}</NavItem>
      }) :
        <CloseButton to='/'>
          <ImCross />
        </CloseButton>
      }
    </StyledNavbar>
  )
}

export default Navbar;