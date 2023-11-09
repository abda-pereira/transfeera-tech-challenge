import { useEffect } from 'react';
import styled from 'styled-components';
import { ImCross } from 'react-icons/im';
import tools from '../../utils/tools';
import './Modal.scss';

const ModalBackground = styled.div`
  display: ${props => (props.$show ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(159, 173, 187, 0.20);
  backdrop-filter: blur(4px);
`;

const CloseButton = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
  cursor: pointer;

  svg {
    width: 12px;
    height: 12px;
  }
`;

const Modal = ({ isOpen, onClose, children, classContent = '', testId=''}) => {
  

  const close = async () => {
    tools.toogleOverflow();
    onClose();
  }
  
  useEffect(() => {
    tools.toogleOverflow(isOpen);
  }, [isOpen]);
  
  return (
    <ModalBackground $show={isOpen} data-testid={`modal-${testId}`}>
      <div className={`modal-content ${classContent}`}>
        <CloseButton onClick={close}><ImCross /></CloseButton>
        {children}
      </div>
    </ModalBackground>
  )
}

export default Modal;