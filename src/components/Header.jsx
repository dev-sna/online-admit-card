import React, { Component } from 'react';
import axios from 'axios';

class Header extends Component{
    
    constructor(props){
        super(props);
        this.handleRoute = this.handleRoute.bind(this);
    }
    
    handleRoute(e){
        var rout= e.target.id;
        rout == '/' ? this.props.history.push('/'):null
        rout == 'dept' ? this.props.isLoggedIn == 'department' ? this.props.history.push('account') : this.props.history.push('dept'): null;
        rout == 'std' ? this.props.isLoggedIn == 'student' ? this.props.history.push('appform') : this.props.history.push('std') : null;
        rout == 'control' ? this.props.isLoggedIn == 'examination' ? this.props.history.push('validate') : this.props.history.push('control') : null;
        rout == 'logout' ? 
        this.props.isLoggedIn != '' ? 
        axios.get('/logout',{

        }).then(res => {
            this.props.callback('');
            this.props.history.push('/')
        }).catch(err => {
            console.log(err)
        })
        :null
        :null
    }
    
    render(){
        return(
            <header>
        <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div onClick={this.handleRoute} id="/" className="navbar-header">
                <div className="navbar-brand h1" id="/">Online Admit Card</div>
                </div>
                <div className="container collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item"  id="dept" onClick={this.handleRoute}>
                            <div className="nav-link" id="dept"><i id="dept" className="fa fa-building big-icon" aria-hidden="true"></i>Department Login <span className="sr-only">(current)</span></div>
                        </li>
                        <li className="nav-item" id="std" onClick={this.handleRoute}>
                            <div className="nav-link" id="std"><i id="std" className="fa fa-graduation-cap big-icon" aria-hidden="true"></i>Student Login</div>
                        </li>
                        <li className="nav-item" id="control" onClick={this.handleRoute}>
                            <div className="nav-link" id="control"><i id="control" className="fa fa-wrench big-icon" aria-hidden="true"></i>Controller Login</div>
                        </li>
                        <li className="nav-item" id="logout" onClick={this.handleRoute} >
                            <div className="nav-link" id="logout"><i id="logout" className="fa fa-sign-out big-icon" aria-hidden="true"></i>Signout</div>
                        </li>

                    </ul> 
                </div>
            </nav>
            </header>
        );
    }
}

export default Header;