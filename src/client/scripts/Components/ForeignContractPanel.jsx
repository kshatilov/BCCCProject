import React from 'react';
import {Bond} from 'oo7';
import {Rspan, Hash} from 'oo7-react';
import {bonds, formatBalance, GitHubHintABI} from 'oo7-parity';
import {AccountLabel, InputBond, HashBond, BButon, InlineBalance} from 'parity-reactive-ui';

export class ForeignContractPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            withdrawAmount: 100
        };

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
        this.setState({contract});
        this.contract = bonds.makeContract(contract.address, contract.abi);
    }

    handleStateChange(event, field) {
        this.setState({[field]: event.target.value});
    }

    withdrawTrigger = () => {
        bonds.me.then(e => {
            this.contract.transfer(e, this.state.withdrawAmount, false);
        });
    };

    render() {
        const {contract} = this.state;
        console.log(this.contract);
        return (
            <div className="accounts-info-container">
                <div className="account-header">{contract.name}</div>
                <div className="account-info-block">

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

                    {/*EVENT LIST*/}
                    {/*TODO map*/}
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

                    <div className="account-label">transferred</div>
                    <Rspan className="account-rspan">{
                        this.contract.Transfer().map(e => {
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


                    <div className="account-label">withdrawn</div>
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