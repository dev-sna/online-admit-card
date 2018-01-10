import React, { Component } from 'react';
import axios from 'axios';

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
                    correction: {},
                    accountcreate: {},
                    accountupdate: {},
                    subjectinsert: {},
                    adminaccountupdate: {},
                    dataclear: {}
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        let name = e.target.name;
        const id = e.target.id;
        const form  = this.state[id];
        const newContact = {
          ...form,
          [name]: e.target.value
        };
        this.setState({ [e.target.id]: newContact });
        console.log(newContact);
    }

    handleSubmit(e){
        e.preventDefault();
        let form = e.target.id;
        let data = this.state[form];
        axios.post('/exam-admin-panel/'+form, {
          data: data
        }).then(response =>{
            console.log(response);
            this.setState({[form]: {result: 'Operation Successful',resultDiv: 'successDiv' }});
            setTimeout(() => {
                this.setState({[form]: {result: '',resultDiv: 'hidden' }});
            },2000);
        }).catch(err => {
            console.log(err);
            this.setState({[form]: {result: 'Operation Failed',resultDiv: 'errDiv' }});
            setTimeout(() => {
                this.setState({[form]: {result: '',resultDiv: 'hidden' }});
            },2000);
        });
    }

    render() {
        return (
            <div className="row padding-class">
                <div className="col-md-12 col-xs-12">
                    <div className="card">
                        <h3 className="card-header">Admin Operation Panel</h3>
                        {/* <div className="status-div"><div className={this.state.errorDiv}>{this.state.err}</div></div> */}
                        <div className="card-block">

                            <div className="jumbotron">
                                <form action="/exam-admin-panel/correction" name="correction" id="correction" className="admin-form border-class" onSubmit={this.handleSubmit}>
                                    <h4 className="text-center heading">Student Data Correction Form</h4>
                                    <div className="status-div margin-class"><div className={this.state.correction.resultDiv == undefined? 'hidden' :this.state.correction.resultDiv}>{this.state.correction.result == undefined? '':this.state.correction.result}</div></div>

                                    <div className="row">

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Examination Details</label>
                                                <select className="form-control" name="field" id="correction" value={this.state.correction.field}  onChange={this.handleChange}>
                                                    <option value="">select a field</option>
                                                    <option value="identity">Identity</option>
                                                    <option value="batch">Batch</option>
                                                    <option value="voucher_no">Voucher#</option>
                                                    <option value="voucher_date">Voucher Date</option>
                                                    <option value="fee">Fee</option>
                                                    <option value="attendance">Attendance</option>
                                                    <option value="semester">Semester</option>
                                                    <option value="exam_type">Exam Type</option>
                                                    <option value="study_year">Study Year</option>
                                                    <option value="current_year">Current Year</option>
                                                    <option value="enroll">Enrolment#</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Personal Details</label>
                                                <select className="form-control" name="field" id="correction" value={this.state.correction.field} onChange={this.handleChange}>
                                                    <option value="">select a field</option>
                                                    <option value="name">Name</option>
                                                    <option value="father_name">Father's name</option>
                                                    <option value="cnicpass">CNIC/Passport#</option>
                                                    <option value="pre_address">Present Address</option>
                                                    <option value="per_address">Permanent Address</option>
                                                    <option value="cell_no">Cell#</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Subjects Details</label>
                                                <select className="form-control" name="field" id="correction" value={this.state.correction.field} onChange={this.handleChange}>
                                                    <option value="">select a field</option>
                                                    <option value="sub_one"></option>
                                                    <option value="sub_two"></option>
                                                    <option value="sub_three"></option>
                                                    <option value="sub_four"></option>
                                                    <option value="sub_five"></option>
                                                    <option value="sub_six"></option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="">Selected Field</label>
                                                <input type="text" id="correction" name="corrected" value={this.state.correction.field == undefined? '':this.state.correction.field} onChange={this.handleChange} className="form-control" placeholder="select any field from 3 options above" required />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="">Corrected Value</label>
                                                <input type="text" id="correction" className="form-control" name="corrected" value={this.state.correction.corrected == undefined? '':this.state.correction.corrected } onChange={this.handleChange} required/>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="">Student ID</label>
                                                <input type="text" id="correction" className="form-control" name="identity" value={this.state.correction.identity == undefined? '':this.state.correction.identity} onChange={this.handleChange} placeholder="e.g. 15-CS-01" required />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-md-4">
                                                <label>&nbsp;</label>
                                                <input type="submit" value="Submit" className="btn btn-primary" />
                                            </div>
                                        </div>

                                    </div>
                                </form>


                                <form className="admin-form border-class" id="accountcreate" action="/exam-admin-panel/accountcreate" onSubmit={this.handleSubmit} method="post">
                                    <h4 className="text-center heading">Department Account Creation</h4>
                                    <div className="status-div margin-class"><div className={this.state.accountcreate.resultDiv == undefined? 'hidden' :this.state.accountcreate.resultDiv}>{this.state.accountcreate.result == undefined? '':this.state.accountcreate.result}</div></div>

                                    <div className="row">

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Identity</label>
                                                <input type="text" className="form-control" id="accountcreate" name="identity" value={this.state.accountcreate.identity == undefined? '':this.state.accountcreate.identity} onChange={this.handleChange} required />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input type="text" className="form-control" id="accountcreate"  name="password" value={this.state.accountcreate.password == undefined? '': this.state.accountcreate.password} onChange={this.handleChange} required />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Department</label>
                                                <select className="form-control" name="department" id="accountcreate" value={this.state.accountcreate.department == undefined? '':this.state.accountcreate.department} onChange={this.handleChange} required>
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

                                        <div className="form-group">
                                            <div className="col-md-4">
                                                <label>&nbsp;</label>
                                                <input type="submit" value="Submit" className="btn btn-primary" />
                                            </div>
                                        </div>

                                    </div>
                                </form>


                                <form className="admin-form border-class" id="accountupdate" action="/exam-admin-panel/accountupdate" method="post" onSubmit={this.handleSubmit}>
                                    <h4 className="text-center heading">Department Account Update</h4>
                                    <div className="status-div margin-class"><div className={this.state.accountupdate.resultDiv == undefined? 'hidden' :this.state.accountupdate.resultDiv}>{this.state.accountupdate.result == undefined? '':this.state.accountupdate.result}</div></div>
                                    <div className="row">

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Identity</label>
                                                <input type="text" id="accountupdate" name="identity" value={this.state.accountupdate.identity == undefined? '':this.state.accountupdate.identity} onChange={this.handleChange} className="form-control" required />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input type="text" id="accountupdate" name="password" value={this.state.accountupdate.password == undefined? '':this.state.accountupdate.password} onChange={this.handleChange} className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-4"></div>
                                        <div className="form-group">
                                            <div className="col-md-4">
                                                <label>&nbsp;</label>
                                                <input type="submit" value="Submit" className="btn btn-primary" />
                                            </div>
                                        </div>


                                    </div>
                                </form>

                                <form className="admin-form border-class" id="subjectinsert" action="/exam-admin-panel/subjectinsert" method="post" onSubmit={this.handleSubmit}>
                                    <h4 className="text-center heading">Subject Insertion</h4>
                                    <div className="status-div margin-class"><div className={this.state.subjectinsert.resultDiv}>{this.state.subjectinsert.result}</div></div>
                                    <div className="row">

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Department</label>
                                                <select className="form-control" id="subjectinsert" name="department" onChange={this.handleChange} value={this.state.subjectinsert.department == undefined? '':this.state.subjectinsert.department} required>
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

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Batch</label>
                                                <input type="text" id="subjectinsert" name="batch" value={this.state.subjectinsert.batch == undefined? '':this.state.subjectinsert.batch} onChange={this.handleChange} className="form-control" placeholder="e.g. DUET-2015" required />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Semester</label>
                                                {/* <input type="text" id="subjectinsert" name="semester" value={this.state.subjectinsert.semester == undefined? '':this.state.subjectinsert.semester} onChange={this.handleChange} className="form-control" /> */}
                                                <select id="subjectinsert" name="semester" value={this.state.subjectinsert.semester == undefined? '':this.state.subjectinsert.semester} onChange={this.handleChange} className="form-control">
                                                    <option value="">select semester</option>
                                                    <option value="1st">1st</option>
                                                    <option value="2nd">2nd</option>
                                                    <option value="3rd">3rd</option>
                                                    <option value="4th">4th</option>
                                                    <option value="5th">5th</option>
                                                    <option value="6th">6th</option>
                                                    <option value="7th">7th</option>
                                                    <option value="8th">8th</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="form-group">
                                                <label>Subject One Code</label>
                                                <input type="text" name="subjectOneCode" id="subjectinsert" value={this.state.subjectinsert.subjectOneCode == undefined? '': this.state.subjectinsert.subjectOneCode} onChange={this.handleChange} className="form-control" required />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Subject One Title</label>
                                                <input type="text" name="subjectOneTitle" id="subjectinsert" value={this.state.subjectinsert.subjectOneTitle == undefined? '': this.state.subjectinsert.subjectOneTitle} onChange={this.handleChange} className="form-control" required />
                                            </div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="form-group">
                                                <label>Subject One Theory Hours</label>
                                                {/* <input type="text" name="subjectOneThHrs" id="subjectinsert" value={this.state.subjectinsert.subjectOneThHrs == undefined? '': this.state.subjectinsert.subjectOneThHrs} onChange={this.handleChange} className="form-control" /> */}
                                                <select name="subjectOneThHrs" id="subjectinsert" value={this.state.subjectinsert.subjectOneThHrs == undefined? '': this.state.subjectinsert.subjectOneThHrs} onChange={this.handleChange} className="form-control" required>
                                                    <option value="">select hours</option>
                                                    <option value="0">0</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="form-group">
                                                <label>Subject One Practical Hours</label>
                                                {/* <input type="text" name="subjectOnePrHrs" id="subjectinsert" value={this.state.subjectinsert.subjectOnePrHrs == undefined? '': this.state.subjectinsert.subjectOnePrHrs} onChange={this.handleChange} className="form-control" /> */}
                                                <select name="subjectOnePrHrs" id="subjectinsert" value={this.state.subjectinsert.subjectOnePrHrs == undefined? '': this.state.subjectinsert.subjectOnePrHrs} onChange={this.handleChange} className="form-control" required>
                                                <option value="">select hours</option>
                                                <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="3">3</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-1">
                                            <div className="form-group">
                                                <label>Theory</label>
                                                <select name="subjectOneTh" id="subjectinsert" value={this.state.subjectinsert.subjectOneTh == undefined? '': this.state.subjectinsert.subjectOneTh} onChange={this.handleChange} className="form-control" required>
                                                    <option value="">select</option>
                                                    <option value="Th">Yes</option>
                                                    <option value="n/a">No</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-1">
                                            <div className="form-group">
                                                <label>Practical</label>
                                                <select name="subjectOnePr" id="subjectinsert" value={this.state.subjectinsert.subjectOnePr == undefined? '': this.state.subjectinsert.subjectOnePr} onChange={this.handleChange} className="form-control" required>
                                                    <option value="">select</option>
                                                    <option value="Pr">Yes</option>
                                                    <option value="n/a">No</option>
                                                </select>
                                            </div>
                                        </div>


                                        <div className="col-md-2">
                                            <div className="form-group">
                                                <label>Subject Two Code</label>
                                                <input type="text" name="subjectTwoCode" id="subjectinsert" value={this.state.subjectinsert.subjectTwoCode == undefined? '': this.state.subjectinsert.subjectTwoCode} onChange={this.handleChange} className="form-control" required />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Subject Two Title</label>
                                                <input type="text" name="subjectTwoTitle" id="subjectinsert" value={this.state.subjectinsert.subjectTwoTitle == undefined? '': this.state.subjectinsert.subjectTwoTitle} onChange={this.handleChange} className="form-control" required />
                                            </div>
                                        </div>

                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label>Subject Two Theory Hours</label>
                                            {/* <input type="text" name="subjectOneThHrs" id="subjectinsert" value={this.state.subjectinsert.subjectOneThHrs == undefined? '': this.state.subjectinsert.subjectOneThHrs} onChange={this.handleChange} className="form-control" /> */}
                                            <select name="subjectTwoThHrs" id="subjectinsert" value={this.state.subjectinsert.subjectTwoThHrs == undefined? '': this.state.subjectinsert.subjectTwoThHrs} onChange={this.handleChange} className="form-control" required>
                                                <option value="">select hours</option>
                                                <option value="0">0</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label>Subject Two Practical Hours</label>
                                            {/* <input type="text" name="subjectOnePrHrs" id="subjectinsert" value={this.state.subjectinsert.subjectOnePrHrs == undefined? '': this.state.subjectinsert.subjectOnePrHrs} onChange={this.handleChange} className="form-control" /> */}
                                            <select name="subjectTwoPrHrs" id="subjectinsert" value={this.state.subjectinsert.subjectTwoPrHrs == undefined? '': this.state.subjectinsert.subjectTwoPrHrs} onChange={this.handleChange} className="form-control" required>
                                            <option value="">select hours</option>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="3">3</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="form-group">
                                            <label>Theory</label>
                                            <select name="subjectTwoTh" id="subjectinsert" value={this.state.subjectinsert.subjectTwoTh == undefined? '': this.state.subjectinsert.subjectTwoTh} onChange={this.handleChange} className="form-control" required>
                                                <option value="">select</option>
                                                <option value="Th">Yes</option>
                                                <option value="n/a">No</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="form-group">
                                            <label>Practical</label>
                                            <select name="subjectTwoPr" id="subjectinsert" value={this.state.subjectinsert.subjectTwoPr == undefined? '': this.state.subjectinsert.subjectTwoPr} onChange={this.handleChange} className="form-control" required>
                                                <option value="">select</option>
                                                <option value="Pr">Yes</option>
                                                <option value="n/a">No</option>
                                            </select>
                                        </div>
                                    </div>
                                        
                                        <div className="col-md-2">
                                            <div className="form-group">
                                                <label>Subject Three Code</label>
                                                <input type="text" name="subjectThreeCode" id="subjectinsert" value={this.state.subjectinsert.subjectThreeCode == undefined? '': this.state.subjectinsert.subjectThreeCode} onChange={this.handleChange} className="form-control" required />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Subject Three Title</label>
                                                <input type="text" name="subjectThreeTitle" id="subjectinsert" value={this.state.subjectinsert.subjectThreeTitle == undefined? '': this.state.subjectinsert.subjectThreeTitle} onChange={this.handleChange} className="form-control" required />
                                            </div>
                                        </div>

                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label>Subject Three Theory Hours</label>
                                            {/* <input type="text" name="subjectOneThHrs" id="subjectinsert" value={this.state.subjectinsert.subjectOneThHrs == undefined? '': this.state.subjectinsert.subjectOneThHrs} onChange={this.handleChange} className="form-control" /> */}
                                            <select name="subjectThreeThHrs" id="subjectinsert" value={this.state.subjectinsert.subjectThreeThHrs == undefined? '': this.state.subjectinsert.subjectThreeThHrs} onChange={this.handleChange} className="form-control" required>
                                                <option value="">select hours</option>
                                                <option value="0">0</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label>Subject Three Practical Hours</label>
                                            {/* <input type="text" name="subjectOnePrHrs" id="subjectinsert" value={this.state.subjectinsert.subjectOnePrHrs == undefined? '': this.state.subjectinsert.subjectOnePrHrs} onChange={this.handleChange} className="form-control" /> */}
                                            <select name="subjectThreePrHrs" id="subjectinsert" value={this.state.subjectinsert.subjectThreePrHrs == undefined? '': this.state.subjectinsert.subjectThreePrHrs} onChange={this.handleChange} className="form-control" required>
                                            <option value="">select hours</option>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="3">3</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="form-group">
                                            <label>Theory</label>
                                            <select name="subjectThreeTh" id="subjectinsert" value={this.state.subjectinsert.subjectThreeTh == undefined? '': this.state.subjectinsert.subjectThreeTh} onChange={this.handleChange} className="form-control" required>
                                                <option value="">select</option>
                                                <option value="Th">Yes</option>
                                                <option value="n/a">No</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="form-group">
                                            <label>Practical</label>
                                            <select name="subjectThreePr" id="subjectinsert" value={this.state.subjectinsert.subjectThreePr == undefined? '': this.state.subjectinsert.subjectThreePr} onChange={this.handleChange} className="form-control" required>
                                                <option value="">select</option>
                                                <option value="Pr">Yes</option>
                                                <option value="n/a">No</option>
                                            </select>
                                        </div>
                                    </div>

                                        <div className="col-md-2">
                                            <div className="form-group">
                                                <label>Subject Four Code</label>
                                                <input type="text" name="subjectFourCode" id="subjectinsert" value={this.state.subjectinsert.subjectFourCode == undefined? '': this.state.subjectinsert.subjectFourCode} onChange={this.handleChange} className="form-control" required />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Subject Four Title</label>
                                                <input type="text" name="subjectFourTitle" id="subjectinsert" value={this.state.subjectinsert.subjectFourTitle == undefined? '': this.state.subjectinsert.subjectFourTitle} onChange={this.handleChange} className="form-control" required />
                                            </div>
                                        </div>

                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label>Subject Four Theory Hours</label>
                                            {/* <input type="text" name="subjectOneThHrs" id="subjectinsert" value={this.state.subjectinsert.subjectOneThHrs == undefined? '': this.state.subjectinsert.subjectOneThHrs} onChange={this.handleChange} className="form-control" /> */}
                                            <select name="subjectFourThHrs" id="subjectinsert" value={this.state.subjectinsert.subjectFourThHrs == undefined? '': this.state.subjectinsert.subjectFourThHrs} onChange={this.handleChange} className="form-control" required>
                                                <option value="">select hours</option>
                                                <option value="0">0</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label>Subject Four Practical Hours</label>
                                            {/* <input type="text" name="subjectOnePrHrs" id="subjectinsert" value={this.state.subjectinsert.subjectOnePrHrs == undefined? '': this.state.subjectinsert.subjectOnePrHrs} onChange={this.handleChange} className="form-control" /> */}
                                            <select name="subjectFourPrHrs" id="subjectinsert" value={this.state.subjectinsert.subjectFourPrHrs == undefined? '': this.state.subjectinsert.subjectFourPrHrs} onChange={this.handleChange} className="form-control" required>
                                            <option value="">select hours</option>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="3">3</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="form-group">
                                            <label>Theory</label>
                                            <select name="subjectFourTh" id="subjectinsert" value={this.state.subjectinsert.subjectFourTh == undefined? '': this.state.subjectinsert.subjectFourTh} onChange={this.handleChange} className="form-control" required>
                                                <option value="">select</option>
                                                <option value="Th">Yes</option>
                                                <option value="n/a">No</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="form-group">
                                            <label>Practical</label>
                                            <select name="subjectFourPr" id="subjectinsert" value={this.state.subjectinsert.subjectFourPr == undefined? '': this.state.subjectinsert.subjectFourPr} onChange={this.handleChange} className="form-control" required>
                                                <option value="">select</option>
                                                <option value="Pr">Yes</option>
                                                <option value="n/a">No</option>
                                            </select>
                                        </div>
                                    </div>


                                        <div className="col-md-2">
                                            <div className="form-group">
                                                <label>Subject Five Code</label>
                                                <input type="text" name="subjectFiveCode" id="subjectinsert" value={this.state.subjectinsert.subjectFiveCode == undefined? '': this.state.subjectinsert.subjectFiveCode} onChange={this.handleChange} className="form-control" />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Subject One Title</label>
                                                <input type="text" name="subjectFiveTitle" id="subjectinsert" value={this.state.subjectinsert.subjectFiveTitle == undefined? '': this.state.subjectinsert.subjectFiveTitle} onChange={this.handleChange} className="form-control" />
                                            </div>
                                        </div>

                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label>Subject Five Theory Hours</label>
                                            {/* <input type="text" name="subjectOneThHrs" id="subjectinsert" value={this.state.subjectinsert.subjectOneThHrs == undefined? '': this.state.subjectinsert.subjectOneThHrs} onChange={this.handleChange} className="form-control" /> */}
                                            <select name="subjectFiveThHrs" id="subjectinsert" value={this.state.subjectinsert.subjectFiveThHrs == undefined? '': this.state.subjectinsert.subjectFiveThHrs} onChange={this.handleChange} className="form-control">
                                                <option value="">select hours</option>
                                                <option value="0">0</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label>Subject Five Practical Hours</label>
                                            {/* <input type="text" name="subjectOnePrHrs" id="subjectinsert" value={this.state.subjectinsert.subjectOnePrHrs == undefined? '': this.state.subjectinsert.subjectOnePrHrs} onChange={this.handleChange} className="form-control" /> */}
                                            <select name="subjectFivePrHrs" id="subjectinsert" value={this.state.subjectinsert.subjectFivePrHrs == undefined? '': this.state.subjectinsert.subjectFivePrHrs} onChange={this.handleChange} className="form-control">
                                            <option value="">select hours</option>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="3">3</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="form-group">
                                            <label>Theory</label>
                                            <select name="subjectFiveTh" id="subjectinsert" value={this.state.subjectinsert.subjectFiveTh == undefined? '': this.state.subjectinsert.subjectFiveTh} onChange={this.handleChange} className="form-control">
                                                <option value="">select</option>
                                                <option value="Th">Yes</option>
                                                <option value="n/a">No</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="form-group">
                                            <label>Practical</label>
                                            <select name="subjectFivePr" id="subjectinsert" value={this.state.subjectinsert.subjectFivePr == undefined? '': this.state.subjectinsert.subjectFivePr} onChange={this.handleChange} className="form-control">
                                                <option value="">select</option>
                                                <option value="Pr">Yes</option>
                                                <option value="n/a">No</option>
                                            </select>
                                        </div>
                                    </div>

                                        <div className="col-md-2">
                                            <div className="form-group">
                                                <label>Subject Six Code</label>
                                                <input type="text" name="subjectSixCode" id="subjectinsert" value={this.state.subjectinsert.subjectSixCode == undefined? 'n/a': this.state.subjectinsert.subjectSixCode} onChange={this.handleChange} className="form-control" />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Subject Six Title</label>
                                                <input type="text" name="subjectSixTitle" id="subjectinsert" value={this.state.subjectinsert.subjectSixTitle == undefined? 'n/a': this.state.subjectinsert.subjectSixTitle} onChange={this.handleChange} className="form-control" />
                                            </div>
                                        </div>

                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label>Subject Six Theory Hours</label>
                                            {/* <input type="text" name="subjectOneThHrs" id="subjectinsert" value={this.state.subjectinsert.subjectOneThHrs == undefined? '': this.state.subjectinsert.subjectOneThHrs} onChange={this.handleChange} className="form-control" /> */}
                                            <select name="subjectSixThHrs" id="subjectinsert" value={this.state.subjectinsert.subjectSixThHrs == undefined? '': this.state.subjectinsert.subjectSixThHrs} onChange={this.handleChange} className="form-control">
                                                <option value="">select hours</option>
                                                <option value="0">0</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label>Subject Six Practical Hours</label>
                                            {/* <input type="text" name="subjectOnePrHrs" id="subjectinsert" value={this.state.subjectinsert.subjectOnePrHrs == undefined? '': this.state.subjectinsert.subjectOnePrHrs} onChange={this.handleChange} className="form-control" /> */}
                                            <select name="subjectSixPrHrs" id="subjectinsert" value={this.state.subjectinsert.subjectSixPrHrs == undefined? '': this.state.subjectinsert.subjectSixPrHrs} onChange={this.handleChange} className="form-control">
                                            <option value="">select hours</option>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="3">3</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="form-group">
                                            <label>Theory</label>
                                            <select name="subjectSixTh" id="subjectinsert" value={this.state.subjectinsert.subjectSixTh == undefined? '': this.state.subjectinsert.subjectSixTh} onChange={this.handleChange} className="form-control">
                                                <option value="">select</option>
                                                <option value="Th">Yes</option>
                                                <option value="n/a">No</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="form-group">
                                            <label>Practical</label>
                                            <select name="subjectSixPr" id="subjectinsert" value={this.state.subjectinsert.subjectSixPr == undefined? '': this.state.subjectinsert.subjectSixPr} onChange={this.handleChange} className="form-control">
                                                <option value="">select</option>
                                                <option value="Pr">Yes</option>
                                                <option value="n/a">No</option>
                                            </select>
                                        </div>
                                    </div>

                                        <div className="form-group">
                                            <div className="col-md-4">
                                                <label>&nbsp;</label>
                                                <input type="submit" value="Submit" className="btn btn-primary" />
                                            </div>
                                        </div>


                                    </div>
                                </form>

                                <form className="admin-form border-class" id="adminaccountupdate" action="/exam-admin-panel/adminaccountupdate" onSubmit={this.handleSubmit}>
                                    <h4 className="text-center heading">Admin Account Update</h4>
                                    <div className="status-div margin-class"><div className={this.state.adminaccountupdate.resultDiv == undefined? 'hidden' :this.state.adminaccountupdate.resultDiv}>{this.state.adminaccountupdate.result == undefined? '':this.state.adminaccountupdate.result}</div></div>
                                    <div className="row">

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="email" id="adminaccountupdate" name="email" value={this.state.adminaccountupdate.email == undefined? '': this.state.adminaccountupdate.email} onChange={this.handleChange} className="form-control" />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input type="text" id="adminaccountupdate" name="password" value={this.state.adminaccountupdate.password == undefined? '': this.state.adminaccountupdate.password} onChange={this.handleChange} className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-4"></div>
                                        <div className="form-group">
                                            <div className="col-md-4">
                                                <label>&nbsp;</label>
                                                <input type="submit" value="Submit" className="btn btn-primary" />
                                            </div>
                                        </div>


                                    </div>
                                </form>

                                <form className="admin-form border-class" id="dataclear" action="/exam-admin-panel/dataclear" method="post" onSubmit={this.handleSubmit}>
                                <h4 className="text-center heading">Student Database Clearance</h4>
                                <div className="status-div margin-class"><div className={this.state.dataclear.resultDiv == undefined? 'hidden' :this.state.dataclear.resultDiv}>{this.state.dataclear.result == undefined? '':this.state.dataclear.result}</div></div>

                                    <div className="row">

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Type your password</label>
                                                <input className="form-control" type="password" name="password" id="dataclear" value={this.state.dataclear.password == undefined? '':this.state.dataclear.password} onChange={this.handleChange} />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-md-2">
                                                <label>&nbsp;</label>
                                            <input type="submit" value="Clear Database" className="btn btn-danger" />
                                            </div>
                                        </div>

                                    </div>
                                </form>

                            </div>

                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

export default Admin;