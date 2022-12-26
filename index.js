const { ethers } = require("ethers");
const provider = new ethers.providers.Web3Provider(window.ethereum)


var abi = require('./data');


async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        document.getElementById("connectButton").innerHTML = "Connected"
    }
}

async function bet() {
    if (typeof window.ethereum !== "undefined") {
        const address = "0xED7c57D4049F947D2c31e22Be5DF50d33c603807"
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, abi, signer)
        try {
            //await contract.send_win("0x57e37d04D3FdDF41987C518F5E5593Cf70309362", "1000000000000000000");
            await contract.place_bet(1, 1, { value: ethers.utils.parseEther("1") });
        } catch (error) {
            console.log(error);
        }

    }
}

module.exports = {
    connect, bet,
};
