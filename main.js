/**
 * @license main.js v0.0.1
 * (c) 2019-2020 Sincosoft, Inc. http://sinco.com.co
 * 
 * Creation date: 29/11/2019
 * Last change: 29/11/2019
 *
 * by GoldenBerry
 *
 * Needed references:
 *      - s5.js
**/

window['sinco-app'].define('special-dates/main', [], function() {
    var _urlScript = document.currentScript.src.split('/');
    _urlScript.pop();
    _urlScript = _urlScript.join('/');

    var extractDate = function(dates) {
        var _today = new Date();
        var day = _today.getDate();
        var month = _today.getMonth();
        return dates.find(function(date) {
            return date.month == (month + 1) && date.day.from <= day && date.day.to >= day;
        });
    };

    var _start = function(){
        Sinco.Request('GET', _urlScript + "/dates.json", {
            Ok: function (dates) {
                var date = extractDate(dates);
                if (date) {
                    window['specialDates'] = Sinco.initialize(null, null, _urlScript);
                    window['specialDates'].require([date.module], function (modulo) {
                        modulo.start();
                    });
                }
            }
        });
    };

    return {
        start: _start
    };
});