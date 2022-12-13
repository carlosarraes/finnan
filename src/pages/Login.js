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
      <main>
        <form>
          <input
            type="email"
            name="email"
            data-testid="email-input"
            placeholder="E-mail"
            onChange={ this.handleChange }
            value={ email }
          />
          <input
            type="password"
            name="password"
            data-testid="password-input"
            placeholder="Password"
            onChange={ this.handleChange }
            value={ password }
          />
          <button type="submit" onClick={ this.handleSubmit } disabled={ disabled }>
            Entrar
          </button>
        </form>
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
