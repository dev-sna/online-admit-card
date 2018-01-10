import React, {Component} from 'react';
import axios from 'axios';

class AdminLogin extends Component{
    constructor(props){
        super(props);
    
        this.state ={
            formtype: 'login',
            email: '',
            password: '',
            recovery: '',
            err: '',
            errorDiv: 'hidden'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRecovery = this.handleRecovery.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        axios.post('/exam-admin-login/login', {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            this.props.callback('admin');
            this.props.history.push('/exam-admin-panel');
        }).catch(error => {
            this.setState({err: error.response.data.error, errorDiv: 'errDiv'},
            setTimeout(() => {
                this.setState({err: '', errorDiv: 'hidden'});
            },2000)
        );
        });
    }
 
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleRecovery(e){
        e.preventDefault();
        axios.post('/exam-admin-login/recovery', {
            email: this.state.recovery
        }).then(response => {
            this.setState({err: 'Password will be sent to your account', errorDiv: 'successDiv'});
            setTimeout(() => {
                this.setState({err: '', errorDiv: 'hidden'});
            },2000)
        console.log(response);
        }).catch(error => {
            this.setState({err: error.response.data.error, errorDiv: 'errDiv'});
        setTimeout(() => {
                this.setState({err: '', errorDiv: 'hidden'});
            },2000)
        console.log(error);
        });
    }

        render(){
            return(
                <div className="row padding-class">
                <div className="col-md-3 hidden-xs"></div>
                <div className="col-md-6 col-xs-12">
                    <div className="card">
                        <h3 className="card-header">Admin Login</h3>
                        <div className="status-div"><div className={this.state.errorDiv}>{this.state.err}</div></div>
                        <div className="card-block">

                            {this.state.formtype == 'login' ?

                            <form method="post" action="/exam-admin-login/login" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input value={this.state.email} name="email" type="email" className="form-control" placeholder="example@example.com" onChange={this.handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input value={this.state.password} name="password" type="password" className="form-control" placeholder="Password" onChange={this.handleChange} required />
                                </div>

                                <button type="submit" className="btn btn-primary">Submit</button>
                                
                                <div className="form-group">
                                <p onClick={event => this.setState({formtype: ''})} className="form-control-static" id="forgot">Forgot Password?</p>
                                </div>

                            </form> 
                            : 
                            <form action="/exam-admin-login/recover" method="post" onSubmit={this.handleRecovery}>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name="recovery" onChange={this.handleChange} value={this.state.recovery} className="form-control" placeholder="enter email here"/>
                                </div>

                                <button type="submit" className="btn btn-primary">Send password</button>

                                <div className="form-group">
                                <p onClick={event => this.setState({formtype: 'login'})} className="form-control-static" id="forgot">Go back</p>
                                </div>

                            </form>
                            
                            }
                        </div>
                        
                    </div>
                </div>
            </div>
            );
        }
}

export default AdminLogin;