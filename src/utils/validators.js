import tools from "./tools";

const validators = {
  emailValidation: function (email) {
      let valid = email && email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      return { valido: valid, texto: !valid ? 'Digite um endereço de e-mail válido.' : '' };
  },
  telefoneValidation: function (telefone) {
      telefone = telefone.replace(/\D/g, '');
      if (telefone.length !== 11) {
          return { valido: false, texto: 'Digite 11 dígitos numéricos válido.' };
      }
      if (!/^([2-5|7-9])/.test(telefone)) {
          return { valido: false, texto: 'Digite um número de telefone válido.' };
      }
      if (/^([0-9])\1{9,10}$/.test(telefone)) {
          return { valido: false, texto: 'Digite um número de telefone válido.' };
      }
      return { valido: true, texto: '' };
  },
  cpfValidation: (cpf) => {
    if (typeof cpf !== 'string') {
        return { valido: false, texto: "Digite um CPF" };
      }
      cpf = cpf.replace(/[^\d]/g, '');
      if (cpf.length !== 11) {
        return { valido: false, texto: "Digite todos os números do CPF" };
      }
      var isRepeated = /^(\d)\1+$/.test(cpf);
      if (isRepeated) {
        return { valido: false, texto: "Confira os números do CPF" };
      }
      var sum = 0;
      for (var i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
      }
      var firstCheckDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      sum = 0;
      for (var i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
      }
      sum += firstCheckDigit * 2;
      var secondCheckDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      let valid = firstCheckDigit === parseInt(cpf.charAt(9)) && secondCheckDigit === parseInt(cpf.charAt(10));
      return { valido: valid, texto: (!valid) ? "Digite um CPF válido" : "" };
  },
  cnpjValidation: (cnpj) => {
    if (typeof cnpj !== 'string') {
        return { valido: false, texto: "Digite um CNPJ" };
    }

    cnpj = cnpj.replace(/[^\d]+/g,'');
    if (cnpj.length !== 14) {
        return { valido: false, texto: "Digite todos os números do CNPJ" };
    }
    
    if (/^(\d)\1+$/.test(cnpj)) {
        return { valido: false, texto: "Confira os números do CNPJ" };
    }
    
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
        pos = 9;
        }
    }
    
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) {
        return { valido: false, texto: "Digite um CNPJ válido" };
    }
    
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
        pos = 9;
        }
    }
    
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    
    if (resultado != digitos.charAt(0)) {
        return { valido: false, texto: "Digite um CNPJ válido" };
    }
    
    return { valido: true, texto: '' };
  },
  requiredValidation: (dto) => {
    let requiredLst = [];
    document.querySelectorAll('main [name][required]').forEach((e) => {
        if (e.name && e.style.display !== 'none') requiredLst.push(e.name);
    });

    for (let i = 0; i < requiredLst.length; i++) {
        if (typeof dto[requiredLst[i]] == 'undefined' || tools.isEmptyNullOrUndefined(dto[requiredLst[i]])) {
            return false
            
        }
    }
    return true;
},
}

export default validators;