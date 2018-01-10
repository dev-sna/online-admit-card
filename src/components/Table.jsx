import React, { Component } from 'react';
import axios from 'axios';

class Table extends Component {
    constructor(props) {
        super(props);

        this.state ={
            id: '',
            printed: '',
            animation: ''
        }

        this.status=this.status.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

        
    componentDidMount(){
        
    }

status(e){
    var identity = e.target.id;
    console.log(e.target.id);
    axios.post('/validate/status', {
        id: identity
    }).then(response => {
        this.setState({id: identity, printed: 'Printed'});
    }).catch(error => {
        console.log(error);
    });

}

    render() {
        return (
            <div className={this.state.animation}>
                <table className="table">
                <thead>
                    <tr>
                        <th>Identity</th>
                        <th>Name</th>
                        <th>CNIC/Passport</th>
                        <th>Father's name</th>
                        <th>Voucher No.</th>
                        <th>Voucher Date</th>
                        <th>Fee</th>
                        <th>Form date</th>
                        <th>Attendance</th>
                        <th>Status</th>
                        <th>View Card</th>
                        <th>Generate Card</th>
                    </tr>
                </thead>
                    <tbody>
                            {this.props.stdData.map(array => {
                                return <tr key={array.identity}>
                                <td>{array.identity}</td>
                                <td>{array.name}</td>
                                <td>{array.cnicpass}</td>
                                <td>{array.father_name}</td>
                                <td>{array.voucher_no}</td>
                                <td>{array.voucher_date}</td>
                                <td>{array.fee}</td>
                                <td>{array.form_date}</td>
                                <td>{array.attendance}</td>
                                <td>{array.status == ''? (array.identity == this.state.id? array.status=this.state.printed:array.status=''):(array.status='Printed')}</td>
                                <td><a target="_blank" href={"/card/"+ array.identity}><div className="form-control btn btn-primary">View</div></a></td>
                                <td><a target="_blank" href={"/card/"+ array.identity}><div onClick={this.status} id={array.identity} className="form-control btn btn-success">Print</div></a></td>
                                
                                </tr>
                                //  href={"/card/" + array.identity}
                            })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;