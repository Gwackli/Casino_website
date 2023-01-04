const { stringify } = require("querystring");


var betType = 0;
var betValue = 0;
/*
1: lower(1) higher(2)
2: black(1) or red(2)
3: odd(1) or even(2)
4: lower(1) or middle(2) or higher(3)
5: exact number (1-36)
*/
var address = "0x0000000000000000000000000000000000000000"

function updateBet() {
    message = "";
    if (betType == 0) {
        message = "No bet!";
    }
    else if (betType == 1) {
        message = "Mode: Lower or Higher bet on: ";
        if (betValue == 1) {
            message += "lower";
        }
        else {
            message += "higher";
        }
    }
    else if (betType == 2) {
        message = "Mode: Black or Red bet on: ";
        if (betValue == 1) {
            message += "black";
        }
        else {
            message += "red";
        }
    }
    else if (betType == 3) {
        message = "Mode: Odd or Even bet on: ";
        if (betValue == 1) {
            message += "Odd";
        }
        else {
            message += "Even";
        }
    }
    else if (betType == 4) {
        message = "Mode: lower, middle, higher bet on: ";
        if (betValue == 1) {
            message += "lower";
        }
        else if (betValue == 2) {
            message += "middle";
        }
        else {
            message += "higher";
        }
    }
    else if (betType == 5) {
        message = "Mode: exact number bet on: ";
        message += betValue;
    }

    document.getElementById("betType").textContent = message;

}


function lowerOrHigher(higher) {
    betType = 1;
    if (higher == 0) {
        console.log("Lower");
        betValue = 1;
    }
    else {
        console.log("Higher");
        betValue = 2;
    }
    updateBet();
}

function blackOrRed(red) {
    betType = 2;
    if (red == 0) {
        console.log("black");
        betValue = 1;
    }
    else {
        console.log("red");
        betValue = 2;
    }
    updateBet();
}

function oddOrEven(odd) {
    betType = 3;
    if (odd == 0) {
        console.log("even");
        betValue = 1;
    }
    else {
        console.log("odd");
        betValue = 2;
    }
    updateBet();
}

function lowerMiddleHigher(num) {
    betType = 4;
    if (num == 0) {
        console.log("Lower");
        betValue = 1;
    }
    else if (num == 1) {
        console.log("middle");
        betValue = 2;
    }
    else {
        console.log("higher");
        betValue = 3;
    }
    updateBet();
}

function exactNumber(num) {
    betType = 5;
    betValue = num
    updateBet();
}


function random(num) {
    if (num == 0) { //always
        address = "0x156B03A252689861E3aC9307f359608720DBF409"
    }
    else if (num == 1) { //random
        address = "0x5dB3eE642937932dC930f588ee128F52A9641eDb"
    }
    else if (num == 3) { //offline always win
        address = "0xED7c57D4049F947D2c31e22Be5DF50d33c603807"
    }
    console.log(address)
}

function getRange() {
    if (betType >= 1 && betType <= 3) {
        return 2;
    }
    else if (betType == 4) {
        return 3;
    }
    else if (betType == 5) {
        return 36;
    }
    else {
        return 0;
    }
}



async function checkWin() {
    document.getElementById("checkWin").textContent = "wait, I'm looking if you won";
    var values = await bundle.getInfosOfBet();
    console.log(values)
    var betBlock = values[0]
    var betRange = values[1]
    var betNumber = values[2]
    var betAmount = values[3]
    betBlock = "1D1F45E"
    const response = await fetch("https://polygon-mumbai.g.alchemy.com/v2/4YSvn6vwg5ZTIx9IV6YVKS3IiJakB-o9", {
        method: 'POST',
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // },
        body: `{
            "jsonrpc":"2.0",
            "method":"eth_getBlockByNumber",
            "params":["0x${betBlock}", true],
            "id":0
            }`,
    });

    const json = await response.json();
    var hash = json["result"]["hash"]
    console.log(hash)

    keccak = await bundle.getKeccakHash(hash);
    console.log(keccak)
}

