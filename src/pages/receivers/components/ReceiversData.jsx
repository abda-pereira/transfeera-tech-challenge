import { useState, useEffect } from 'react';
import { PatternFormat } from 'react-number-format';
import { mask as masker, unMask } from "remask";
import styled from 'styled-components';
import config from "../../../config/config";
import validators from '../../../utils/validators';
import formatters from '../../../utils/formatters';

const DataContainer = styled.div`
    margin-top:  ${props => props.$isNew ? '0px' : '36px'};

    @media screen and (max-width: 477px) {
        margin-top:  ${props => props.$isNew ? '0px' : '30px'};
    }
`;

const ReceiversData = ({dto, onInputChange, onModel, onValidation}) => {
    const [pixKeyOld, setPixKeyOld] = useState(dto.pix_key_type);
    const [error, setError] = useState({});

    useEffect(() => {
        onChangeCpfCnpj(undefined, dto.tax_id);
    }, []);

    useEffect(() => {   
        if(dto.pix_key_type != pixKeyOld){
            onModel('pix_key', '');
            setError({ ...error, ...{ 'pix_key': '' }});
            setPixKeyOld(dto.pix_key_type);
        }
    }, [dto.pix_key_type]);

    const handleTypeInputPix = () => {
        return dto.pix_key_type === 'telefone' ? 'tel' : (dto.pix_key_type === 'email' ? 'email' : 'text');
    };    

    const handleValidationPix = async () => {    
        let isValid = true;    
        if(dto.pix_key_type !== 'aleatoria'){
            let { valido, texto } = await validators[dto.pix_key_type+'Validation'](dto.pix_key);
            isValid = valido;
            setError({ ...error, ...{ 'pix_key': !valido ? texto : '' }});
        }
        if (onValidation) onValidation(isValid);
    };

    const onChangeCpfCnpj = (ev, value) => {
        let v = ev?.target?.value != undefined ? ev?.target?.value : value
        onModel('tax_id', masker(unMask(v),['999.999.999-99', '99.999.999/9999-99']));
    }

    const handleValidationCpfCnpj = async () => {    
        let isValid = true;    
        let { valido, texto } = await validators[(dto.tax_id.length < 15 ? 'cpf' : 'cnpj')+'Validation'](dto.tax_id);
        isValid = valido;
        setError({ ...error, ...{ 'tax_id': !valido ? texto : '' }});
        if (onValidation) onValidation(isValid);
    };

    return (
        <DataContainer $isNew={!dto.id} className='data-container'>
            {(!dto.id ||dto.status === 'rascunho') && 
                <div>
                    <div className='receiver-data'>
                        <h1 className='title-section'>Quais os dados do favorecido?</h1>
                        <div className='grid col-2 mv-40 ai-ge'>
                            <div className='group-input'>
                                <label htmlFor='name-rascunho'>Qual o nome completo ou  razão social do favorecido?</label>
                                <input id='name-rascunho' data-testid='name-rec' type='text' name='name' value={dto.name} 
                                    onChange={(e) => onInputChange(e)} required />
                                <div className='error mt-5'/>
                            </div>

                            <div className='group-input'>
                                <label htmlFor='tax-rascunho'>Qual o CPF ou CNPJ?</label>
                                <input type='text' id='tax-rascunho' data-testid='taxid-rec' name='tax_id' value={dto.tax_id} required
                                    onChange={onChangeCpfCnpj} onBlur={handleValidationCpfCnpj} />

                                <div className='error mt-5'>
                                    {error.tax_id && <p>{error.tax_id}</p>}
                                </div>
                            </div>

                            <div className='group-input'>
                                <label htmlFor='email-rascunho'>Qual o e-mail para o envio do comprovante?</label>
                                <input id='email-rascunho' data-testid='email-rec' type='email' name='email' value={dto.email} data-testid='email-rec'
                                    onChange={(e) => onInputChange(e)} required />
                            </div>
                        </div>
                    </div>

                    <div className='receiver-data'>
                        <h1 className='title-section'>Qual a chave pix?</h1>
                        <div className='grid col-2 mt-40 ai-ge'>
                            <div className='group-input'>
                                <label htmlFor='pix_key_type'>Tipo de chave</label>
                                <div className="custom-select">
                                    <select id='pix_key_type' name='pix_key_type' data-testid='pixkeyt-rec'
                                        value={dto.pix_key_type} 
                                        onChange={(e) => onInputChange(e)} required>
                                        {config.options.tiposChavePix.map(t => {
                                            return <option key={t.id} value={t.id}>{t.name}</option>
                                        })}
                                    </select>
                                    <div className='error mt-5'/>
                                </div>
                            </div>

                            <div />

                            {dto.pix_key_type &&
                                <div className='group-input'>
                                    <label htmlFor='pix_key'>Chave</label>
                                    {!['cpf', 'cnpj', 'telefone'].includes(dto.pix_key_type) && 
                                        <input 
                                            type={handleTypeInputPix()} 
                                            name='pix_key' 
                                            data-testid='pixkey-rec'
                                            value={dto.pix_key} 
                                            required
                                            onChange={(e) => onInputChange(e)} 
                                            onBlur={handleValidationPix}
                                        />
                                    }
                                    {['cpf', 'cnpj', 'telefone'].includes(dto.pix_key_type) && 
                                        <PatternFormat
                                            name='pix_key' 
                                            data-testid='pixkey-rec' 
                                            value={dto.pix_key} 
                                            required
                                            format={dto.pix_key_type === 'cpf' ? '###.###.###-##' : 
                                                (dto.pix_key_type === 'cnpj' ?'##.###.###/####-##' : '(##) #####-#####')} 
                                            valueIsNumericString={true}
                                            onBlur={handleValidationPix} 
                                            onValueChange={values => {
                                                onModel('pix_key', values.value);
                                            }}
                                        />
                                    }
                                    <div className='error mt-5'>
                                        {error.pix_key && <p>{error.pix_key}</p>}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }

            {dto.status !== 'rascunho' && 
                <div>
                    <div className='item-group'>
                        <div className='item-title'>CPF/CNPJ</div>
                        <div className='item-data'>{formatters.formatCpfCnpj(dto.tax_id)}</div>
                    </div>
                    <div className='grid col-2 gap-30 mv-30 ai-ge'>
                        <div className='item-group'>
                            <div className='item-title'>Banco</div>
                            <div className='item-data'>{dto.bank_name || '-'}</div>
                        </div>
                        <div className='item-group'>
                            <div className='item-title'>Agência</div>
                            <div className='item-data'>{formatters.formatBranchAcount(dto.branch)}</div>
                        </div>
                        <div className='item-group'>
                            <div className='item-title'>Tipo de conta</div>
                            <div className='item-data'>{dto.account_type}</div>
                        </div>
                        <div className='item-group'>
                            <div className='item-title'>{formatters.capitalFirstChar(dto.account_type)}</div>
                            <div className='item-data'>{formatters.formatBranchAcount(dto.account)}</div>
                        </div>
                    </div>
                    <div className='group-input vreceiver-input'>
                        <label htmlFor='email'>E-mail do favorecido</label>
                        <input type='email' name='email' value={dto.email} data-testid='email-rec'
                            onChange={(e) => onInputChange(e)} required/>
                    </div>
                    
                </div>
            }
        </DataContainer>
        
    )
}

export default ReceiversData