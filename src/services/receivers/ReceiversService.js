import { Api } from '../ApiConfig';

const getAll = async () => {
    try {
        const { data } = await Api().get('/receivers');
        return data;
      } catch (error) {
        return error.message || 'Erro ao buscar os registros.';
      }
};

const getById = async (id) => {
  try {
    const { data } = await Api().get(`/receivers/${id}`);
    return data;
  } catch (error) {
    return error.message || 'Erro ao consultar o registro.';
  }
};

const create = async (data) => {
  try {
    const response = await Api().post('/receivers', data);
    return response.data;
  } catch (error) {
    return error.message || 'Erro ao criar o registro.';
  }
};

const updateById = async (id, data) => {
  try {
    const response = await Api().put(`/receivers/${id}`, data);
    return response.data;
  } catch (error) {
    return error.message || 'Erro ao atualizar o registro.';
  }
};

const deleteById = async (id) => {
  try {
    await Api().delete(`/receivers/${id}`);
    return undefined;
  } catch (error) {
    return error.message || 'Erro ao apagar o registro.';
  }
};

const deleteMultipleIds = async (ids) => {
  try {
    const promises = ids.map((id) => deleteById(id));
    await Promise.all(promises);
    return undefined;
  } catch (error) {
    return error.message || 'Erro ao apagar os registros.';
  }
};

const ReceiversService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  deleteMultipleIds,
};

export default ReceiversService;