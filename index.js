const { Console } = require("console");
const { ethers } = require("ethers");
const { getSystemErrorMap } = require("util");
const provider = new ethers.providers.Web3Provider(window.ethereum)


var abi = require('./data');


async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        document.getElementById("connectButton").textContent = "Connected"
    }
}

async function bet() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        console.log(address)
        const contract = new ethers.Contract(address, abi, signer)

        const range = getRange()
        //Only if there is a bet setting
        if (range != 0) {
            console.log(range);
            console.log(betValue);

            try {
                //await contract.send_win("0x57e37d04D3FdDF41987C518F5E5593Cf70309362", "1000000000000000000");
                // number, range
                await contract.place_bet(betValue, range, { value: ethers.utils.parseEther("1") });
            } catch (error) {
                console.log(error);
            }
        }

    }
}

async function claim() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, abi, signer)
        try {
            //await contract.send_win("0x57e37d04D3FdDF41987C518F5E5593Cf70309362", "1000000000000000000");
            await contract.claim();
        } catch (error) {
            console.log(error);
        }

    }
}

module.exports = {
    connect, bet, claim,
};
