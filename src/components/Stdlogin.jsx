import React, {Component} from 'react';
import browserHistory from 'react-router';
import axios from 'axios';

class Stdlogin extends Component{
    constructor(props){
        super(props);
        this.state ={
            id:'',
            cnic :'',
            voucher:'',
            err:'',
            errorDiv:'',
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
        console.log(this.state.id);
        this.login();
    }

    login(){
        axios.post('/std/login', {
            id: this.state.id,
            cnic: this.state.cnic,
            voucher: this.state.voucher
        }).then(response => {
            this.props.callback('student');
            this.setState({animation: 'animated fadeOut'})
            setTimeout(() => {
                this.props.history.push('/appform');    
            }, 600);
        }).catch(error => {
            this.setState({err: error.response.data.error,errorDiv: "errDiv",animation: 'animated shake'});
            setTimeout(() => {this.setState({err: '',errorDiv: "hidden",animation: ''});}, 1700);
        });
    }

    render(){
        return(
        <section className={this.state.animation + ' row padding-class'} id="Stdlogin">
        <div className="col-md-3 hidden-xs"></div>
        <div className="col-md-6 col-xs-12">
		<div className="card">
			<div className="card-header text-center">
  					<h3>Student Login</h3>
  			</div>
              <div className="status-div"><div className={this.state.errorDiv}>{this.state.err}</div></div>
  			<div className="card-block">
  				<form method="post" id="Stdlogin"
                    action="/std/login" onSubmit={this.handleSubmit}>
                    
                    	<div className="form-group">   
	                        <label>Student ID</label>  
	                        <input value={this.state.id} className="form-control" type="text" id="inputID" name="StudentID" onChange={event =>this.setState({id:event.target.value})} placeholder="e.g. 15-CS-21" required/></div>
                    
                   		 <div className="form-group">                         
	                        <label>CNIC#</label>  
	                        <input value={this.state.cnic}  className="form-control"  type="text" id="cnic" name="CNICno" onChange={event =>this.setState({cnic:event.target.value})} required/>
	                    </div>

                    	<div className="form-group">                        
	                        <label>Voucher#</label>  
	                        <input value={this.state.voucher} className="form-control"  type="text" id="voucherNum" onChange={event =>this.setState({voucher:event.target.value})} name="VoucherNum" required/>
	                    </div>

                    	<div className="form-group">
                        	<button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                </form>
			</div>
        </div>
        </div>
</section>
);
    }
}
export default Stdlogin;