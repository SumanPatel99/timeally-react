import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import Layout from '../Layout/Layout';

const ethers = require('ethers');

class SIP extends Component {
  state = {
    fundsDeposit: null,
    pendingBenefits: null,
    showLoginModal: false
  };

  componentDidMount = () => {
    (async() => {
      const fundsDeposit = await this.props.store.sipInstance.functions.fundsDeposit();
      this.setState({ fundsDeposit });
    })();

    (async() => {
      const pendingBenefits = await this.props.store.sipInstance.functions.pendingBenefitAmountOfAllStakers();
      this.setState({ pendingBenefits });
    })();
  }

  render = () => (
    <Layout
      breadcrumb={['Home', 'Assurance']}
      title="TimeAlly Super Goal Achiever Plan"
      transparent={true}
      buttonName="New SIP"
      buttonOnClick={this.props.store.walletInstance && this.props.store.walletInstance.address
        ? () => this.props.history.push('/assurance/new')
        : () => (
          window.returnLocationAfterLoadWallet={
            name:'New SIP',
            location:'/assurance/new',
            sourceLocation:this.props.location.pathname
          },this.setState({showLoginModal:true})
        )}
    >
      <h2 style={{marginTop: '1rem'}}>TimeAlly Assurance SIP for Acheivers</h2>
      <p style={{marginBottom: '5rem'}}>TimeAlly Retirement Plans are a Smart Contract Protocol based plans, that are extraordinarily intended to meet your post-retirement needs, for example, medical and living costs. It is secured SIP (Systematic Investment Plan) since the benefits for the stakers are stored in safely in Smart Contract which is transparent & most secure system driven.</p>
      <div className="row">
        <div className="col-xl-4 col-md-12">
          <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
            <div className="circle"><img src="./images/loan.png"/></div>
            <h3 className="number-title">Gurantee</h3>
            <p>Complete Transparency of Rewards Allocated in Advance through Smart Contracts.</p>
          </div>
        </div>
        <div className="col-xl-4 col-md-12">
          <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
          <div className="circle"><img src="./images/interest.png"/></div>
            <h3 className="number-title">Power of Compounding</h3>
            <p>TimeAlly Smart Contract offers only 1% Rate of Interest to it's users for a duration of 60 days.</p>
          </div>
        </div>
        <div className="col-xl-4 col-md-12">
          <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
            <div className="circle"><img src="./images/loan.png"/></div>
            <h3 className="number-title">Booster Bonous</h3>
            <p>End of every three years, stakers are eligible for Power Booster bonous through Smart Contract.</p>
          </div>
        </div>
        <div className="col-xl-4 col-md-12">
          <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
          <div className="circle"><img src="./images/interest.png"/></div>
            <h3 className="number-title">Dayswapper Rewards</h3>
            <p>Help others to acheive their goals to acheive your own through Dayswapper Rewards.</p>
          </div>
        </div>
        <div className="col-xl-4 col-md-12">
          <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
          <div className="circle"><img src="./images/medal.png"/></div>
            <h3 className="number-title">Nominate your Legacy</h3>
            <p>Stakers can add Nominees in their SIPs who can act on their behalf after inactivity of Stakers.</p>
          </div>
        </div>
        <div className="col-xl-4 col-md-12">
          <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
          <div className="circle"><img src="./images/medal.png"/></div>
            <h3 className="number-title">Appointees</h3>
            <p>Trustless consensus after inactivity using multi-signing by assigned Appointees in SIP.</p>
          </div>
        </div>
      </div>
      <div className="outline pinside30 bg-boxshadow" style={{marginBottom: '1rem', backgroundColor: '#fff'}}>
        <p><strong>ES Bucket In Smart Contract:</strong> {
          this.state.fundsDeposit ? ethers.utils.formatEther(this.state.fundsDeposit) + ' ES' : 'Loading...'}</p>
        <p><strong>Benefits Already Alloted:</strong> {this.state.pendingBenefits ? ethers.utils.formatEther(this.state.pendingBenefits) + ' ES' : 'Loading...'} ({this.state.fundsDeposit && this.state.pendingBenefits
          ? window.lessDecimals(this.state.pendingBenefits.mul(ethers.utils.parseEther('100')).div(this.state.fundsDeposit), 4) + '% of fund bucket is allocated' : 'Loading...'})</p>
        <Button onClick={() => this.props.history.push('/assurance/calculate')}>SIP Calculator</Button>
        <Button onClick={this.props.store.walletInstance && this.props.store.walletInstance.address
          ? () => this.props.history.push('/assurance/view')
          : () => (
            window.returnLocationAfterLoadWallet={
              name:'View My SIPs',
              location:'/assurance/view',
              sourceLocation:this.props.location.pathname
            },this.setState({showLoginModal:true})
          )}>View My SIPs</Button>
        <p style={{marginTop:'1rem'}}><strong>SIP Smart Contract Link:</strong> <a href="https://etherscan.io/address/0xbad9af4db5401b7d5e8177a18c1d69c35fc03fd3#code" target="_blank" style={{color: '#000', textDecoration: 'underline'}}>EtherScan</a></p>
      </div>
      <Modal
        show={this.state.showLoginModal}
        onHide={ () => this.setState({ showLoginModal: false }) }
      >
        <Modal.Header closeButton>
          <Modal.Title>Wallet Needed</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>You need to load your ethereum wallet in order to proceed. Please click the below button to go to the load wallet page.</p>
          <Button
            onClick={() => this.props.history.push('/load-wallet')}
            variant="primary"
          >
            Go to Load Wallet Page
          </Button>
        </Modal.Body>
      </Modal>
    </Layout>
  );
}

export default connect(state => {return{store: state}})(SIP);
