import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import formatCurrency from '../utils';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce((acc, curr) => (
      acc + (curr.value * curr.exchangeRates[curr.currency].ask)), 0);
    return (
      <section className="flex w-full justify-between p-2">
        <h1 className="text-4xl text-center text-indigo-600 self-center">Finnan</h1>
        <section>
          <span data-testid="email-field">
            Usuário:
            {' '}
            <span className="text-indigo-600 font-medium">
              {email || 'test@test.com'}
            </span>
          </span>
          <div>
            <span data-testid="total-field">
              Total:
              {' '}
              {formatCurrency(total)}
            </span>
          </div>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.defaultProps = {
  expenses: [],
};

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})),
};

export default connect(mapStateToProps)(Header);
