const config = {
  selected: 'receivers', 
  menu: [
      {
        id: 'receivers',
        label: 'Seus favorecidos',
        url: '/'
      }
  ],
  options: {
    tiposChavePix: [
        {
            id: 'cpf',
            name: 'CPF'
        },
        {
            id: 'cnpj',
            name: 'CNPJ'
        },
        {
            id: 'email',
            name: 'E-mail'
        },
        {
            id: 'telefone',
            name: 'Telefone'
        },
        {
            id: 'aleatoria',
            name: 'Chave Aleatória'
        },
    ]
  }
}

export default config;