import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BiHappyBeaming } from 'react-icons/bi';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { editMode, handleExpense } from '../redux/actions';
import formatCurrency from '../utils';

class Table extends Component {
  handleDelete = (_e, id) => {
    const { expenses, dispatch } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    dispatch(handleExpense(newExpenses));
  };

  handleEdit = (_e, id) => {
    const { dispatch } = this.props;
    dispatch(editMode(id));
  };

  handleBadge = (str) => {
    if (str === 'Alimentação') return 'badge';
    if (str === 'Trabalho') return 'badge badge-primary';
    if (str === 'Lazer') return 'badge badge-secondary';
    if (str === 'Transporte') return 'badge badge-accent';
    if (str === 'Saúde') return 'badge badge-ghost';
  };

  render() {
    const { expenses } = this.props;
    const showTd = expenses.map(({
      id,
      description,
      currency,
      tag,
      method,
      value,
      exchangeRates,
    }) => (
      <tr key={ id } className="hover">
        <td>{description}</td>
        <td>
          <span className={ this.handleBadge(tag) }>
            {tag}
          </span>
        </td>
        <td>{method}</td>
        <td>{Number(value).toFixed(2)}</td>
        <td>{exchangeRates[currency].name}</td>
        <td>{formatCurrency(exchangeRates[currency].ask)}</td>
        <td>{formatCurrency(value * exchangeRates[currency].ask)}</td>
        <td>Real</td>
        <td>
          <div className="flex justify-center gap-6">
            <AiOutlineEdit className="text-xl self-center text-yellow-500 cursor-pointer" onClick={ (e) => this.handleEdit(e, id) } />
            <AiOutlineDelete className="text-xl self-center text-red-500 cursor-pointer" onClick={ (e) => this.handleDelete(e, id) } />
          </div>
        </td>
      </tr>
    ));

    if (!showTd.length) {
      return (
        <section className="flex flex-col justify-center gap-8 items-center mt-8">
          <h2 className="text-2xl">Cadastre sua primeira despesa!</h2>
          <BiHappyBeaming className="text-8xl text-indigo-300" />
        </section>
      );
    }

    return (
      <section className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {showTd}
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.defaultProps = {
  expenses: [],
};

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})),
};

export default connect(mapStateToProps)(Table);
