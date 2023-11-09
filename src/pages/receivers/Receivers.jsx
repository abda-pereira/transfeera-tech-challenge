import { useState, useEffect } from 'react';
import formatters from '../../utils/formatters';
import notifiers from '../../utils/notifiers';
import ReceiversService from '../../services/receivers/ReceiversService';
import ReceiversHeader from './components/ReceiversHeader';
import ModalReceiverEdit from './components/modalReceiverEdit/ModalReceiverEdit';
import ModalConfirmation from '../../components/modalConfirmation/ModalConfirmation';
import Tag from '../../components/tag/Tag';
import Loading from '../../components/loading/Loading';
import validators from '../../utils/validators';
import tools from '../../utils/tools';
import { BiSolidChevronsLeft, BiSolidChevronsRight, BiCaretUp, BiCaretDown } from 'react-icons/bi';

import defaultBank from '../../assets/images/banco.png';
import bancodobrasil from '../../assets/images/banco-do-brasil.png';
import itau from '../../assets/images/itau.png';
import nubank from '../../assets/images/nubank.png';
import santander from '../../assets/images/santander.png';

const Receivers = () => {
  const pageSize = 8;
  const [receivers, setReceivers] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pages, setPages] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalConfirmationOpen, setIsModalConfirmationOpen] = useState(false);
  const [selectedReceiver, setSelectedReceiver] = useState({});
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(true);
  

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {   
    displayPages(0);
    setTimeout(function() {
      setLoading(false);
    }, 100);
  }, [data]);

  useEffect(() => {    
    if(selectedItems.length === pageSize || ((page + 1) === totalPages) && selectedItems.length === data.length % pageSize) {
      setSelectedAll(true);
    } else {
      setSelectedAll(false);
    }
  }, [selectedItems]);

  const load = async () => {
    setLoading(true);
    try {
      const result = await ReceiversService.getAll();
      if (typeof result === 'string') {
        notifiers.showNotification({type:'danger', msg: result});
      } else {
        setReceivers(result);
        handleSort(result, true);
        setTotalPages(Math.ceil(result.length / pageSize));
      }
    } catch(e) {
      notifiers.showNotification({type:'danger', msg: e.message});
    }
    setLoading(false);
  }

  const handlePageChange = (newPage) => {
    setSelectedItems([]);
    setPage(newPage);
    displayPages(newPage);
  };

  const handleSort = (init, asc) => {
    let list = init || data;
    const sort = asc || sortAsc;
    const sortedData = list.sort((a, b) => {
      if (a.name < b.name) {
        return sort ? -1 : 1;
      }
      if (a.name > b.name) {
        return sort ? 1 : -1;
      }
      return 0;
    });

    setSortAsc(asc ? !asc : !sortAsc);
    setData(sortedData);
    setSelectedItems([]);
  };

  const handleSelectAll = (event) => {
    setSelectedAll(!selectedAll);
    if (event.target.checked) {
      let startIndex = page * pageSize;
      let endIndex = (page + 1) * pageSize;
      let dataCurrentPage = data.slice(startIndex, endIndex);
      setSelectedItems(dataCurrentPage.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelect = (id) => {
    const isSelected = selectedItems.includes(id);
    if (isSelected) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSave = async (dto = {}) => {
    const valid = validators.requiredValidation(dto);
    if(isValid && valid) {
      try {
          const dt = tools.clone(dto);
          dt.updated_at = formatters.formatDate(new Date());
          const result = await ReceiversService.updateById(dt.id, dt);
          if (typeof result === 'string') {
            notifiers.showNotification({type:'danger', msg: result});
          } else {
            closeModal();
            notifiers.showNotification({msg: 'Favorecido alterado com sucesso'});
            await load();
          }
      } catch(e) {
        notifiers.showNotification({type:'danger', msg: e.message});
      }
    } else {
      notifiers.showNotification({type:'danger', msg: 'Por favor, preencha todos os campos corretamente'});
    }
  };

  const handleValidation = (value) => {
    setIsValid(value);
  };

  const handleDelete = async (e, multi = false) => {
    e?.preventDefault();
    try {
      if((multi && selectedItems.length > 0) || !multi) {
        let ids = !multi ? [] : selectedItems
        if(!multi) ids.push(selectedReceiver.id);
        
        const result = await ReceiversService.deleteMultipleIds(!multi ? ids : selectedItems);
        if (typeof result === 'string') {
          notifiers.showNotification({type:'danger', msg: result});
        } else {
          if(!multi) {
            closeModal();
            setSelectedReceiver({});
          } else {
            setSelectedItems([]);
            setSelectedAll(false);
          }
          notifiers.showNotification({msg: `Favorecido${multi ? 's':''} excluído${multi ? 's':''} com sucesso`});
          await load();
        }
      } else {
        notifiers.showNotification({type:'warning', msg: 'Selecione pelo menos um registro para excluir'});
      }
    } catch(e) {
      notifiers.showNotification({type:'danger', msg: e.message});
    }
  };

  const handleBankImg = (bank_name) => {
    try {
      return eval(bank_name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f|\s]/g, ""));
    } catch {
      return defaultBank;
    }
  };

  let currentData = data.slice(page * pageSize, (page + 1) * pageSize);

  const displayPages = (pageCurrent) => { 
    const pages = [];
    let startPage = Math.max(1, pageCurrent);
    let endPage = Math.min(totalPages, pageCurrent + 2);

    if (pageCurrent <= 0) {
        endPage = Math.min(3, totalPages);
    }

    if (pageCurrent + 2 > totalPages) {
        startPage = Math.max(1, totalPages - 2);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    setPages(pages);
  };

  const handleSearch = (value) => {
    if(!loading){
      let result = [];
      const v = value.replace(/[^\w\s]/gi, '');
      if(v.length > 0) {
        result = receivers.filter(r => 
          r.name.toLowerCase().includes(v.toLowerCase()) ||
          r.tax_id.includes(v) ||
          (r.branch && r.branch.includes(v)) ||
          (r.account && r.account.includes(v))
        )
      } else {
        result = receivers;
      }
      handleSort(result, true);
    }
  };

  const openModalEdit = (dto) => {
    setSelectedReceiver(dto);
    setIsModalEditOpen(true);
  };

  const openModalDelete = () => {
    setIsModalEditOpen(false);
    setIsModalConfirmationOpen(true);
  };

  const closeModal = (dto = {}) => {
    tools.toogleOverflow();
    setSelectedReceiver(dto);
    setIsModalEditOpen(false);
    setIsModalConfirmationOpen(false);
  };

  return (
      <main>
          <ReceiversHeader onSearch={handleSearch} />
          {loading && <div className='container-preloader flex jc-fc mt-40'><Loading/></div>}
          {!loading &&<div className='tblreceivers-container' data-testid='tblrecs-container'>
            <button onClick={(e) => handleDelete(e, true)} className='btn-light-red mb-40' data-testid='btn-delrecs'>Excluir selecionados</button>
            <div className='table-container'>
              <table className='w-100' data-testid='tblrec'>
                <thead className=''>
                  <tr>
                    <th style={{width:'18px'}} className='check-select'>
                      <input type='checkbox' onChange={handleSelectAll} checked={selectedAll} />
                    </th>
                    <th style={{minWidth:'250px'}}>
                      <div className='flex jc-sb'>
                        <span>Favorecido</span>
                        <div onClick={() => handleSort()} className='sortContainer flex ai-fc'>
                          {sortAsc && <BiCaretUp />}
                          {!sortAsc && <BiCaretDown />}
                        </div>
                      </div>
                    </th>
                    <th style={{width:'350px'}}>CPF/CNPJ</th>
                    <th>Banco</th>
                    <th>Agência</th>
                    <th>CC</th>
                    <th style={{width:'188px'}}>Status do favorecido</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item) => (
                    <tr key={item.id}>
                      <td className='check-select'>
                        <input
                        type='checkbox'
                        onChange={() => handleSelect(item.id)}
                        checked={selectedItems.includes(item.id)}
                        />
                      </td>
                      <td>
                        <span onClick={() => openModalEdit(item)} className='pointer' title='Editar'>{item.name}</span>
                      </td>
                      <td>{formatters.formatCpfCnpj(item.tax_id)}</td>
                      <td>
                        <img className='bank-img' src={handleBankImg(item.bank_name)}/>
                      </td>
                      <td>{formatters.formatBranchAcount(item.branch)}</td>
                      <td>{formatters.formatBranchAcount(item.account)}</td>
                      <td>
                        <Tag name={item.status} className={`tag-${item.status}`}/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table> 
            </div>
            {!currentData.length && <div className='no-rec w-100 flex jc-fc mt-10'>Não há registros</div>}

            <div className='pagination-container flex ai-fc jc-fc'>
              <BiSolidChevronsLeft onClick={() => handlePageChange(0)} className='btn-pagination pointer'/>
              {pages.map(p => {
                return <div key={'page-'+p} className={`btn-pagination pointer ${p == (page + 1) ? 'bold' : ''}`}
                onClick={() => handlePageChange(p - 1)}>{p}</div>
              })}
              <BiSolidChevronsRight onClick={() => handlePageChange(totalPages - 1)} className='btn-pagination pointer'/>
            </div>
          </div>}

          {isModalEditOpen && 
            <ModalReceiverEdit 
              isOpen={isModalEditOpen} 
              onClose={closeModal} 
              onDelete={openModalDelete}
              onSave={handleSave}
              item={selectedReceiver}
              onValidation={handleValidation}
            />
          }
          {isModalConfirmationOpen && 
            <ModalConfirmation 
              isOpen={isModalConfirmationOpen} 
              onClose={closeModal} 
              onConfirmation={handleDelete}
              params={{
                title: 'Excluir favorecido',
                subtitle: `Você confirma a exclusão do favorecido ${selectedReceiver.name}`,
                description: 'O Histórico de pagamentos para este favorecido será mantido, mas ele será removido da sua lista de favorecidos.',
                labelConfirmationBtn: 'Confirmar exclusão',
                classConfirmationBtn: 'btn-danger'
              }}
            />
          }
      </main>
  )
}

export default Receivers;