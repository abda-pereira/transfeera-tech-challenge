import { Store } from 'react-notifications-component';

const notifiers = {
  // params -> {type = 'success', msg, title, duration = 3000}
  showNotification: (params) => {
    Store.addNotification({
      type: params.type || 'success',
      title: params.title,
      message: params.msg,
      insert: "top",
      container: 'top-right',
      dismiss: {
        duration: params.duration || 3000,
        showIcon: true
      },
    });
  }
}

export default notifiers;