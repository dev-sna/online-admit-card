import React, { Component } from 'react';
import axios from 'axios';

class AccCreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dept: '',
            id: '',
            cnic: '',
            vouchNum1: '',
            vouchNum2: '',
            vouchDate: '',
            attendance: '',
            result: '',
            resultDiv: 'hidden-xl-down',
            action: '/account/crtaccount',
            animation: 'hidden-xl-down'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.submitData = this.submitData.bind(this);

    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.id);
        this.submitData();
    }

    submitData() {
        if (this.state.vouchNum1 == this.state.vouchNum2)
            axios.post('/account/crtaccount', {
                dept: this.state.dept,
                id: this.state.id,
                cnic: this.state.cnic,
                vouchNum1: this.state.vouchNum1,
                vouchDate: this.state.vouchDate,
                attendance: this.state.attendance,
            }).then(response => {
                this.setState({ result: response.data, resultDiv: "successDiv" });
                setTimeout(() => { this.setState({ result: '', resultDiv: "hidden" }); }, 2000);
                setTimeout(() => {
                    this.setState({
                        id: '',
                        cnic: '',
                        vouchNum: '',
                        vouchDate: '',
                        attendance: ''
                    })
                }, 2500);
            }).catch(error => {
                this.setState({ result: error.response.data.error, resultDiv: 'errDiv' });
                setTimeout(() => { this.setState({ result: '', resultDiv: "hidden" }); }, 2000);

            });
        else {
            this.setState({ result: 'Voucher numbers must be same', resultDiv: 'errDiv' });
            setTimeout(() => { this.setState({ result: '', resultDiv: "hidden" }); }, 2000);
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ animation: 'animated zoomIn' })
        }, 10)
        axios.post('/dept/getdept').then(response => {
            this.setState({ dept: response.data });
        }).catch(error => {
            console.log(error);
        });
        setTimeout(() => {
            this.setState({ animation: 'animated ' })
        })
    }

    render() {
        return (
            <section className={this.state.animation + ' row padding-class'} id="account-creation">
                <div className="col-md-3 hidden-xs"></div>
                <div className="col-md-6 col-xs-12">
                    <div className="card">
                        <div className="card-header text-center">
                            <h3>Account Creation Panel</h3>
                        </div>
                        <div className="status-div"><div className={this.state.resultDiv}>{this.state.result}</div></div>
                        <div className="card-block">
                            <form autoComplete="off" method="post" id="Stdlogin" action={this.state.action} onSubmit={this.handleSubmit}>
                                <div className="row">

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Department</label>
                                            <input value={this.state.dept} className="form-control" type="text" id="inputID" name="StudentID" disabled />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Student ID</label>
                                        <input value={this.state.id} minLength="8" className="form-control" type="text" id="inputID" name="StudentID" onChange={event => this.setState({ id: event.target.value })} placeholder="e.g. 15-CS-21" required />
                                    </div>
                                    </div>

                                    <div className="col-md-6">
                                    <div className="form-group">
                                        <label>CNIC or Passport No.</label>
                                        <input value={this.state.cnic} className="form-control" type="text" id="cnic" name="CNICno" onChange={event => this.setState({ cnic: event.target.value })} required />
                                    </div>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Voucher No.</label>
                                        <input value={this.state.vouchNum1} className="form-control" type="text" id="voucherNum1" onChange={event => this.setState({ vouchNum1: event.target.value })} name="VoucherNum1" required />
                                    </div>
                                    </div>

                                    <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Enter Voucher No. again</label>
                                        <input value={this.state.vouchNum2} className="form-control" type="text" id="voucherNum2" onChange={event => this.setState({ vouchNum2: event.target.value })} name="VoucherNum2" required />
                                    </div>
                                    </div>

                                    <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Voucher Date</label>
                                        <input value={this.state.vouchDate} className="form-control" type="date" id="submitDate" name="SubmitDate" onChange={event => this.setState({ vouchDate: event.target.value })} placeholder="DD-MM-YYYY" required />
                                    </div>
                                    </div>
                                    
                                    <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Attendance</label>
                                        <input value={this.state.attendance} className="form-control" type="text" id="attendance" name="attendance" onChange={event => this.setState({ attendance: event.target.value })} placeholder="%" required />
                                    </div>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default AccCreateForm;