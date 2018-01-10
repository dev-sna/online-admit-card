import React,  { Component } from 'react';
import axios from 'axios';
import {Router, Route, IndexRoute} from  'react-router';
import createBrowserHistory from 'history/createBrowserHistory'

class DeptLoginForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            identity: '',
            password: '',
            department: '',
            errorDiv: 'hidden',
            err: '',
            animation: 'hidden-xl-down'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.login = this.login.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

        componentDidMount(){
            console.log(this.props);
            setTimeout(() => {
                this.setState({animation: 'animated flipInX'})
            }, 100)
        }


        handleSubmit(event){
            event.preventDefault();
            console.log(this.state.identity);
            this.login();
        }

        login(){
            axios.post('/dept/login', {
                id: this.state.identity,
                pass: this.state.password,
                dept: this.state.department
            }).then(response => {
                this.props.callback('department');
                this.setState({animation: 'animated fadeOut'});
                setTimeout(() => {
                    this.props.history.push('/account');
                },600)
                
            }).catch(error => {
                this.setState({err: error.response.data.error,errorDiv: "errDiv",animation: 'animated shake'});
            setTimeout(() => {this.setState({err: '',errorDiv: "hidden",animation: ''});}, 1500);
            });
        }


    render(){
        return(
            
            <div className={this.state.animation + ' row padding-class'}>
                <div className="col-md-3 hidden-xs-down"></div>
                <div className="col-xl-6 col-md-6 col-xs-12">
                    <div className="card">
                        <h3 className="card-header">Departmental Login</h3>
                        <div className="status-div"><div className={this.state.errorDiv}>{this.state.err}</div></div>
                        <div className="card-block">
                            <form method="post" id="deptlogin" action="/dept/login" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Identity</label>
                                    <input value={this.state.identity} type="text" className="form-control" placeholder="Enter identity" onChange={event => this.setState({identity: event.target.value})} required />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input value={this.state.password} type="password" className="form-control" placeholder="Password" onChange={event => this.setState({password: event.target.value})} required />
                                </div>
                                <div className="form-group">
                                    <label>Department</label>
                                    <select className="form-control" value={this.state.department} onChange={event => this.setState({department: event.target.value})} required>
                                        <option value=''>select department</option>
                                        <option value="Architecture & Planning">Architecture &amp; Planning</option>
                                        <option value="B.E Chemical">B.E Chemical</option>
                                        <option value="B.E Computer Systems">B.E Computer Systems</option>
                                        <option value="B.E Electronic">B.E Electronic</option>
                                        <option value="B.E Energy &amp; Environment">B.E Energy &amp; Environment</option>
                                        <option value="B.E Inductrial Engineering &amp; Management">B.E Inductrial Engineering &amp; Management</option>
                                        <option value="B.E Metallurgy & Material">B.E Metallurgy & Material</option>
                                        <option value="B.E Petroleum &amp; Gas">B.E Petroleum &amp; Gas</option>
                                        <option value="B.E Telecommunication">B.E Telecommunication</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
            
        );
    }
}

export default DeptLoginForm;