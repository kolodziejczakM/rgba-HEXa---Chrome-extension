
document.addEventListener('DOMContentLoaded', function () {
    const D = document,
          BODY = D.getElementsByTagName('body')[0],
          BTN_ELEMENT = D.getElementById('convert'),
          INPUT_ELEMENT = D.getElementById('hexColor'),
          DELAY_TIME = 1000;
    let currentInputVal = '';

    INPUT_ELEMENT.addEventListener('input', (e) => { currentInputVal = e.target.value; });
    BTN_ELEMENT.addEventListener('click', startConversion);

    function startConversion(e) {
        chrome.tabs.executeScript({
            code: "var inputVal ='" + currentInputVal + "';",
            allFrames: true
        },(outcome) => {
            chrome.tabs.executeScript({file: "./conversion.js", allFrames: true}, (result) => {
                const parsedResult = JSON.parse(result);

                showResult(parsedResult.text);
                copyResultToClipboard(parsedResult.value);
                closePopupAfter(DELAY_TIME);
            });
        });
    }

    function showResult(txt){
        INPUT_ELEMENT.value = txt;
    }

    function closePopupAfter(delayTime = 0){
        setTimeout(() =>{ window.close(); }, delayTime);
    }

    function copyResultToClipboard(text) {
        const TEMP_COPY_SRC = D.createElement('textarea');
              
        TEMP_COPY_SRC.textContent = text; 
        BODY.appendChild(TEMP_COPY_SRC);
        TEMP_COPY_SRC.select();
        D.execCommand('copy');
        BODY.removeChild(TEMP_COPY_SRC);
    }

});

