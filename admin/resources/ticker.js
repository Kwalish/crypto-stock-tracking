const Ticker = require('../../model/ticker');

const AdminParent = {
  name: 'Transactions',
  icon: 'fas fa-money-check',
};

const isAdmin = ({ currentAdmin }) => currentAdmin && currentAdmin.isAdmin === true;

module.exports = {
  resource: Ticker,
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
      edit: { isAccessible: false },
      delete: { isAccessible: isAdmin },
    },
    parent: AdminParent,
  },
};
