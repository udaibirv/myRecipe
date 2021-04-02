import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    const { name, value, email } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // const { action } = this.props;
    // const requestBody = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(this.state)
    // };
    fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => {
        window.location.hash = '#list';
      });

  }

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
    let redirect;
    let redirectMessage;
    let redirectButton;
    if (action === 'sign-up') {
      redirect = '#sign-in';
      redirectMessage = 'Sign in Instead';
      redirectButton = 'Register';
    } else if (action === 'sign-in') {
      redirect = '#sign-up';
      redirectMessage = 'Register Now';
      redirectButton = 'Log In';
    }
    return (
      <div className="container-fluid">
        <div className="row form-row justify-content-center align-items-center">
          <div className="col">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username">
                  Username
                </label>
                <input required id="username" type="text" name="username" onChange={handleChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="email">
                  Email
                </label>
                <input required id="email" type="text" name="email" onChange={handleChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="password">
                  Password
                </label>
                <input required id="password" type="password" name="password" onChange={handleChange} />
              </div>
              <a className="text-muted" href={redirect}>
                {redirectMessage}
              </a>
              <button type="submit" className="btn btn-primary">
                {redirectButton}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
