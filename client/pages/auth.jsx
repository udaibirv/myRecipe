// import React from 'react';
// import AuthForm from './auth-form';
// import AppContext from '../app-context';
// export default class AuthPage extends React.Component {
//   render() {
//     const { route, handleSignIn, user } = this.context;

//     let welcomeMessage;
//     if (route.path === 'sign-in') {
//       welcomeMessage = 'Please Sign In!';
//     } else if (user === null) {
//       welcomeMessage = 'Create an Account to Continue!';
//     }

//     return (
//       <div className="row align-items-center">
//         <div className="col-12 col-sm-10 col-md-8">
//           <header className="text-center">
//             <p className="text-muted"> {welcomeMessage}</p>
//           </header>
//           <div className="card">
//             <AuthForm key={route.path} action={route.path} onSignIn={handleSignIn} />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// AuthPage.contextType = AppContext;
