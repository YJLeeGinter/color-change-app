const userInput = document.getElementById('hexInput');
const inputColorContainer = document.getElementById('inputColor');
const alteredColorContainer = document.getElementById('alteredColor');
const percentageText = document.getElementById('percentageText');
const percentageBar = document.getElementById('percentageBar');
const toggleBtnContainer = document.querySelector('.toggle-container');
const toggleBtnBall = document.querySelector('.btn');

toggleBtnContainer.addEventListener('click', ()=>{

toggleBtnBall.classList.add('toggled')
});

// check if the user input is vailed 
const isVaildHex = (hex) => {
    if(!hex) return false;

    const strippedHex = hex.replace('#', '');

    return strippedHex.length === 3 || strippedHex.length === 6;
};

// manipulate user input color
userInput.addEventListener('keyup', ()=> {
 
    if(!isVaildHex(userInput.value)) return;

    const userInputHexValue = userInput.value.replace('#', '');
    inputColorContainer.style.backgroundColor = '#' + userInputHexValue;
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

    RGBObj.r = parseInt(hexValue[0]+hexValue[1] , 16);
    RGBObj.g = parseInt(hexValue[2]+hexValue[3] , 16);
    RGBObj.b = parseInt(hexValue[4]+hexValue[5] , 16);

    return RGBObj;

};

const RGBToHex = (RGBObj) => {

 //object를 받아서 
 // each property to hex
 // combine them
 // return them

 let RToHex = RGBObj.r.toString(16);
 if(RToHex.length === 1) RToHex = 0 + RToHex;

 let GToHex = RGBObj.g.toString(16);
 if(GToHex.length === 1) GToHex = 0 + GToHex;

 let BToHex = RGBObj.b.toString(16);
 if(BToHex.length === 1) BToHex = 0 + BToHex;

 return RToHex + GToHex + BToHex;

}


const changeColor = (RGBObj, inputValue) => {
    const alteredRGBObj = {};
    alteredRGBObj.r = RGBObj.r + (inputValue/100) * 255;
    alteredRGBObj.g = RGBObj.g + (inputValue/100) * 255;
    alteredRGBObj.b = RGBObj.b + (inputValue/100) * 255;

    const alteredHexColor = RGBToHex(alteredRGBObj);
    console.log('just checking');
    alteredColorContainer.style.backgroundColor = '#' + alteredHexColor;
}

// update the number after user adjust the range bar

percentageBar.addEventListener('input', () => {

    percentageText.innerText = `${percentageBar.value}%`
    const rgbColor = hexToRGB(userInput.value);
    changeColor(rgbColor, percentageBar.value);
});
