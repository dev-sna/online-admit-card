import React, { Component } from 'react';
import axios from 'axios';
import Table from './Table.jsx';

class Validation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            department: '',
            batch: 'DUET-20',
            animation: 'hidden-xl-down'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getData = this.getData.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.getData();
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({animation: 'animated zoomIn'})
        }, 100)
    }

    getData() {
        axios.post('/validate/getdata', {
            dept: this.state.department,
            batch: this.state.batch
        }).then(response => {
            this.setState({data: response.data});
            console.log(this.state.data);
        }).catch(error => {
            console.log(error);
        });
    }
    render() {
        return (
            <div className={this.state.animation + ' row padding-class'}>
                {/* <div className="col-md-1 col-lg-1 col-xl-1"></div> */}
                <div className="col-md-12 col-xl-12 col-lg-12">
                    <div className="card">
                        <div className="card-header text-center"><h3>Validation Panel</h3></div>
                        <div className="status-div"><div className={this.state.errorDiv}>{this.state.err}</div></div>
                        <div className="card-block">
                            <form action="/validate/getdata" method="post" onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>Department</label>
                                            <select className="form-control" value={this.state.department} onChange={event => this.setState({ department: event.target.value })} required>
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
                                    </div>

                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>Input Batch</label>
                                            <input value={this.state.batch} className="form-control" onChange={event => this.setState({ batch: event.target.value })} required />
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label>Get Data</label>
                                            <input value="Submit" type="submit" className="form-control btn btn-primary" />
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="form-group">
                                        <label>Submitted Forms</label>
                                        <span className="form-control btn btn-info">{this.state.data.length}</span>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="form-group">
                                        <label>Get Excel Sheet</label>
                                        <a id="excel" target="_blank" href={'/validate/excel/'+this.state.department+'/'+this.state.batch}><div className="form-control btn btn-success">Click Here</div></a>
                                        </div>
                                    </div>

                                </div>
                                
                            {this.state.data == '' ? null:<Table stdData={this.state.data} />}
                        
                            </form>
                        </div>


                    </div>

                </div>
            </div>
        );
    }
}

export default Validation;