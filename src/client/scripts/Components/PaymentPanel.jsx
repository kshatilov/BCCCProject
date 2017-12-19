import React from 'react';
import {bonds} from 'oo7-parity';
import {AccountLabel, InputBond, HashBond, BButon} from 'parity-reactive-ui';

export class PaymentPanel extends React.Component {
    constructor() {
        super();
        this.config = [
            {
                label: "Payer",
                field: "payer",
                input: false,
                children:
                    <div>
                        <span className="marg"/>
                        <AccountLabel  address={bonds.me}/>
                    </div>
            },
            {
                label: "Receiver",
                input: true,
                field: "receiver"
            },
            {
                label: "Amount",
                field: "amount",
                input: true,
                className: "deposit-input",
                children: <button className="deposit-button" onClick={this.proceedPayment}>pay</button>
            }
        ];
    }

    proceedPayment = () => {
        const {receiver, amount} = this.state;
        bonds.post({to: receiver, value: amount});
    };

    componentWillMount() {
        const {payer, receiver, amount} = this.props;
        this.setState({payer, receiver, amount: amount || "100"});
    }

    handleStateChange(event, field) {
        this.setState({[field]: event.target.value});
    }

    render() {

        return (
            <div className="accounts-info-container">
                <div className="account-info-block">
                    <div className="account-header">PAYMENT</div>
                    {this.config.map(
                        (c) => {
                            return (
                                <div key={c.label}>
                                    <div className="account-label">{c.label}</div>
                                    {c.input && <input
                                        className={`account-input ${c.className}`}
                                        value={this.state[c.field]}
                                        id={`pp-${c.field}`}
                                        onChange={(e) => this.handleStateChange(e, c.field)}
                                    />}
                                    {c.children}
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
        );

    }
}
