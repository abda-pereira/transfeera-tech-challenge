import Modal from '../modal/Modal';

const ModalConfirmation = ({isOpen, onClose, onConfirmation, params}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} classContent='sm-modal' testId='confirmation'>
         <h1 className='modal-title'>{params.title}</h1>
         <h2 className='modal-subtitle'>{params.subtitle}</h2>
         <p>{params.description}</p>

         <div className='modal-footer'>
            <button onClick={onClose} className='btn btn-secondary'>Cancelar</button>
            <button data-testid='btn-confirmation' onClick={onConfirmation} className={`btn ${params.classConfirmationBtn}`}>{params.labelConfirmationBtn}</button>
         </div>
    </Modal>
  )
}

export default ModalConfirmation