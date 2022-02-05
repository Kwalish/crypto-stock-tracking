const User = require('../../model/user');

const AdminParent = {
  name: 'Admin',
  icon: 'fas fa-user',
};

const isAdmin = ({ currentAdmin }) => currentAdmin && currentAdmin.isAdmin === true;

module.exports = {
  resource: User,
  options: {
    properties: {
      createdAt: {
        isVisible: false,
      },
      updatedAt: {
        isVisible: false,
      },
    },
    actions: {
      show: { isVisible: isAdmin },
      list: { isVisible: isAdmin },
    },
    parent: AdminParent,
  },
};
