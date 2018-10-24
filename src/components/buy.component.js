import React, {Component, Fragment} from "react";
import Navigation from "./nav.component";
import BuyAirtimeOnceOff from "./buyAirtimeOnceOff.component";
import BuyAirtimeBen from "./buyAirtimeBeneficiary.component";
import BuyElec from "./buyElec.component";
import axios from "axios";
import "../css/buy.css"
import Support from "./support.component";


class Buy extends Component {
    constructor(props) {
        super(props);
        this.state = {accounts: []};
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
                <Navigation clients={this.props.clients}/>
                <h1>Buy</h1>

                <div class="row">

                <div class="col-sm-4">
                  <BuyAirtimeOnceOff clients={this.props.clients} token={this.props.token}/>
                </div>

                <div class="col-sm-4">
                  <BuyAirtimeBen clients={this.props.clients} token={this.props.token}/>
                </div>

                <div class="col-sm-4">
                  <BuyElec clients={this.props.clients} token={this.props.token}/>
                </div>

                </div>
              <Support />
            </Fragment>
        )
    }
}

export default Buy
