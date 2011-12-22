
	/**
	  *CopyRight (c) 2009 Shamun Youtube
	  	$('#shamun').youtube({
			bodys: vd,
			overlap_to: 'annonce_image'
		});

	 */

	(function($){
	    var opt;	// all parameters
		var _html;	// html values
		var _css;	// css values
		var _root;	// keep the value of $this
		var _id='#';

		// Plugin for container
		$.fn.youtube = function (param){
			// to reuse the $(this), we keep in memory.
			_root  = $(this);
			doc_root = $(document).find('head');
			// Extend class
			opt = $.extend ( { } , param );

			//if ( opt.scroll == '' || opt.scroll == undefined || opt.scroll == 'undefined'){opt.scroll='scroll';}
			// Style sheet
			_css = '<style></style>';

			// Html - inside
			_html = '\
				<div id="sh-videomanage" class="sh-container" style="border-bottom:solid 2px black;padding:3px;">\
					<span class="onoff" style="cursor:pointer; padding:2px; padding-left:6px; padding-right:6px; border:solid 1px grey;">\
					<img src="http://www.directnews.be/dn0/images/camera.gif" height="30" width="30" /> </span>\
				</div>\
				<div id="sh-videos" class="sh-container" style="border:solid 2px grey; padding:2px; background-color:black;display:none;">\
				' + opt.bodys + '</div>';
			// Place it in correct position:
			//doc_root.append(_css);
			//alert(opt.bodys);
			$(document.body).find(_id + opt.overlap_to).before( _root.empty().append(  _html ) );



			_root.find('#sh-videomanage .onoff').click(function(){

				var hh = _root.find('#sh-videomanage').height();
				_root.find('#sh-videos').css({
					'position':'absolute',
					'height' : $('#' + opt.overlap_to).height(),
					'width': '680',
					'top':2 + _root.find('#sh-videomanage').offset().top + hh,
					'opacity':'0.95'

				}).toggle();
			}).hover(function(){
					$(this).css('background-color','red');
				},function(){
					$(this).css('background-color','grey');
				});	//end of row select


			return _root;

		}//end of container

	})(jQuery);