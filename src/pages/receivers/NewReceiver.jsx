import { useState } from 'react';
import { Link } from 'react-router-dom';
import ReceiversData from './components/ReceiversData';
import ReceiversService from '../../services/receivers/ReceiversService';
import notifiers from '../../utils/notifiers';
import tools from '../../utils/tools';
import validators from '../../utils/validators';
import formatters from '../../utils/formatters';

const NewReceiver = () => {
  const [dto, setDto] = useState(
    {
      'id': '',
      'name': '',
      'email': '',
      'tax_id': '',
      'branch': null,
      'account': null,
      'account_type': null,
      'bank_name': null,
      'bank_code': null,
      'pix_key': '',
      'pix_key_type': 'cpf',
      'status': 'rascunho',
      'created_at': null,
      'updated_at': null
  });
  const [isValid, setIsValid] = useState(true);

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
  };

  const handleValidation = (value) => {
    setIsValid(value);
  };

  const handleSave = async () => {
    const valid = validators.requiredValidation(dto);
    if(isValid && valid) {
      try {
          let data = tools.clone(dto);
          dto.id = tools.uuidv4();
          dto.created_at = formatters.formatDate(new Date());
          const result = await ReceiversService.create(data);
          if (typeof result === 'string') {
            notifiers.showNotification({type:'danger', msg: result});
          } else {
            tools.openURL('/');
          }
      } catch(e) {
        notifiers.showNotification({type:'danger', msg: e.message});
      }
    } else {
      notifiers.showNotification({type:'danger', msg: 'Por favor, preencha todos os campos corretamente'});
    }
  }

  return (
    <main className='flex jc-fc'>
      <div className='nreceiver-container'>
        <ReceiversData dto={dto} onInputChange={handleInputChange} onModel={setModel} onValidation={handleValidation} />
        <div className='receiver-footer flex ai-fc jc-sb mt-80'>
          <Link to='/'><button className='btn btn-secondary'>Voltar</button></Link>
          <button data-testid='btn-saverec' onClick={handleSave} className='btn btn-primary'>Salvar</button>
        </div>
      </div>
    </main>
    
  )
}

export default NewReceiver;