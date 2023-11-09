const tools = {
    toogleOverflow: (isOpen) => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    },
    isEmptyNullOrUndefined: (value) => {
        return !value || value === null || value === undefined || value === 0 || value === "" || value === "null" || (typeof value === 'object' && !value?.length) || (typeof value === 'object' && !Object.keys(value).length);
    },
    clone: (value) => {
        return JSON.parse(JSON.stringify(value))
    },
    uuidv4: () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    },
    openURL: (url) => {
        window.location = url;
    }
  }
  
  export default tools;