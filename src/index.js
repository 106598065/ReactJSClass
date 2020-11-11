import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import App from './App'


// ReactDOM.render(<App />, document.getElementById('root'))

// class LoginPage extends React.Component {
//     render() {
//         // const { loggingIn } = this.props;
//         // const { username, password, submitted } = this.state;
//         return (
//             <div className="col-md-6 col-md-offset-3">
//                 <h2>Login</h2>
//             </div>
//         );
//     }
// }

// react component
class LoginPage extends React.Component {
    handleLogin(e) {
        let username = this.refs.username.value;
        // dispatch action
        store.dispatch({
            type: 'LOGIN',
            value: username
        });
    }

    handleLogout() {
        // dispatch action
        store.dispatch({
            type: 'LOGOUT',
            value: 'guest'
        });
        this.refs.username.value = '';
    }

    render() {
        let button;
        if(this.props.state.status === 'logged in') {
            button = <button onClick={this.handleLogout}>Log out</button>;  
        } else {
            button = <input type="button" value="Login" onClick={this.handleLogin} />
        };
        
        return (
        <div>
            <input type="text" ref="username" />
                    {button} 
            <h1>Current state is {this.props.state.status + ' as ' + this.props.state.value}</h1>
        </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };