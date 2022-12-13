import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionLogin } from '../redux/actions';

const PASSWORD_LENGTH = 6;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabled: true,
  };

  validateLogin = () => {
    const { email, password } = this.state;
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email.match(pattern) && password.length >= PASSWORD_LENGTH) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, this.validateLogin);
  };

  handleSubmit = (e) => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    e.preventDefault();
    dispatch(actionLogin(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, disabled } = this.state;
    return (
      <main className="flex justify-center items-center h-screen flex-col">
        <section className="w-96">
          <h1 className="text-4xl text-center text-indigo-600">Finnan</h1>
          <form className="mt-8 space-y-6 w-full">
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  type="email"
                  name="email"
                  data-testid="email-input"
                  placeholder="E-mail"
                  onChange={ this.handleChange }
                  value={ email }
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-white placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={ this.handleChange }
                  value={ password }
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-white placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white disabled:opacity-40 enabled:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                type="submit"
                onClick={ this.handleSubmit }
                disabled={ disabled }
              >
                Entrar
              </button>
            </div>
          </form>
        </section>
      </main>
    );
  }
}

Login.defaultProps = {
  history: {},
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default connect()(Login);
