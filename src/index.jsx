import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute} from  'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import axios from 'axios';

import Header from './components/Header.jsx';
import DeptLoginForm from './components/DeptLoginForm.jsx';
import MainPageCard from './components/MainPageCard.jsx';
import AccCreateForm from './components/AccCreateForm.jsx';
import Stdlogin from './components/Stdlogin.jsx';
import Controllogin from './components/Controllogin.jsx';
import Appform from './components/AppForm.jsx';
import Validation from './components/Validation.jsx';
import Admin from './components/Admin.jsx';
import AdminLogin from './components/AdminLogin.jsx';


const history = createBrowserHistory();

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            auth: ''
        }
        this.componentWillMount = this.componentWillMount.bind(this);
        this.setAuth = this.setAuth.bind(this);
    }

    componentWillMount(){
        axios.post('*'
        ).then(res => {
            console.log(res)
            this.setState({auth: res.data});
        }).catch(err => {
            this.setState({auth: ''})
        });
    }

    setAuth(auth){
        this.setState({auth: auth})
    }

    render(){
        return( 
            <div>
                <Header isLoggedIn={this.state.auth} callback={this.setAuth} history={history} />
                <Router history={history}>
                    <div>
                        <Route history={history} exact path='/' component={MainPageCard} />

                        <Route render={() => (<DeptLoginForm callback={this.setAuth} history={history}/>)} path="/dept" />
                        <Route history={history} component={AccCreateForm} path="/account" />
                        
                        <Route render={() => (<Stdlogin history={history} callback={this.setAuth} />)} path="/std" />
                        <Route render={() => (<Controllogin history={history} callback={this.setAuth} />)} path="/control" />
                        <Route history={history} path="/appform" component={Appform} />
                        <Route history={history} path="/validate" component={Validation} />
                        <Route render={() => (<AdminLogin callback={this.setAuth} history={history} />)} path="/exam-admin-login" />
                        <Route history={history} path="/exam-admin-panel" component={Admin} />
                        
                    </div>
                </Router>
            </div>
        );
    }
}

ReactDOM.render(
    <Main />, document.getElementById('main-div')
);