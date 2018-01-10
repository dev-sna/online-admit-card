import React, { Component } from 'react';
import axios from 'axios';

class Appform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            semester: '',
            currentYear: '',
            studyYear: '',
            examType: '',
            batch: 'DUET-20' + '',
            dept: '',
            fee: '',
            challan: '',
            submitDate: '',
            identity: '',

            name: '',
            fname: '',
            gender: '',
            nation: '',
            cnicpass: '',
            enrolNo: '',
            preAddress: '',
            perAddress: '',
            cellNo: '',

            subOne: '',
            subOneTh: '',
            subOnePr: '',
            subTwo: '',
            subTwoTh: '',
            subTwoPr: '',
            subThree: '',
            subThreeTh: '',
            subThreePr: '',
            subFour: '',
            subFourTh: '',
            subFourPr: '',
            subFive: '',
            subFiveTh: '',
            subFivePr: '',
            subSix: '',
            subSixTh: '',
            subSixPr: '',

            err: '',
            errDiv: 'hidden',
            toggle: '',
            animation: 'hidden-xl-down'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleThChange = this.handleThChange.bind(this);
        this.handlePrChange = this.handlePrChange.bind(this);
        this.getSubs = this.getSubs.bind(this);
        this.dataPost = this.dataPost.bind(this);

    }
    handleSubmit(event) {
        event.preventDefault();
        this.setState({toggle: 'toggled'});
        
            this.dataPost();          
        ;
        
    }

    getSubs() {
        if (this.state.semester != ''  && this.state.batch.length > 8) {
            axios.post('/appform/getsubs/', {
                batch: this.state.batch,
                sem: this.state.semester
            }).then(response => {
                console.log(response);
                if (response.data != '') {
                    this.setState({
                        subOne: response.data.subOneTitle,
                        subTwo: response.data.subTwoTitle,
                        subThree: response.data.subThreeTitle,
                        subFour: response.data.subFourTitle,
                        subFive: response.data.subFiveTitle,
                        subSix: response.data.subSixTitle,
                        subOneTh: response.data.subOneTh,
                        subOnePr: response.data.subOnePr,
                        subTwoTh: response.data.subTwoTh,
                        subTwoPr: response.data.subTwoPr,
                        subThreeTh: response.data.subThreeTh,
                        subThreePr: response.data.subThreePr,
                        subFourTh: response.data.subFourTh,
                        subFourPr: response.data.subFourPr,
                        subFiveTh: response.data.subFiveTh,
                        subFivePr: response.data.subFivePr,
                        subSixTh: response.data.subSixTh,
                        subSixPr: response.data.subSixPr
                    });
                }
                else {
                    this.setState({
                        subOne: '', subTwo: '', subThree: '', subFour: ''
                        , subFive: '', subSix: ''
                    });
                }
            }).catch(error => {
                this.setState({ err: 'Invalid Credentials', errDiv: 'errDiv' });
                setTimeout(() => {
                    this.setState({ err: '', errDiv: 'hidden' });
                }, 2000);
            });
        }

        else {
            this.setState({ err: 'Select Batch and Semester', errDiv: 'errDiv' });
            setTimeout(() => {
                this.setState({ err: '', errDiv: 'hidden' });
            }, 2000);
        }
    }

    handleThChange(e) {
        let name = e.target.name;
        this.setState(e.target.checked ? { [name]: 'Th' } : { [name]: '' });
    }

    handlePrChange(e) {
        let name = e.target.name;
        this.setState(e.target.checked ? { [name]: 'Pr' } : { [name]: '' });
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({animation: 'animated zoomIn'})
        }, 100)
        axios.post('/appform/getdata').then(response => {
            this.setState({
                identity: response.data.identity,
                dept: response.data.department,
                cnicpass: response.data.cnicpass,
                challan: response.data.voucher_no,
                submitDate: response.data.voucher_date
            });
            console.log(response)
        }).catch(error => {

        });
    }

    dataPost(){
        axios.post('/appform/postform', {
            identity: this.state.identity,
            semester: this.state.semester,
            currentYear: this.state.currentYear,
            studyYear: this.state.studyYear,
            examType: this.state.examType,
            batch: this.state.batch,
            fee: this.state.fee,
            challan: this.state.challan,

            name: this.state.name,
            fname: this.state.fname,
            gender: this.state.gender,
            nation: this.state.nation,
            cnicpass: this.state.cnicpass,
            enrolNo: this.state.enrolNo,
            preAddress: this.state.preAddress,
            perAddress: this.state.perAddress,
            cellNo: this.state.cellNo,

            subOne: this.state.subOne,
            subOneTh: this.state.subOneTh,
            subOnePr: this.state.examType == 'Mid term' ? '': this.state.subOnePr,
            subTwo: this.state.subTwo,
            subTwoTh: this.state.subTwoTh,
            subTwoPr: this.state.examType == 'Mid term' ? '': this.state.subTwoPr,
            subThree: this.state.subThree,
            subThreeTh: this.state.subThreeTh,
            subThreePr: this.state.examType == 'Mid term' ? '': this.state.subThreePr,
            subFour: this.state.subFour,
            subFourTh: this.state.subFourTh,
            subFourPr: this.state.examType == 'Mid term' ? '': this.state.subFourPr,
            subFive: this.state.subFive,
            subFiveTh: this.state.subFiveTh,
            subFivePr: this.state.examType == 'Mid term' ? '': this.state.subFivePr,
            subSix: this.state.subSix,
            subSixTh: this.state.subSixTh,
            subSixPr: this.state.examType == 'Mid term' ? '': this.state.subSixPr,

        }).then(response => {
            setTimeout(() => {
                this.props.history.push('/');
            }, 5000)
        }).catch(error => {

        });
    }

    render() {
        return (

            <div className={this.state.animation + ' row padding-class'} id="main">
                
                    
                <div className="col-lg-1 col-xl-1 hidden-md hidden-sm hidden-xs"></div>
                <div className="col-md-12 col-lg-10 col-xl-10">

                    {this.state.toggle == ''? 
                    <div className="card">
                        <h1 className="text-center">APPLICATION FORM</h1>
                        <div className="card-block">
                    <form method="post" action="/appform/postform" onSubmit={this.handleSubmit}>
                        <div className="row">

                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Identity</label>
                                    <input value={this.state.identity} className="form-control" type="text" disabled />
                                </div>
                            </div>


                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Department</label>
                                    <input value={this.state.dept} type="text" className="form-control" disabled />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Batch</label>
                                    <input value={this.state.batch} onChange={event => this.setState({ batch: event.target.value })} className="form-control" type="text" placeholder="e.g. DUET-2015" required />
                                </div>
                            </div>


                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Study Year</label>
                                    <select value={this.state.studyYear} onChange={event => this.setState({ studyYear: event.target.value })} className="form-control" required>
                                        <option value="">Select study year</option>
                                        <option value="1st">1st</option>
                                        <option value="2nd">2nd</option>
                                        <option value="3rd">3rd</option>
                                        <option value="4th">4th</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Examination Semester</label>
                                    <select value={this.state.semester} onChange={event => this.setState({ semester: event.target.value })} className="form-control" required>
                                        <option value="">Select semester</option>
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


                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label"> Current Year</label>
                                    <input value={this.state.currentYear} onChange={event => this.setState({ currentYear: event.target.value })} className="form-control" type="text" placeholder="e.g 2015" required/>
                                </div>
                            </div>


                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Examination Type </label>
                                    <select value={this.state.examType} onChange={event => this.setState({ examType: event.target.value })} className="form-control" required>
                                        <option value="">Select exam type</option>
                                        <option value="Mid term">Mid Term</option>
                                        <option value="Final">Final</option>
                                        <option value="Repeat">Repeat</option>
                                    </select>
                                </div>
                            </div>


                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Examination Fee</label>
                                    <input value={this.state.fee} onChange={event => this.setState({ fee: event.target.value })} className="form-control" type="text" required/>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Bank Challan Number</label>
                                    <input value={this.state.challan} className="form-control" type="text" disabled />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Bank Challan Date</label>
                                    <input value={this.state.submitDate} className="form-control" type="text" disabled/>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <div className="form-group">
                                <label className="control-label">Select semester and Batch</label>
                                    <div className="form-control btn-primary text-center" onClick={this.getSubs}>Get Subjects</div>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <div className="status-div">
                                <label className="control-label">&nbsp;</label>
                                    <div className={this.state.errDiv}>{this.state.err}</div>
                                </div>
                            </div>

                        </div>

                        <div className="row">
                            
                            <div className="text-center col-md-12 col-lg-12 col-xl-12" >

                                <h1>PERSONAL DETAILS</h1>
                            </div>
                            

                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Name</label>
                                    <input value={this.state.name} onChange={event => this.setState({ name: event.target.value })} className="form-control" type="text" placeholder="Name" required/>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Father's Name</label>
                                    <input value={this.state.fname} onChange={event => this.setState({ fname: event.target.value })} className="form-control" type="text" required/>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Gender</label>
                                    <select value={this.state.gender} onChange={event => this.setState({ gender: event.target.value })} className="form-control" required>
                                        <option value="">Select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Nationality</label>
                                    <input value={this.state.nation} className="form-control" type="text" onChange={event => this.setState({ nation: event.target.value })} required/>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label">CNIC/Passport No</label>
                                    <input value={this.state.cnicpass} className="form-control" type="text" disabled/>
                                </div>
                            </div>


                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Enrollment No</label>
                                    <input value={this.state.enrolNo} onChange={event => this.setState({ enrolNo: event.target.value })} className="form-control" type="text" required/>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Present Address</label>
                                    <input value={this.state.preAddress} onChange={event => this.setState({ preAddress: event.target.value })} className="form-control" type="text" required/>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Permanent Address</label>
                                    <input value={this.state.perAddress} onChange={event => this.setState({ perAddress: event.target.value })} className="form-control" type="text" required/>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Cell No</label>
                                    <input value={this.state.cellNo} onChange={event => this.setState({ cellNo: event.target.value })} className="form-control" type="text" required/>
                                </div>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-md-12 text-center"><h1>Subjects to appear</h1></div>

                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Subject:&nbsp;1</label>
                                    <input value={this.state.subOne} onChange={event => this.setState({ subOne: event.target.value })} className="form-control" type="text" required disabled={this.state.examType== 'Repeat'? false:"disabled"} />
                                </div>
                            </div>
                            <div className="col-md-1 col-xs-6 checkbox-div">
                                <div className="checkbox">
                                    <label><input value={this.state.subOneTh} onChange={this.handleThChange} name="subOneTh" type="checkbox" disabled={this.state.examType== 'Repeat'? false:"disabled"} checked={this.state.subOneTh == 'Th'? "checked":false} />Th</label>
                                </div>
                            </div>
                            <div className="col-md-1 col-xs-6 checkbox-div">
                                <div className="checkbox">
                                    <label><input value={this.state.subOnePr} onChange={this.handlePrChange} name="subOnePr" type="checkbox" disabled={this.state.examType== 'Repeat'? false:"disabled"} checked={this.state.examType == 'Mid term' ? false: this.state.subOnePr == 'Pr'? "checked":false} />Pr</label>
                                </div>
                            </div>


                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <label className="control-label">Subject:&nbsp;2</label>
                                <div className="form-group">
                                    <input value={this.state.subTwo} onChange={event => this.setState({ subTwo: event.target.value })} className="form-control" type="text" disabled={this.state.examType== 'Repeat'? false:"disabled"} />
                                </div>
                            </div>

                            <div className="col-md-1 col-xs-6 checkbox-div">
                                <div className="checkbox">
                                    <label><input value={this.state.subTwoTh} onChange={this.handleThChange} name="subTwoTh" type="checkbox" disabled={this.state.examType== 'Repeat'? false:"disabled"} checked={this.state.subTwoTh == 'Th'? "checked":false} />Th
                            </label>
                                </div>
                            </div>
                            <div className="col-md-1 col-xs-6 checkbox-div">
                                <div className="checkbox">
                                    <label><input value={this.state.subTwoPr} onChange={this.handlePrChange} name="subTwoPr" type="checkbox" disabled={this.state.examType== 'Repeat'? false:"disabled"} checked={this.state.examType == 'Mid term' ? false: this.state.subTwoPr == 'Pr'? "checked":false} />Pr
                            </label>

                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <label className="control-label">Subject:&nbsp;3</label>
                                <div className="form-group">
                                    <input value={this.state.subThree} onChange={event => this.setState({ subThree: event.target.value })} className="form-control" type="text" disabled={this.state.examType== 'Repeat'? false:"disabled"} />
                                </div>
                            </div>

                            <div className="col-md-1 col-xs-6 checkbox-div">
                                <div className="checkbox">
                                    <label><input value={this.state.subThreeTh} onChange={this.handleThChange} name="subThreeTh" type="checkbox" disabled={this.state.examType== 'Repeat'? false:"disabled"} checked={this.state.subThreeTh == 'Th'? "checked":false} />Th
                            </label>
                                </div>
                            </div>
                            <div className="col-md-1 col-xs-6 checkbox-div">
                                <div className="checkbox">
                                    <label><input value={this.state.subThreePr} onChange={this.handlePrChange} name="subThreePr" type="checkbox" disabled={this.state.examType== 'Repeat'? false:"disabled"} checked={this.state.examType == 'Mid term' ? false: this.state.subThreePr == 'Pr'? "checked":false} />Pr</label>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <label className="control-label">Subject:&nbsp;4</label>
                                <div className="form-group">
                                    <input value={this.state.subFour} onChange={event => this.setState({ subFour: event.target.value })} className="form-control" type="text" disabled={this.state.examType== 'Repeat'? false:"disabled"} />
                                </div>
                            </div>

                            <div className="col-md-1 col-xs-6 checkbox-div">
                                <div className="checkbox">
                                    <label><input value={this.state.subFourTh} onChange={this.handleThChange} name="subFourTh" type="checkbox" disabled={this.state.examType== 'Repeat'? false:"disabled"} checked={this.state.subFourTh == 'Th'? "checked":false} />Th</label>
                                </div>
                            </div>
                            <div className="col-md-1 col-xs-6 checkbox-div">
                                <div className="checkbox">
                                    <label><input value={this.state.subFourPr} onChange={this.handlePrChange} name="subFourPr" type="checkbox" disabled={this.state.examType== 'Repeat'? false:"disabled"} checked={this.state.examType == 'Mid term' ? false: this.state.subFourPr == 'Pr'? "checked":false} />Pr</label>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <label className="control-label">Subject:&nbsp;5</label>
                                <div className="form-group">
                                    <input value={this.state.subFive} onChange={event => this.setState({ subFive: event.target.value })} className="form-control" type="text" disabled={this.state.examType== 'Repeat'? false:"disabled"} />
                                </div>
                            </div>

                            <div className="col-md-1 col-xs-6 checkbox-div">
                                <div className="checkbox">
                                    <label><input value={this.state.subFiveTh} onChange={this.handleThChange} name="subFiveTh" type="checkbox" disabled={this.state.examType== 'Repeat'? false:"disabled"} checked={this.state.subFiveTh == 'Th'? "checked":false} />Th
                            </label>
                                </div>
                            </div>
                            <div className="col-md-1 col-xs-6 checkbox-div">
                                <div className="checkbox">
                                    <label><input value={this.state.subFivePr} onChange={this.handlePrChange} name="subFivePr" type="checkbox" disabled={this.state.examType== 'Repeat'? false:"disabled"} checked={this.state.examType == 'Mid term' ? false: this.state.subFivePr == 'Pr'? "checked":false} />Pr
                            </label>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Subject:&nbsp;6</label>
                                    <input value={this.state.subSix} onChange={event => this.setState({ subSix: event.target.value })} className="form-control" type="text" disabled={this.state.examType== 'Repeat'? false:"disabled"}  />
                                </div>
                            </div>

                            <div className="col-md-1 col-xs-6 checkbox-div">
                                <div className="checkbox">
                                    <label><input value={this.state.subSixTh} onChange={this.handleThChange} name="subSixTh" type="checkbox" disabled={this.state.examType== 'Repeat'? false:"disabled"} checked={this.state.subSixTh == 'Th'? "checked":false} />Th
                            </label>
                                </div>
                            </div>
                            <div className="col-md-1 col-xs-6 checkbox-div">
                                <div className="checkbox">
                                    <label><input value={this.state.subSixPr} onChange={this.handlePrChange} name="subSixPr" type="checkbox" disabled={this.state.examType== 'Repeat'? false:"disabled"} checked={this.state.examType == 'Mid term' ? false: this.state.subSixPr == 'Pr'? "checked":false} />Pr
                            </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <input type="submit" value="Submit" className="form-control btn btn-primary" />
                            </div>

                        </div>

                    </form>
                </div>
                </div>
                :
                <div className="alert alert-success text-center" role="alert">
                <strong>Well done!</strong> You have successfully submitted your form. You'll now be redirected to Home page.
                </div>}
                </div>
                </div>
            
            


        );
    }
}
export default Appform;