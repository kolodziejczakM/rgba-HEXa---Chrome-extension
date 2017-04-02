
(function(){
   
    const UNIT_TESTS_ON = false;

    const HEX_COLOR = String(inputVal),
          HEX_VAL = HEX_COLOR.slice(1),
          RESULT_MODEL = {text: '', value: ''},
          INT8_MAX = 255,
          HEX_VALID_REGXP = /^#([A-Fa-f0-9]{8})$/g,
          ERR_MSG = {
            format: 'Error: invalid format',
            emptyField: 'Error: lack of value'
          },
          MSG = {
            copied: 'Copied to clipboard!',
            testStatus: 'Unit tests passed: '
          };
   
    const TEST_ENV = {
        given: ['#00ff0080', '#0d102459'],
        expected: ['rgba(0,255,0,0.50)','rgba(13,16,36,0.35)'],
        expect(givenValue){
            return { toEqual(expectedValue){ return givenValue === expectedValue; } };
        },
        allPassed(testsArray) {
            return testsArray.every(val => val);
        }
    };

    if(UNIT_TESTS_ON){
        const T = TEST_ENV;
        const ASSERTIONS = [
            T.expect(convertToRGBA(T.given[0].slice(1)).value).toEqual(T.expected[0]),
            T.expect(convertToRGBA(T.given[1].slice(1)).value).toEqual(T.expected[1])
        ];
        console.info(MSG.testStatus, T.allPassed(ASSERTIONS));
    }

    if (isInputEmpty()){ 
        return sendTextToPopup(errHandler(ERR_MSG.emptyField));
    }else {       
        if(isValidHex()){
            const result = convertToRGBA(HEX_VAL);
            copyResultToClipboard(result.value);
            return sendTextToPopup(result.text);
        }else {
            return sendTextToPopup(errHandler(ERR_MSG.format));
        }
    }

    function convertToRGBA(hexV){
        const result = Object.assign({}, RESULT_MODEL);
        let redC, greenC, blueC, alphaC;

        [redC, greenC, blueC, alphaC] = [
            hexV.slice(0,2), 
            hexV.slice(2,4), 
            hexV.slice(4,6), 
            hexV.slice(6)].map(rgbaPart =>{ return parseInt(rgbaPart, 16); });
        
        alphaC =  (alphaC / INT8_MAX).toFixed(2);

        [result.value, result.text] = [`rgba(${redC},${greenC},${blueC},${alphaC})`, MSG.copied];
        return result;
    }

    function isInputEmpty(){
        return HEX_COLOR.length === 0;
    }

    function isValidHex(){
        return HEX_COLOR.search(HEX_VALID_REGXP) !== -1;
    }

    function sendTextToPopup(srcText){
        return srcText;
    }

    function copyResultToClipboard(text) {
        const D = document,
              BODY = D.getElementsByTagName('BODY')[0],
              TEMP_COPY_SRC = D.createElement('textarea');
              
        TEMP_COPY_SRC.textContent = text; 
        BODY.appendChild(TEMP_COPY_SRC);
        TEMP_COPY_SRC.select();
        D.execCommand('copy');
        BODY.removeChild(TEMP_COPY_SRC);
    }

    function errHandler(reason = ERR_MSG.emptyField){
        return reason;
    }
    
})();

