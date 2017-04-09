
document.addEventListener('DOMContentLoaded', function () {
  
    const D = document,
          BTN_ELEMENT = D.getElementById('convert'),
          INPUT_ELEMENT = D.getElementById('hex-color'),
          DELAY_TIME = 800;
    
    let currentInputVal = '';

    INPUT_ELEMENT.addEventListener('input', (e) => { currentInputVal = e.target.value; });
    BTN_ELEMENT.addEventListener('click', startConversion);

    function startConversion(e) {
        inputVal = currentInputVal;
        chrome.tabs.executeScript({
            code: "var inputVal ='" + currentInputVal + "';",
            allFrames: true
        },(outcome) => {
           chrome.tabs.executeScript({file: "./conversion.js", allFrames: false}, (result) => {
                INPUT_ELEMENT.value = result;
                closePopupAfter(DELAY_TIME);
           });
       });
    }

    function closePopupAfter(delayTime = 0){
        setTimeout(() =>{ window.close(); }, delayTime);
    }

});

