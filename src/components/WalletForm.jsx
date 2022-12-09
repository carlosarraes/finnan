import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrency, handleExpense, quitEdit, saveExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    editMode: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrency());
  }

  componentDidUpdate() {
    const { dispatch, editor, idToEdit, expenses } = this.props;

    if (editor) {
      dispatch(quitEdit());

      const {
        value,
        description,
        currency,
        method,
        tag } = expenses.find((expense) => Number(expense.id) === idToEdit);

      this.setState({
        editMode: true,
        value,
        description,
        currency,
        method,
        tag,
      });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { expenses, dispatch, idToEdit } = this.props;
    const { value, description, currency, method, tag, editMode } = this.state;

    if (!editMode) {
      const api = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await api.json();
      const payload = {
        id: expenses.length,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates: data,
      };
      dispatch(saveExpense(payload));
      this.setState({
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      });
    } else {
      let expenseToEdit = expenses.find((expense) => Number(expense.id) === idToEdit);
      expenseToEdit = { ...expenseToEdit,
        value,
        description,
        currency,
        method,
        tag,
      };
      let newExpenses = expenses.filter((expense) => Number(expense.id) !== idToEdit);
      newExpenses = [...newExpenses, expenseToEdit];
      newExpenses.sort((a, b) => a.id - b.id);
      dispatch(handleExpense(newExpenses));
      this.setState({ value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: '',
        editMode: false,
      });
    }
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag, editMode } = this.state;
    return (
      <section>
        <input
          type="text"
          placeholder="Despesa"
          name="value"
          data-testid="value-input"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          type="text"
          placeholder="Descrição"
          name="description"
          data-testid="description-input"
          value={ description }
          onChange={ this.handleChange }
        />
        <select
          name="currency"
          data-testid="currency-input"
          onChange={ this.handleChange }
          value={ currency }
        >
          {currencies.map((moeda) => (
            <option key={ moeda } value={ moeda }>
              {moeda}
            </option>
          ))}
        </select>
        <select
          name="method"
          data-testid="method-input"
          onChange={ this.handleChange }
          value={ method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          name="tag"
          data-testid="tag-input"
          onChange={ this.handleChange }
          value={ tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button type="button" onClick={ this.handleClick }>
          {editMode ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.defaultProps = {
  currencies: [],
  expenses: [],
};

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string),
  expenses: PropTypes.arrayOf(PropTypes.shape({})),
};

export default connect(mapStateToProps)(WalletForm);
