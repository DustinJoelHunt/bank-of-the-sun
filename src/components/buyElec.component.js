//necessary imports for the page
import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import axios from "axios";
import "../css/buy.css"

class BuyElec extends Component {
  //set initial states for form data to save in
  constructor(props) {
      super(props);
      this.state = {
        accounts: [],
        meterNr: '',
        amount: '',
        fromAccount: '',
        phoneNr: ''
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
     beneficiary: this.state.beneficiary,
     fromAccount: this.state.fromAccount,
     amount: this.state.amount
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

  render() {
    return (
      <Fragment>
        <div class="login-form">
          <form onSubmit={this.handleSubmit}>
            <h2 class="text-center">Buy Electricity</h2>
            <div class="form-group">
                <input
                  name="meterNr"
                  pattern="[0-9]*"
                  inputmode="numeric"
                  value={this.state.meterNr}
                  onChange={e => this.handleChange(e)}
                  type="number"
                  class="form-control"
                  placeholder="Meter Number"
                  required="required"/>
            </div>
            <div class="form-group">
            {/*can only enter numbers*/}
                <input
                  name="amount"
                  pattern="[0-9]*"
                  inputmode="numeric"
                  value={this.state.amount}
                  onChange={e => this.handleChange(e)}
                  type="number"
                  class="form-control"
                  placeholder="Amount"
                  required="required"/>
            </div>
            <div class="form-group">
            {/*show available accounts and balance*/}
              <label>Select From Account (select one):</label>
              <select
                name="fromAccount"
                value={this.state.fromAccount}
                onChange={e => this.handleChange(e)}
                ref="userInput"
                defaultValue=""
                required>
                <option value="" disabled>Choose a Account</option>
                {
                  this.state.accounts.map((account)=> {
                    return <option key={account._id}
                      value={account.type}>{account.type}</option>;
                  })
                }
              </select>
              {/*filters ba;ance to account chosen*/}
              {
                this.state.accounts.filter((bal) => bal.type === this.state.fromAccount).map((account)=> (
                  <p key={account._id}>
                        <div>{`Available Balance: R${account.balance}`}</div>
                    </p>
                ))
             }
            </div>
            <div class="form-group">
                <input
                  name="phoneNr"
                  pattern="[0-9]*"
                  inputmode="numeric"
                  value={this.state.phoneNr}
                  onChange={e => this.handleChange(e)}
                  type="number"
                  class="form-control"
                  placeholder="Phone Number"
                  required="required"/>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block">Buy</button>
            </div>
          </form>
        </div>
      </Fragment>
    )
  }
}

export default BuyElec
