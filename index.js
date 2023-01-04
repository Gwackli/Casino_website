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
            var amount = document.getElementById("amount").value;
            console.log(amount);
            //amount = "1";
            try {
                //await contract.send_win("0x57e37d04D3FdDF41987C518F5E5593Cf70309362", "1000000000000000000");
                // number, range
                await contract.place_bet(betValue, range, { value: ethers.utils.parseEther(amount) });
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

const hexToDecimal = hex => parseInt(hex, 16);

async function getInfosOfBet() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        const my_address = ethereum.selectedAddress;
        const contract = new ethers.Contract(address, abi, signer)
        try {
            var block = await contract.block_numbers(my_address);
            //block = hexToDecimal(block["_hex"]);
            var bet_range = await contract.bet_range(my_address);
            bet_range = hexToDecimal(bet_range["_hex"]);
            var bet_number = await contract.bet_numbers(my_address);
            bet_number = hexToDecimal(bet_number["_hex"]);
            var bet_value = await contract.bet_values(my_address);
            bet_value = hexToDecimal(bet_value["_hex"]);


            console.log(block)
            console.log(bet_range)
            console.log(bet_number)
            console.log(bet_value)

            return [block, bet_range, bet_number, bet_value];

        } catch (error) {
            console.log(error);
        }

    }
}

async function getKeccakHash(block_hash) {
    var pack = ethers.utils.solidityPack(["string"], [block_hash]);
    var keccak = ethers.utils.solidityKeccak256(["string"], [pack]);
    return keccak;
}

module.exports = {
    connect, bet, claim, getInfosOfBet, getKeccakHash,
};
