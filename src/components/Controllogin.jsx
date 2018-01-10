import React,  { Component } from 'react';
import axios from 'axios';

class Controllogin extends Component{
    constructor(props){
        super(props);
        this.state = {
            identity: '',
            password: '',
            dept: 'Examination',
            err: '',
            errorDiv: 'hidden',
            animation: 'hidden-xl-down'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.login = this.login.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    

    componentDidMount(){
    setTimeout(() => {
        this.setState({animation: 'animated flipInX'})
    },300)
}

        handleSubmit(event){
            event.preventDefault();
            this.login();
        }

        login(){
            axios.post('/control/login', {
                identity: this.state.identity,
                password: this.state.password,
                dept: this.state.dept
            }).then(response => {
                this.props.callback('examination');
                this.setState({animation: 'animated fadeOut'});
                setTimeout(() =>  {
                    this.props.history.push('/validate');
                }, 600);
                
            }).catch(error => {
                this.setState({err: error.response.data.error,errorDiv: "errDiv"});
                setTimeout(() => {this.setState({err: '',errorDiv: "hidden"});}, 2000);
            });
        }

    render(){
        return(
            <div className={this.state.animation + ' row padding-class'}>
                <div className="col-md-3 hidden-xs"></div>
                <div className="col-md-6 col-xs-12">
                    <div className="card">
                        <h3 className="card-header">Controller Login</h3>
                        <div className="status-div"><div className={this.state.errorDiv}>{this.state.err}</div></div>
                        <div className="card-block">
                            <form method="post" id="Controllogin" action="/control/login" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Identity</label>
                                    <input value={this.state.identity} type="text" name="identity" className="form-control" id="identity" placeholder="Enter identity" onChange={event => this.setState({identity: event.target.value})} required />
                                </div>
                                
                                <div className="form-group">
                                    <label>Password</label>
                                    <input value={this.state.password} type="password" name="password" className="form-control" id="identity" placeholder="Password" onChange={event => this.setState({password: event.target.value})} required />
                                </div>
                                
                                <div className="form-group">
                                    <label>Department</label>
                                    <input value="Controller" value={this.state.dept} className="disabled form-control" type="text" placeholder="Controller Examination" disabled/>
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

export default Controllogin;