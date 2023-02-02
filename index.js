const { Console } = require("console");
const { ethers } = require("ethers");
const { getSystemErrorMap } = require("util");
const provider = new ethers.providers.Web3Provider(window.ethereum)


var abi = require('./data');

// Funktion um zum Metamask zu verbinden
async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        // Wenn verbunden, dann Text zu "connected" ändern
        document.getElementById("connectButton").textContent = "Connected"
    }
}

// Das erstellen der Wette
async function bet() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        console.log(address)
        const contract = new ethers.Contract(address, abi, signer)

        // Range anfragen vom Bettype
        const range = getRange()
        //Nur wenn eine Einstellung für eine Wette getroffen wurde
        if (range != 0) {
            console.log(range);
            console.log(betValue);
            // Wettbetrag auslesen
            var amount = document.getElementById("amount").value;
            console.log(amount);
            try {
                // number, range
                // Das effektive erstellen der Wette als Transaktion und an Metamask übertragen
                await contract.place_bet(betValue, range, { value: ethers.utils.parseEther(amount) });
                document.getElementById("checkWin").textContent = "Du musst Claim drücken um zu wissen ob du gewonnen hast (zuerst ein paar Sekunden warten";
            } catch (error) {
                console.log(error);
            }
        }

    }
}


// Funktion um den Gewinn abzuholen
async function claim() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, abi, signer)
        try {
            // Aufrufen der Smart-Contract funktion
            await contract.claim();
        } catch (error) {
            console.log(error);
            document.getElementById("checkWin").textContent = "Du hast leider nicht gewonnen";
        }

    }
}

// Funktion um die letzte Wette auszulesen
// Gibt die gespeicherten WErte zurück: blocknummer, betRange, betNumber, betValue
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

// Funktion um den Keccak256 Hashing algorithumus anzuewenden
async function getKeccakHash(block_hash) {
    var pack = ethers.utils.solidityPack(["string"], [block_hash]);
    var keccak = ethers.utils.solidityKeccak256(["string"], [pack]);
    return keccak;
}

// wird für bundle.js verwendet
// welche funktionen gebundlet werden müssen
module.exports = {
    connect, bet, claim, getInfosOfBet, getKeccakHash,
};
