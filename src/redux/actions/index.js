// API https://economia.awesomeapi.com.br/json/all

const actionLogin = (email) => ({
  type: 'LOGIN',
  payload: email,
});

const setCurrency = (data) => ({
  type: 'SET_CURRENCY',
  payload: data,
});

const getCurrency = () => async (dispatch) => {
  const api = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await api.json();
  const currency = Object.keys(data).filter((key) => key !== 'USDT');
  dispatch(setCurrency(currency));
};

const saveExpense = (data) => ({
  type: 'SAVE_EXPENSE',
  payload: data,
});

const handleExpense = (data) => ({
  type: 'HANDLE_EXPENSE',
  payload: data,
});

const editMode = (id) => ({
  type: 'EDIT_MODE',
  payload: id,
});

const quitEdit = () => ({
  type: 'QUIT_EDIT',
});

export {
  actionLogin,
  getCurrency,
  saveExpense,
  handleExpense,
  editMode,
  quitEdit,
};
