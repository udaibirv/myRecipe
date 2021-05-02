import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''

    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSignIn(result) {
    const { token } = result;
    event.preventDefault();
    fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => {
        window.localStorage.setItem('react-context-jwt', data.user.token);
        window.localStorage.setItem('userId', data.user.userId);
        window.location.hash = '#list';

      })
      .catch(err => {
        console.error(err);
        alert('Invalid Login, Please Try Again');
      });
  }

  render() {
    const { handleSignIn, handleChange } = this;
    return (
      <div className="container-fluid bg-image">
        <div className="row form-row justify-content-center align-items-center">
          <div className="col justify-content-center align-items-center text-center">
            <h4 className="login-message">Please Sign In to Continue!</h4>
            <form className="login-form"onSubmit={handleSignIn}>
              <div className="mb-3">
                <label className="username"htmlFor="username">
                  Username
                </label>
                <input required id="username" type="text" name="username" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="password"htmlFor="password">
                  Password
                </label>
                <input required id="password" type="password" name="password" onChange={handleChange} />
              </div>
              <button className="btn login-button" type="submit">Sign In</button>
            </form>
          </div>
        </div>
      </div>

    );
  }

}
