
var betType = 0;
var betValue = 0;
/*
1: lower(1) higher(2)
2: black(1) or red(2)
3: odd(1) or even(2)
4: lower(1) or middle(2) or higher(3)
*/



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
}

function getRange() {
    if (betType >= 1 && betType <= 3) {
        return 2;
    }
    else if (betType == 4) {
        return 3;
    }
    else {
        return 0;
    }
}