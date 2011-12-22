// time slot create
(function($){
        var opt;
		var _root;
		var hh='00';
		var mm='00';
		var ss='00';


    // temporary functions
    function ajaxevent()
    {

			var clicks=0;
			_root.find('#sh-window-rightpane').click(function(){
				_root.find('.sh-window').remove();
			});

			// default
			$('#sh-window-content table').find('input[type=text]').val( hh + ':' + mm + ':' + ss );

			// on change hour
			$('#sh-window-content').find('[name="unique_hour"]').change(function()
      {

				hh = $(this).find('option:selected').val();
				 $('#sh-window-content table').find('input[type=text]').val( hh + ':' + mm + ':' + ss );

			});

			// on change minute
			$('#sh-window-content').find('[name="unique_minutes"]').change(function()
      {
				mm = $(this).find('option:selected').val();
				$('#sh-window-content table').find('input[type=text]').val( hh + ':' + mm + ':' + ss );

			});

			// on change time
			$('#sh-window-content').find('[name="unique_second"]').change(function()
      {
				ss = $(this).find('option:selected').val();
				$('#sh-window-content table').find('input[type=text]').val( hh + ':' + mm + ':' + ss );

			});

      // on click return to that item
      $('#sh-window-content table').find('input[type=button]').click(function()
      {
				var _tmp = $(this);
				var ret = opt.returnvalue.split(',');
				opt.shamun = _tmp;

				$.each(ret,function(i,v)
        {
					var _v = v.split(':');
					var checkmore = _v[1].indexOf('frame-');

					if (checkmore==-1) {
						// simple procedure
						//$(_v[1]).val( _tmp.find('td:nth-child(' + _v[0] + ')').html()	) ;
						$('#sh-window-content table').find('input[type=text]').val();
						$(_v[1]).val( $('#sh-window-content table').find('input[type=text]').val() );

					}else{
						// there is more to do
						var more = _v[1].split('-');
						if (more[0]=='frame'){
							//$(more[1]).contents().find('body').empty().html( _tmp.find('td:nth-child(' + _v[0] + ')').html() );
						}else{
								//$(more[1]).contents().find('body').empty().html( _tmp.find('td:nth-child(' + _v[0] + ')').html() );
						}
					}



				});

      });

			_root = _root;
    }

    // Window frame
    $.fn.timepicker = function( param1 )
    {

      _root = $( this );
      opt = $.extend( {}, param1 );

			var _css = '\
			   <style type="text/css">\
				#sh-window{\
					border:solid 6px #333333;\
					background-color:#CCCCCC; padding:6px; font-size:10px;overflow:none;}\
				#sh-window-header{\
					border-bottom:solid 2px #99BBE8;\
					border-top:solid 1px #ffffff;\
					background-color:#CCCCCC;\
					overflow:auto;height:15px;\
					padding:0px;cursor:move;\
					}\
				#sh-window-leftpane{\
					float:left;cursor:pointer;\
					}\
				#sh-window-rightpane{\
					float:right;cursor:pointer;\
					}\
				#sh-window-content{background-color:#BBBBBB;  height:80%; width:100%;}' +
				'#sh-window-footer{\
					border-top: none;\
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

			// Create the time
			var hourselect = '';
			for(var a=0; a<24;a++){
				if (a<10){ a = '0' + a; }
				hourselect +='<option value=' + a + '>' + a + '</option>';
			}
			var hourminute = '';
			for(var a=0; a<60;a++){ if (a<10){ a = '0' + a; }
				hourminute +='<option value=' + a + '>' + a + '</option>';
			}
			var hoursecond = '';
			for(var a=0; a<60;a++){ if (a<10){ a = '0' + a; }
				hoursecond +='<option value=' + a + '>' + a + '</option>';
			}

			var table= '<table id="unique_time_setup">\
				<tr>\
					<td>\
						<select name="unique_hour">' + hourselect + '</select>\
					</td>\
					<td>\
						<select name="unique_minutes">' + hourminute + '</select>\
					</td>\
					<td>\
						<select name="unique_second">' + hoursecond + '</select>\
					</td>\
				</tr>\
				<tr>\
					<td colspan=3><input type="text" name="unique_time" /></td>\
				</tr>\
				<tr>\
					<td colspan=3><input type="button" value="SELECT" /></td>\
				</tr>\
			</table>';

			$('#sh-window-content').append(table);


			ajaxevent();


			return opt;

  } //end of _window

})( jQuery );