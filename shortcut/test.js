/* ===========================================================
 * Hotkey function
 * Copyright 2015 letrongloi, BrightsVietNam.
 * ===========================================================
 */

var _KEYFunction = {
    // Description
    view_detail : function( param ) {
        console.log(param);
    },

    // Description
    exit_screen : function( param ) {
        alert(param);
    },

    // ... More
};

///abc
function _KEYSettings( key_param ) {

    if(typeof(key_param) === 'string') {
        alert('String');
        return false;
    } else if(typeof(key_param) === 'object') {
        $.each(key_param, function(key, value) {
            $(document).bind('keydown', key, function(){
                _KEYFunction[value['function_nm']](value['param']); 
                return false;
            });
        });
    }  

}

jQuery(document).ready(_KEYSettings);