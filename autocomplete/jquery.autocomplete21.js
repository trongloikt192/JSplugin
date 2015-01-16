

(function ( $ ) {
    var oData;

    $.fn.autocomplete21 = function( options ) {

        var settings = $.extend({
            source: "",
            input_key: "",
            output_key: "",
            onClick: function( optData ) {}

        }, options );

        if( settings.source === "" ) {
            console.log("error: source empty");
            return false;
        }

        if( settings.input_key === "" || settings.output_key === "" ) {
            return false;
        }

        this.each( function() {

            var INPUT = $(this).find('.autocomplete-input');
            var OUTPUT = $(this).find('.autocomplete-output');

            var ikey = settings.input_key;
            var okey = settings.output_key;

            if( OUTPUT[0].tagName === "INPUT" ) {
                INPUT.focusout(function(){
                    var _self = $(this);
                    var input_val = _self.val();
                    var get_param = new Object;
                    get_param[ikey] = input_val;

                    if( typeof(input_val) === 'undefined' || input_val === "" ) {
                        _self.removeClass('error');
                        _self.removeClass('success');
                        return;
                    }

                    console.log(get_param);
                    console.log(okey);
                    console.log(settings.source);

                    $.getJSON( settings.source, get_param, function( data ) {
                        if( !jQuery.isEmptyObject( data ) ) {
                            if( typeof(data[okey]) !== 'undefined' ) {
                                OUTPUT.val( data[okey] );
                                _self.addClass('success');
                                _self.removeClass('error');
                            }
                        } else {
                            OUTPUT.val('');
                            _self.addClass('error');
                            _self.removeClass('success');
                        }
                    })
                    // .done(function() {
                    //     console.log( "second success" );
                    // })
                    .fail(function() {
                        console.log( "error" );
                        _self.addClass('error');
                        _self.removeClass('success');
                    })
                    // .always(function() {
                    //     console.log( "complete" );
                    // })
                    ;

                });


            } else if( OUTPUT[0].tagName === "SELECT" ) {
                
                INPUT.on('keyup', function(){
                    clearTimeout($.data(this, 'timer'));

                    var _self = $(this);
                    var input_val = _self.val();
                    var get_param = new Object;

                    get_param[ikey] = input_val;

                    console.log('select');
                    console.log(get_param);
                    console.log(okey);
                    console.log(settings.source);

                    if( typeof(input_val) === 'undefined' || input_val === "" ) {
                        return;
                    }

                    $(this).data('timer', setTimeout(function(){
                        // Clear 
                        OUTPUT.html('');

                        $.getJSON( settings.source, get_param, function( data ) {
                            if( !jQuery.isEmptyObject( data ) ) {
                                // Append option to selectbox
                                $.each( data, function( index, value ) {
                                    OUTPUT.append('<option data-index="'+ index +'" data-ikey="'+ value[ikey] +'">'+ value[ikey] + ' | ' + value[okey] +'</option>');
                                });

                                oData = data;

                            } else {
                                OUTPUT.val('');
                                _self.addClass('error');
                                _self.removeClass('success');
                            }
                        })
                        .done(function() {
                            OUTPUT.find('option').on('click', function(){
                                var ikey = $(this).data('ikey');
                                var index = parseInt($(this).data('index'));
                                INPUT.val(ikey);
                                // callback
                                var optData = oData[index];
                                settings.onClick( optData );
                                //
                                // if (typeof callback == 'function') { // make sure the callback is a function
                                //     callback.call(this); // brings the scope to the callback
                                // }
                            });
                        })
                        .fail(function() {
                            console.log( "error" );
                            _self.addClass('error');
                            _self.removeClass('success');
                        })
                        .always(function() {
                            console.log( "complete" );
                        });
                        // ;
                    }, 1000));

                    

                });
            }
            

        });

    };
}( jQuery ));