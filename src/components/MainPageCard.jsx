import React, { Component } from 'react';

class MainPageCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            animation: 'hidden-xl-down',
            logo: ''
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({animation: 'animated zoomIn'})
        }, 100)
        setTimeout(() => {
            this.setState({logo: 'animated tada'})
        }, 200)
    }
    

    render() {
        return (
            <div className={this.state.animation + ' row padding-class'}>
                <div className="col-xl-2 col-lg-2 hidden-md-down"></div>
                <div className="col-xl-8 col-lg-8 col-md-12">
                    <div className="card text-center">
                        <h3 className="card-header">
                            Welcome
                        </h3>
                        <div className="card-body mx-auto">
                            <img className={this.state.logo + ' card-img-top'} id="main-card-img" src="img/duet_logo.png" alt="unavailable"/>
                            <h4 className="card-title">Online Admit Card</h4>
                            <p className="card-text text-center">A service developed for students' admit card validation and generation procedure.</p>
                            <p className="card-text">This web application is used by the administration staff of <b><br />Dawood University of Engineeirng and Technology<br /> </b> 
                            for the management of the details of students registering for examinations.</p>
                            <p className="card-text">The students can access and submit their application form online after getting registered through a valid fee 
                                voucher's university copy.</p>
                        </div>
                        <div className="card-footer text-muted">
                            <p>Developed by : Shah Nawaz Awan &amp; Tasmia Fatima Niazi;</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default MainPageCard;