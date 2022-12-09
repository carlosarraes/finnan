const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SET_CURRENCY':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'SAVE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case 'HANDLE_EXPENSE':
    return {
      ...state,
      expenses: action.payload,
    };
  case 'EDIT_MODE':
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case 'QUIT_EDIT':
    return {
      ...state,
      editor: false,
    };
  default:
    return state;
  }
}

export default walletReducer;
