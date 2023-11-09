import { useState, useEffect } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import Modal from '../../../../components/modal/Modal';
import Tag from '../../../../components/tag/Tag';
import ReceiversData from '../ReceiversData';
import tools from '../../../../utils/tools';
import './ModalReceiverEdit.scss';
import '../../Receivers.scss';

const ModalReceiversEdit = ({isOpen, onClose, onDelete, onSave, item = {}}) => {
    const [dto, setDto] = useState(item);
    const [title] = useState(dto.name);

    const handleInputChange = (event, id) => {
        let name, value;
        if(!id){
            const target = event.target;
            value = target.type === 'checkbox' ? target.checked : target.value;
            name = target.name;
        } else {
            name = id;
            value = event.value
        }
        setDto({ ...dto, ...{ [name]: value }});
    };

    const setModel = (name, value) => {
        setDto({ ...dto, ...{ [name]: value } });
    }
    
    useEffect(() => {
        tools.toogleOverflow(isOpen);
    }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} testId='recedit'>
        <h1 className='modal-title'>{title}</h1>
        <Tag name={dto.status} className={`tag-${dto.status} bg-tag`}/>
        <ReceiversData dto={dto} onInputChange={handleInputChange} onModel={setModel} />
        <div className='modal-footer'>
            <button onClick={onClose} className='btn btn-secondary btn-back-mreceiver'>Voltar</button>
            <div className='flex ai-fc'>
                <button data-testid='btn-delrec' onClick={onDelete} className="btn-danger flex ai-fc"><MdDeleteForever className='i-18'/></button>
                <button data-testid='btn-updaterec' onClick={() => onSave(dto)} className='btn btn-primary ml-20'>Salvar</button>
            </div>
        </div>
    </Modal>
  )
}

export default ModalReceiversEdit;