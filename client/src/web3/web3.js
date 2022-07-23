import Web3 from "web3";

class Web3Helper {
    constructor() {
        this.web3 = null;
        this.network = null;
        this.accounts = null;
        this.balance = null;
    }

    async connectWallet() {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        this.web3 = new Web3(window.ethereum);
    }

    async refresh() {
        this.network = await this.web3.eth.net.getNetworkType();
        this.accounts = await this.web3.eth.getAccounts();
        let balanceWei = await this.web3.eth.getBalance(this.accounts[0]);
        this.balance = this.web3.utils.fromWei(balanceWei, "ether");
    }
}

const web3Helper = new Web3Helper();

export default web3Helper;
