/* ===========================================================
 * Full width - Half width Convert
 * Copyright 2015 letrongloi, BrightsVietNam.
 * ===========================================================
 *
 * Full to Half
 * <input class="fhconvert" type="text" data-fhconvert="ftoh" />
 *
 * Half to Full
 * <input class="fhconvert" type="text" data-fhconvert="htof" />
 *
 * ========================================================== */

+function ($) { "use strict";

  var isIE = window.navigator.appName == 'Microsoft Internet Explorer'

    $.fn.fhconvert = function() {
        $(this).each(function() {
            var $this = $(this);
            var dataAttr = $this.data('fhconvert');

            if(typeof(dataAttr) === 'undefined') {
                return true;    
            } else {
                $this.val(FHConvert[dataAttr]($this.val()));
            }

        });
        return this;
    };

    var FHConvert = {
        _pattern: {
            ftoh: {range:{start:0xff01,end:0xff5e}, mod:-0xfee0},
            htof: {range:{start:0x0021,end:0x007e}, mod:+0xfee0},

            _jftojh: {convSet:{'\u2019':'\u0027','\u201d':'\u0022','\uffe5':'\u005c'}},
            _jhtojf: {convSet:{'\u0027':'\u2019','\u0022':'\u201d','\u005c':'\uffe5'}},

            _fstohs: {convSet:{'\u3000':'\u0020'}},
            _hstofs: {convSet:{'\u0020':'\u3000'}}
        },

        _convert: function( value, param ) {
            if ( !value || !param ) return value;
            var code, str, idx, len = value.length, newVal = '', strArray = new Array(len);
            for ( idx=0; idx<len; idx++ ) {
                str = value.charAt( idx );
                code = str.charCodeAt(0);
                if ( param['convSet'] && param['convSet'][str]!=null )
                    strArray[idx] = param['convSet'][str];
                else if ( code >= param['range']['start'] && code <= param['range']['end'] )
                    strArray[idx] = String.fromCharCode( code + param['mod'] );
                else
                    strArray[idx] = str;
            }
            return strArray.join('');
        },

        _initConvert: function( id ) {
            var opt = {id:id}, convSet = null;

            if ( this._pattern[id] )
            {
                opt['range'] = this._pattern[id]['range'];
                opt['mod'] = this._pattern[id]['mod'];
            }
            return opt;
        },

        ftoh: function( value ) {
            return this._convert( value, this._initConvert('ftoh') );
        },
        htof: function( value ) {
            return this._convert( value, this._initConvert('htof') );
        },
    };

    $(function() {
        $('.widthfhconvert').each(function() {
            var $this = $(this);
            if($this[0].tagName === 'INPUT') {
                $this.focusout(function() {
                    $(this).fhconvert();
                });
            } else {
                $input = $this.find('input');
                $input.data('fhconvert', $this.data('fhconvert'));
                
                $input.focusout(function() {
                    $(this).fhconvert();
                });
            }
        });
    });

}(window.jQuery);