const userInput = document.getElementById('hexInput');
const inputColorContainer = document.getElementById('inputColor');
const alteredColorContainer = document.getElementById('alteredColor');
const percentageText = document.getElementById('percentageText');
const percentageBar = document.getElementById('percentageBar');
const toggleBtnContainer = document.querySelector('.toggle-container');
const toggleBtnBall = document.querySelector('.btn');


const reset = () => {
    alteredColorContainer.style.backgroundColor = '#' + userInput.value;
    percentageBar.value = 0;
    percentageText.innerText = '0%';

};

toggleBtnContainer.addEventListener('click', ()=>{

    reset();
    if(toggleBtnBall.classList.contains('toggled')){
        toggleBtnBall.classList.remove('toggled');
        
    }else{
        toggleBtnBall.classList.add('toggled');
    }
});

// check if the user input is vailed 
const isVaildHex = (hex) => {
    if(!hex) return null;

    const strippedHex = hex.replace('#', '');

    return strippedHex.length === 3 || strippedHex.length === 6;
};

// manipulate user input color
userInput.addEventListener('keyup', ()=> {
 
    if(!isVaildHex(userInput.value)) return;

    const userInputHexValue = userInput.value.replace('#', '');
    inputColorContainer.style.backgroundColor = '#' + userInputHexValue;
    reset();
});


// hex to rgb function
const hexToRGB = (hex) => {

    if(!hex) return;

    // 세글자이거나 여섯글자 
    // 세글자인경우 각 자리수를 한번 씩 중복
    // 여섯글자인 경우 그대로 냅둠
    // 각 두자리를 255인 숫자로 표현
    const hexValue = hex.length === 6? hex : 
    hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];

    const RGBObj = {};

    RGBObj.r = parseInt(hexValue.substring(0,2) , 16);
    RGBObj.g = parseInt(hexValue.substring(2,4) , 16);
    RGBObj.b = parseInt(hexValue.substring(4,6) , 16);

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

const changeColor = (hex, howMuchInput) => {

    const amount = Math.floor((howMuchInput/100) * 255);
    console.log(amount);
    const RGBObj = hexToRGB(hex);

    RGBObj.r = limitIncreasedAmount(RGBObj.r, amount);
    RGBObj.g = limitIncreasedAmount(RGBObj.g, amount);
    RGBObj.b = limitIncreasedAmount(RGBObj.b, amount);
    console.log(RGBObj);

    const alteredHexColor = RGBToHex(RGBObj);
    return alteredHexColor;
}

const limitIncreasedAmount = (hex, amount) => {
    return Math.min(255, Math.max(0, hex + amount));
} 

// update the number after user adjust the range bar

percentageBar.addEventListener('input', () => {
    if(!isVaildHex(userInput.value)) return;

    percentageText.innerText = `${percentageBar.value}%`;

    const howMuchInput = toggleBtnBall.classList.contains('toggled')?
    -percentageBar.value : percentageBar.value; 
    
    const alteredHexColor = changeColor(userInput.value, howMuchInput);
    alteredColorContainer.style.backgroundColor = '#' + alteredHexColor;

});
