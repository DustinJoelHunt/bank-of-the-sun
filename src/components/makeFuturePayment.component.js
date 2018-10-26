//necessary imports for the page
import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import Payment from "./payment.component";
import axios from "axios";
import {Link} from "react-router-dom";

class MakeFuturePayments extends Component {
  //set initial states for form data to save in
  constructor(props) {
      super(props);
      this.state = {
        accounts: [],
        date: '',
        beneficiary: '',
        fromAccount: '',
        amount: '',
        ref: ''
      };
    //bind the listener of the funtions to the current class
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  //saves the state of the data enetered into the form when submitted
  handleSubmit = (e) => {
    //prevents default event side-effect from occuring when submitting form
    e.preventDefault();
    const form = {
     date: this.state.date,
     beneficiary: this.state.beneficiary,
     fromAccount: this.state.fromAccount,
     amount: this.state.amount,
     ref: this.state.ref
    }
   }

  //handles change of state when data is enterd to form
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
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
  //Render the forms and controll values entered into forms
  render() {
    return (
      <Fragment>
        <div class="login-form">

          <form onSubmit={this.handleSubmit}>
            <h2 class="text-center">Make Future Dated Payment</h2>
            <div class="form-group">
            <label>Select Date For Future Payment:</label>
              <input
                name="date"
                value={this.state.date}
                onChange={e => this.handleChange(e)}
                type="date"
                class="form-control"
                placeholder="Day to pay each month"
                required="required"/>
            </div>
            <div class="form-group">
              <label>Select Beneficiary (select one):</label>
              {/*Map available beneficiaries*/}
              <select
                name="beneficiary"
                value={this.state.beneficiary}
                onChange={e => this.handleChange(e)}
                ref="userInput"
                defaultValue=""
                required>
                <option value="" disabled>Choose a Beneficiary</option>
                {
                  this.props.beneficiaries.map((person)=> {
                    return <option
                      value={person.name}>{person.name}</option>;
                  })
                }
              </select>
            </div>
            <div class="form-group">
              <label>Select From Account (select one):</label>
              <select
                name="fromAccount"
                value={this.state.fromAccount}
                onChange={e => this.handleChange(e)}
                ref="userInput"
                defaultValue=""
                required>
                <option value="" disabled>Choose a Account</option>
                {/*Map available account*/}
                {
                  this.state.accounts.map((account)=> {
                    return <option key={account._id}
                      value={account.type}>{account.type}</option>;
                  })
                }
              </select>
              {/*Map available balance of account*/}
              {
                this.state.accounts.filter((bal) => bal.type === this.state.fromAccount).map((account)=> (
                  <p key={account._id}>
                        <div>{`Available Balance: R${account.balance}`}</div>
                    </p>
                ))
             }
            </div>
            <div class="form-group">
            {/*can only enter numbers*/}
                <input
                  name="amount"
                  value={this.state.amount}
                  onChange={e => this.handleChange(e)}
                  type="number"
                  pattern="[0-9]*"
                  inputmode="numeric"
                  class="form-control"
                  placeholder="Amount"
                  required="required"/>
            </div>
            <div class="form-group">
                <input
                  name="ref"
                  value={this.state.ref}
                  onChange={e => this.handleChange(e)}
                  type="text"
                  class="form-control"
                  placeholder="Reference"/>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block">Pay and Save</button>
            </div>
          </form>
        </div>
      </Fragment>
    )
  }
}
//export component
export default MakeFuturePayments
