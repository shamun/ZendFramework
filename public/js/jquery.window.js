/**
 * !@_window how to use, it can be use as autocomplete for iframe, divs, inputboxes
 * -----------------------------------------------------------------------------------------
 * $('[name="remotetext"]').click(function(){
 *	var deze = $(this).val();
 *	if ( deze.length > 0 ){
 *
 *		$( '#remotetext' )._window({
 *			cs: 'height:300px;width:300px;',
 *			returnvalue: '1:[name="remotetext"],3:frame-#teksten',
 *			caption: 'Admin text.',
 *			url: 'include/add_edit_del.php?model=ajax_offerte_text&oper=search',
 *			data: 'naam=' + $(this).val(),
 *			content: '',
 *			footer:  ''
 *		});
 *
 *	}
 * });
 *---------------------------------------------------------------------------------------------
 *
*/
(function($){
        var opt;
		var _root;
        // temporary functions
        function ajaxevent(){
			//_root = $(this);
			var clicks=0;
			_root.find('#sh-window-rightpane').click(function(){
				_root.find('.sh-window').remove();
			});

            // on click return to that item
            _root.find('#sh-window-content table').find('tr').click(function(){
				var _tmp = $(this);
				var ret = opt.returnvalue.split(',');
				opt.shamun = _tmp;

				$.each(ret,function(i,v){
					var _v = v.split(':');
					//alert ( _v[0] + ' ' + _v[1] );
					var checkmore = _v[1].indexOf('frame-');

					if (checkmore==-1){
						// simple procedure
						$(_v[1]).val( _tmp.find('td:nth-child(' + _v[0] + ')').html()	) ;
					}else{
						// there is more to do
						var more = _v[1].split('-');

						if 	(more[0]=='frame'){


							//var newframe = more[1].indexOf('inside-');
							var newframe = more[1].search(/inside-/); // -1 not found, +1 found
							if (newframe==-1){
								// 1:frame-#frameid
								$(more[1]).contents().find('body').empty().html( _tmp.find('td:nth-child(' + _v[0] + ')').html() );

							}else{

								// 1:frame-inside-#anythingframe-[name="abc"]
								var newfrm = _v[1].split('-'); // frame-inside-#anythingframe-[name="abc"]
								$(newfrm[2]).contents().find(newfrm[3]).val( _tmp.find('td:nth-child(' + _v[0] + ')').html() );

							}

						}else{

							$(more[1]).contents().find('body').empty().html( _tmp.find('td:nth-child(' + _v[0] + ')').html() );
						}
					}



				});

				_tmp.find('td').css('background-color', 'red');
            });
			_root = _root;
        }

        // Window frame
        $.fn._window = function( param1 ){
			_root = $( this );
            opt = $.extend( {}, param1 , $.fn._window.ajaxevent);

			var _css = '\
			   <style>\
				#sh-window{\
					border:solid 1px #99BBE8;\
					background-color:#D0DEF0;padding:4px; overflow:none;}\
				#sh-window-header{\
					border-bottom:solid 2px #99BBE8;\
					border-top:solid 1px #ffffff;\
					background-color:#D0DEF0;\
					overflow:auto;height:30px;\
					padding:5px;cursor:move;\
					}\
				#sh-window-leftpane{\
					float:left;cursor:pointer;\
					}\
				#sh-window-rightpane{\
					float:right;cursor:pointer;\
					}\
				#sh-window-content{background-color:#B1C7E1; overflow:scroll; height:80%; width:100%;}' +
				'#sh-window-footer{\
					border-top: solid 2px #99BBE8;\
					}\
				#sh-window-content table { width:100%}\
				#sh-window-content table td{cursor:pointer;border-bottom:dotted 1px #dddddd}\
				</style>';

            // Create the structure
			$('.sh-window').remove();
            _root.empty().append( _css + '<div id="sh-window" class="sh-window" style="' + opt.cs + '">' +
                    '<div id="sh-window-header">' +
                            '<div id="sh-window-leftpane">' +
                            opt.caption +
                            '</div>' +
                            '<div id="sh-window-rightpane">X'   +
                            '</div>' +
                        '</div>' +
                    '<div id="sh-window-content"  >' +
                    '</div>' +
                    '<div id="sh-window-footer">' +
                    opt.footer +
                    '</div>' +
                '</div>' ).show('slow');



            // Get the content values;
            $.ajax({
               type: "POST",
               url: opt.url,
               data: opt.data,
			   beforeSend: function(){  $('#sh-window-load').show(); },
			   complete: function() { 	$('#sh-window-load').hide(); },
               success: function(msg){
                    //$('#sh-window-content').append(msg);
					_root.find('#sh-window-content').append(msg);
                     ajaxevent() ;
                }
            });

			return opt;
        } //end of _window

})( jQuery );