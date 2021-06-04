const userInput = document.getElementById('hexInput');
const inputColorContainer = document.getElementById('inputColor');
const alteredColorContainer = document.getElementById('alteredColor');
const percentageText = document.getElementById('percentageText');
const percentageBar = document.getElementById('percentageBar');

// check if the user input is vailed 
const isVaildHex = (hex) => {
    if(!hex) return false;

    const strippedHex = hex.replace('#', '');

    return strippedHex.length === 3 || strippedHex.length === 6;
};

// manipulate user input color
userInput.addEventListener('keyup', ()=> {
 
    if(!isVaildHex(userInput.value)) return;

    const userInputHexValue = userInput.value.replace('', '#');
    inputColorContainer.style.backgroundColor = userInputHexValue;
});


// update the number after user adjust the range bar

percentageBar.addEventListener('input', () => {

    percentageText.innerText = `${percentageBar.value}%`
});


// hex to rgb function

const hexToRGB = (hex) => {


    // 세글자이거나 여섯글자 
    // 세글자인경우 각 자리수를 한번 씩 중복
    // 여섯글자인 경우 그대로 냅둠
    // 각 두자리를 255인 숫자로 표현
    const hexValue = hex.length === 6? hex : 
    hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];

    const RGBObj = {};

    RGBObj.r = hexValue[0] * 16 + hexValue[1];
    console.log(RGBObj.r);
    return RGBObj;

};

hexToRGB('111');