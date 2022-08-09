import Web3 from "web3";

class Web3Helper {
    async connectWallet() {
        try {
            if (!window.ethereum) return alert("Install Metamask");

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            console.log("[1_CONNECT]: ", accounts[0]);
            const web3 = new Web3(window.ethereum);
            return web3;
        } catch (e) {
            console.error(e);
            throw new Error("[ERR] No window.ethereum object");
        }
    }

    async getNetwork(web3) {
        const network = await web3.eth.net.getNetworkType();
        return network;
    }

    async getAccount(web3) {
        const accounts = await web3.eth.getAccounts();
        return accounts[0];
    }

    async getBalance(web3, account) {
        const balanceWei = await web3.eth.getBalance(account);
        const balance = web3.utils.fromWei(balanceWei, "ether");
        return balance;
    }
}

const web3Helper = new Web3Helper();

export default web3Helper;
