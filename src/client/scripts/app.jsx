import "../styles/main.css"

import React from 'react';
import {AccountPanel} from "./Components/AccountPanel";
import {HomeContractPanel} from "./Components/HomeContractPanel";
import {PaymentPanel} from "./Components/PaymentPanel";
import {ForeignContractPanel} from "./Components/ForeignContractPanel";
import config from "../config.json"
import {AccountLabel, InputBond, HashBond, BButon, InlineBalance, Transaction} from 'parity-reactive-ui';

export class App extends React.Component {
    constructor() {
        super();
        const {home_accounts, foreign_accounts, home_contract, foreign_contract} = config;

        this.state = {
            home_accounts,
            foreign_accounts,
            foreign_contract,
            home_contract
        };
    }

    render() {

        const {foreign_accounts, home_accounts, foreign_contract, home_contract} = this.state;

        return (
            <div className="home-network-container">

                <div>HOME NETWORK</div>
                <AccountPanel accounts={home_accounts}/>
                <PaymentPanel receiver={home_accounts[0]}/>
                <HomeContractPanel contract={home_contract}/>


                <div style={{marginTop: "24px"}}>FOREIGN NETWORK</div>
                <AccountPanel accounts={foreign_accounts}/>
                <ForeignContractPanel contract={foreign_contract}/>

                <Transaction hash={"25c58676485243974a2573187cf5729fe78914d78a86ee4b8423bac4c6deaee9"}/>
            </div>
        );
    }
}
