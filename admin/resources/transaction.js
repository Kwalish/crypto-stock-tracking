const transaction = require('../../model/transaction');

const AdminParent = {
  name: 'Transactions',
  icon: 'fas fa-money-check',
};

module.exports = {
  resource: transaction,
  options: {
    properties: {
      _id: {
        isVisible: false,
      },
      createdAt: {
        isVisible: false,
      },
      updatedAt: {
        isVisible: false,
      },
      user: {
        isVisible: false,
      },
    },
    actions: {
      new: {
        before: async (request, context) => {
          const { currentAdmin: { _id: userId } } = context;
          return {
            ...request,
            payload: {
              ...request.payload,
              user: userId,
            },
          };
        },
      },
      list: {
        before: async (request, context) => {
          const { currentAdmin: { _id: userId } } = context;
          return {
            ...request,
            query: {
              ...request.query,
              'filters.user': userId,
            },
          };
        },
      },
    },
    parent: AdminParent,
  },
};
