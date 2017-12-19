import React from 'react';
import {Bond} from 'oo7';
import {Rspan, Hash} from 'oo7-react';
import {bonds, formatBalance, GitHubHintABI} from 'oo7-parity';
import {AccountLabel, InputBond, HashBond, BButon, InlineBalance} from 'parity-reactive-ui';

export class HomeContractPanel extends React.Component {
    constructor() {
        super();

        this.config = [
            {
                label: "Actor",
                input: false,
                children:
                    <div>
                        <span className="marg"/>
                        <AccountLabel  address={bonds.me}/>
                    </div>
            },
            {
                label: "To deposit",
                field: "depositAmount",
                input: true,
                className: "deposit-input",
                children: <button className="deposit-button" onClick={this.depositTrigger}>lock</button>
            },
            {
                label: "To withdraw",
                field: "withdrawAmount",
                input: true,
                className: "deposit-input",
                children: <button className="deposit-button" onClick={this.withdrawTrigger}>unlock</button>
            }
        ];
    }

    componentWillMount() {
        const {contract} = this.props;
        this.setState({contract, depositAmount: "100", withdrawAmount: "100"});
        this.contract = bonds.makeContract(contract.address, contract.abi);
    }

    handleStateChange(event, field) {
        this.setState({[field]: event.target.value});
    }

    depositTrigger = () => {
        const {contract, depositAmount} = this.state;
        bonds.post({to: contract.address, value: depositAmount});
    };

    withdrawTrigger = () => {
        bonds.me.log();
        console.log(this.contract);
        bonds.me.then(e => {
            this.contract.withdraw(e, this.state.withdrawAmount);
            console.log(e);
        });
    };

    render() {
        return (
            <div className="accounts-info-container">
                <div className="account-info-block">
                    <div className="account-header">{this.state.contract.name}</div>
                    {this.config.map(
                        (c) => {
                            return (
                                <div key={c.label}>
                                    <div className="account-label">{c.label}</div>
                                    {c.input && <input
                                        className={`account-input ${c.className}`}
                                        value={this.state[c.field]}
                                        id={`hcp-${c.field}`}
                                        onChange={(e) => this.handleStateChange(e, c.field)}
                                    />}
                                    {c.children}
                                </div>
                            )
                        }
                    )}
                    <div className="account-label">locked</div>
                    <Rspan className="account-rspan">{
                        this.contract.Deposit().map(e => {
                            return e.map(
                                c => {
                                    return (
                                        <div>
                                            <AccountLabel address={c.recipient}/>
                                            <InlineBalance value={c.value}/>
                                        </div>
                                    );
                                }
                            )
                        })

                    }
                    </Rspan>

                    <div className="account-label">unlocked</div>
                    <Rspan className="account-rspan">{
                        this.contract.Withdraw().map(e => {
                            return e.map(
                                c => {
                                    return (
                                        <div>
                                            <AccountLabel address={c.recipient}/>
                                            <InlineBalance value={c.value}/>
                                        </div>
                                    );
                                }
                            )
                        })

                    }
                    </Rspan>
                </div>
            </div>
        );
    }
}