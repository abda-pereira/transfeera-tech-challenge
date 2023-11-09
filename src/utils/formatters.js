const formatters = {
  formatCpfCnpj: (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    if (cleanedValue.length === 11) {
      return cleanedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (cleanedValue.length === 14) {
      return cleanedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    } else {
      return value;
    }
  },
  formatBranchAcount: (value) => {
    if(value){
      return value.slice(0, -1) + '-' + value.slice(-1);
    }
    return '';
  },
  capitalFirstChar: (str) => {
    if(str.length){
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    return str;
  },
  formatDate: (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const offset = -date.getTimezoneOffset() / 60;
    const offsetSign = offset < 0 ? '-' : '+';
    const offsetHours = String(Math.floor(Math.abs(offset))).padStart(2, '0');
    const offsetMinutes = String((Math.abs(offset) * 60) % 60).padStart(2, '0');
    const offsetString = `${offsetSign}${offsetHours}:${offsetMinutes}`;
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}${offsetString}`;
  }
}

export default formatters;