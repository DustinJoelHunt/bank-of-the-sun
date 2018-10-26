//necessary imports for the page
import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import Payment from "./payment.component";

import MakeOnceOffPayments from "./makeOnceOffPayment.component";
import PayBen from "./payBen.component";
import MakeReccuringPayments from "./makeReccuringPayment.component";
import MakeFuturePayments from "./makeFuturePayment.component";

import axios from "axios";
import {Link} from "react-router-dom";
import "../css/make-payments.css"
import Support from "./support.component";

//save background for component
const background = require('../img/BackgroundGeneral.jpg');
//set the styles for the background
const divStyle = {
  width: '100%',
  minHeight: '1000px',
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  marginTop: '5px',
};

class MakePayments extends Component {
  //set initial states for form data to save in
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      dropdownVisible: false,
      view : ''
    };
  }

  handleClick = view => event => {
    //handle click for components to render
    if (!this.state.dropdownVisible) {
        document.addEventListener('click', this.handleOutsideClick, false);
    } else {
        document.removeEventListener('click', this.handleOutsideClick, false);
    }
    //sets state to not the same as the previous state
    this.setState(prevState => ({
        dropdownVisible: !prevState.dropdownVisible,
        view
    }));
  }

  componentDidMount() {
    (async () => {

        try {
            const token = this.props.token;

            const api = axios.create({
                baseURL: 'http://45.77.58.134:8080',
                headers: {'Authorization': 'Bearer ' + token}
            });

            this.setState({
                isLoading: true
            });
            const accounts = await api.get(`/accounts/${this.props.clients[0]._id}`);

            this.setState({
                accounts: accounts.data,
                isLoading: false
            });
            // console.log(accounts);

        } catch (e) {
            // handle error.
            this.setState({
                isLoading: false
            })
        }
    })();
  }

  render() {
    return (
      <Fragment>
        <div style = {divStyle}>
          <Navigation clients={this.props.clients}/>

          <h1>Make Payments</h1>
          {/*parses view you want to go to to handle Click*/}
          <div class="container">
            <button type="button" onClick={this.handleClick('view1')} class="btn btn-primary active">Make Once-Off Payment</button>
            <button type="button" onClick={this.handleClick('view2')} class="btn btn-primary active">Pay Beneficiary</button>
            <button type="button" onClick={this.handleClick('view3')} class="btn btn-primary active">Make Reccuring Payment</button>
            <button type="button" onClick={this.handleClick('view4')} class="btn btn-primary active">Make Future Dated Payment</button>
          </div>
          {/*renders component mathcing to view clicked on*/}
          <div className="table-container">
              {this.state.view === 'view1' && <MakeOnceOffPayments clients={this.props.clients} token={this.props.token}/>}
              {this.state.view === 'view2' && <PayBen beneficiaries={this.props.beneficiaries} clients={this.props.clients} token={this.props.token}/>}
              {this.state.view === 'view3' && <MakeReccuringPayments beneficiaries={this.props.beneficiaries} clients={this.props.clients} token={this.props.token}/>}
              {this.state.view === 'view4' && <MakeFuturePayments beneficiaries={this.props.beneficiaries} clients={this.props.clients} token={this.props.token}/>}
          </div>
          {/*calls support component*/}
          <Support />
        </div>
      </Fragment>
    )
  }
}
//export component
export default MakePayments
