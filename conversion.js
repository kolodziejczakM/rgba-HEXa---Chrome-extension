
(function(){

    const UNIT_TESTS_ON = false;

    const HEX_COLOR = String(inputVal),
          HEX_VAL = HEX_COLOR.slice(1),
          RESULT_MODEL = {text: '', value: ''},
          INT8_MAX = 255,
          HEX_VALID_REGXP = /^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{3})$/g,
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
            T.expect(JSON.parse(convertToRGBA(T.given[0].slice(1))).value).toEqual(T.expected[0]),
            T.expect(JSON.parse(convertToRGBA(T.given[1].slice(1))).value).toEqual(T.expected[1])
        ];
        console.info(MSG.testStatus, T.allPassed(ASSERTIONS));
    }

    if (HEX_COLOR.length > 0) { 
        return (HEX_COLOR.search(HEX_VALID_REGXP) !== -1) ? convertToRGBA(HEX_VAL) : errHandler(ERR_MSG.format);
    }else {
        return errHandler(ERR_MSG.emptyField);
    }

    function convertToRGBA(hexV){
        const result = Object.assign({}, RESULT_MODEL);
        let redC, greenC, blueC, alphaC;

        [redC, greenC, blueC, alphaC] = [
            hexV.slice(0,2), 
            hexV.slice(2,4), 
            hexV.slice(4,6), 
            hexV.slice(6)].map(rgbaPart =>{ return parseInt(rgbaPart,16); });
            
        alphaC =  (Number(alphaC) / INT8_MAX).toFixed(2);
        
        result.value = `rgba(${redC},${greenC},${blueC},${alphaC})`;
        result.text = MSG.copied;
        return JSON.stringify(result);
    }

    function errHandler(reason = ERR_MSG.emptyField, resObj = Object.assign({}, RESULT_MODEL)){
        resObj.value = reason;
        resObj.text = reason;
        return JSON.stringify(resObj);
    }
    
})();

