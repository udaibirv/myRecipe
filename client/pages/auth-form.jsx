import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {
        username: '',
        password: '',
        email: ''

      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ users: data });
        console.log('data :', data);
        window.location.hash = '#list';
        window.localStorage.setItem('userId', data.userId);
        console.log(window.localStorage);
      });

  }

  render() {
    const { handleChange, handleSubmit } = this;
    // const { action } = this.props;
    // const alternateActionHref = action === 'sign-up'
    //   ? '#sign-in'
    //   : '#sign-up';
    // const alternatActionText = action === 'sign-up'
    //   ? 'Sign in instead'
    //   : 'Register now';
    // const submitButtonText = action === 'sign-up'
    //   ? 'Register'
    //   : 'Log In';
    return (
      <div className="container-fluid bg-image">
        <div className="row form-row justify-content-center align-items-center">
          <div className="col justify-content-center align-items-center text-center ">
            <h4 className="auth-header text-center">Create an Account to Continue!</h4>
            <a className="text-muted auth-redirect" href={'#sign-in'}>
              Already have an account?
              </a>
            <form className="auth-form"onSubmit={handleSubmit}>
              <div className="auth-form-group">
                <label className="auth-username"htmlFor="username">
                  Username
                </label>
                <input required id="username" type="text" name="username" onChange={handleChange}/>
              </div>
              <div className="auth-form-group">
                <label className="auth-email"htmlFor="email">
                  Email
                </label>
                <input required id="email" type="text" name="email" onChange={handleChange}/>
              </div>
              <div className="auth-form-group">
                <label className="auth-password"htmlFor="password">
                  Password
                </label>
                <input required id="password" type="password" name="password" onChange={handleChange} />
              </div>
              <button type="submit" className="btn auth-button ">
                Sign Up!
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
