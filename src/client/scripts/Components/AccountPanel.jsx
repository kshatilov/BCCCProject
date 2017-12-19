import React from 'react';
import {Rspan} from 'oo7-react';
import {bonds} from 'oo7-parity';
import {AccountLabel} from 'parity-reactive-ui';

export class AccountPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            accounts: []
        }
    }

    componentWillMount() {
        const {accounts} = this.props;
        this.setState({accounts});
    }


    handleAccountInput(event, index) {
        const accounts = this.state.accounts;
        accounts[index] = event.target.value;
        this.setState({accounts});
    };

    render() {

        return (
            <div className="accounts-info-container">
                {
                    this.props.accounts.map((account, i) => {
                        return (
                            <div className="account-info-block" key={`account-info-block${i}`}>
                                <div className="account-header">ACCOUNT {i + 1}</div>
                                <span className="marg"/>
                                <AccountLabel address={this.state.accounts[i]}/>
                                <div className="account-label">Address:</div>
                                <input className="account-input"
                                       type="text"
                                       id={`ap-${i}`}
                                       onChange={(value) => this.handleAccountInput(value, i)}
                                       value={this.state.accounts[i]}/>
                                <div className="account-label">Balance:</div>
                                <Rspan className="account-rspan">
                                    {bonds.balance(this.state.accounts[i]).map((e) =>`${e} Ether`)}
                                </Rspan>
                            </div>)
                    })
                }
            </div>
        );
    }

}