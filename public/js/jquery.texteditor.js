
/**
 *
 * Demo temporary text editor
 * ---------------------------------------------
 *
 *
 *
 *
 *
 * ---------------------------------------------
 */
(function($){
    // forecolor | hilitecolor | fontname | fontsize | formatblock | justifyleft | justifycenter | justifyright
    // insertorderedlist | insertunorderedlist | indent | outdent | undo | createlink | redo | copy | cut | paste | removeFormat
    // InsertHorizontalRule | SubScript | Superscript
    // html: blockquote
    //--------------------------------------------------------------------------------------------------------------------------
    // http://www.maconstateit.net/tutorials/JSDHTML/JSDHTML12/jsdhtml12-02.htm
    var _realtime;

    $.fn.editor = function(param){
			var _opt=null;
            // apply extend.
            _opt = $.extend( {} , param, $.fn.editor.defaults );
			// images directory
			if ( _opt.imgroot == null ) {			_opt.imgroot = 'images/'; }

            var _root  = $(this);
            // Move the iframe inside the container
            _css = '\
            <style>\
                .sh-editor-main { padding:5px; border:solid 1px #eeeeee; background-color: #cccccc;  }\
                .sh-editor-edit {border: solid 3px #8d8d8d;}\
                .sh-editor-toolbar {width:100%; padding-top:5px; padding-bottom:5px;}\
                .sh-editor-edit textarea { border:none;width:100%; min-height:300px;}\
                .sh-toolbar-icons { display:inline; cursor:pointer; margin-right: 5px;}\
                .sh-editor-preview { padding:5px; border: solid 1px #8d8d8d; background-color:#aaaaaa }\
                .sh-editor-gape { height:5px; }\
                .sh-textarea { width:100%; display:none;  font-size:9px; min-height:300px;background-color:red;}\
                .sh-editor-header { height: 30px; background-color:#dddddd; border: solid 1px #aaaaaa;}\
		.sh-editor-left-value {float:left;padding:5px;} .sh-editor-right-value {float:right;padding:5px;}\
            </style>\
            ';

            var fontsize = '<select id="sh-editor-fontsize"> <option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option></select>';
            var fontname = '<select id="sh-editor-fontname"><option value="Arial">Arial</option><option value="Impact">Impact</option><option value="Verdana">Verdana</option><option value="Tahoma">Tahoma</option><option value="Courier">Courier</option></select>';

            // Apply the texts
            $( _opt.window ).empty().append( _css +
                '\
                <div class="sh-editor-toolbar">\
                        <li id="h1" class="sh-toolbar-icons"><img src="' + _opt.imgroot + 'text_heading_1.png" width="16px" height="16px" /></li>\
                        <li id="bold" class="sh-toolbar-icons" ><img src="' + _opt.imgroot + 'text_bold.png" width="16px" height="16px" /></li>\
                        <li id="italic" class="sh-toolbar-icons"><img src="' + _opt.imgroot + 'text_italic.png" width="16px" height="16px" /></li>\
                        <li id="underline" class="sh-toolbar-icons"><img src="' + _opt.imgroot + 'text_underline.png" width="16px" height="16px" /></li>\
                        <li class="sh-toolbar-icons"><img src="' + _opt.imgroot + 'line.gif" width="16px" height="16px" /></li>\
                        <li id="alignleft" class="sh-toolbar-icons"><img src="' + _opt.imgroot + 'text_align_left.png" width="16px" height="16px" /></li>\
                        <li id="alignmiddle" class="sh-toolbar-icons"><img src="' + _opt.imgroot + 'text_align_center.png" width="16px" height="16px" /></li>\
                        <li id="alignright" class="sh-toolbar-icons"><img src="' + _opt.imgroot + 'text_align_right.png" width="16px" height="16px" /></li>\
                        <li class="sh-toolbar-icons"><img src="' + _opt.imgroot + 'line.gif" width="16px" height="16px" /></li>\
                        <li id="forecolor" class="sh-toolbar-icons"><img src="' + _opt.imgroot + 'palette.png" width="16px" height="16px" /></li>\
                        <li id="backcolor" class="sh-toolbar-icons"><img src="' + _opt.imgroot + 'paintcan.png" width="16px" height="16px" /></li>\
                        <li class="sh-toolbar-icons"><img src="' + _opt.imgroot + 'line.gif" width="16px" height="16px" /></li>\
                        <li id="ul" class="sh-toolbar-icons"><img src="' + _opt.imgroot + 'text_list_bullets.png" width="16px" height="16px" /></li>\
                        <li id="oi" class="sh-toolbar-icons"><img src="' + _opt.imgroot + 'text_list_numbers.png" width="16px" height="16px" /></li>\
                        <li class="sh-toolbar-icons"><img src="' + _opt.imgroot + 'line.gif" width="16px" height="16px" /></li>\
                        <li id="table" class="sh-toolbar-icons"><img src="' + _opt.imgroot + 'application_view_columns.png" width="16px" height="16px" /></li>\
						<li id="images" class="sh-toolbar-icons"><img src="' + _opt.imgroot + 'photo.png" width="16px" height="16px" /></li>\
                        <li class="sh-toolbar-icons"><img src="' + _opt.imgroot + 'line.gif" width="16px" height="16px" /></li>\
                        <li id="codes" class="sh-toolbar-icons"><img src="' + _opt.imgroot + 'text_superscript.png" width="16px" height="16px" /></li>\
                        <li id="hr" class="sh-toolbar-icons"><img src="' + _opt.imgroot + 'text_horizontalrule.png" width="16px" height="16px" /></li>\
                        <li id="preview" class="sh-toolbar-icons"><img src="' + _opt.imgroot + 'xhtml.png" width="16px" height="16px" /></li>\
                        <li id="edit" class="sh-toolbar-icons" style="float:right"><img src="' + _opt.imgroot + 'report.png" width="16px" height="16px" /></li>\
                        <li id="printit" class="sh-toolbar-icons" style="float:right"><img src="' + _opt.imgroot + 'printer.png" width="16px" height="16px" /></li>\
                </div>\
                <div class="sh-editor-extra">\
                	<li  class="sh-toolbar-icons">' + fontname + '</li>\
                	<li  class="sh-toolbar-icons">' + fontsize + '</li>\
                	<li  id="remove" class="sh-toolbar-icons"><img src="' + _opt.imgroot + 'building_delete.png" width="16px" height="16px" /></li></div>\
                <div class="sh-editor-coloring"></div>\
                <div class="sh-editor-preview">\
                    <textarea class="sh-textarea"></textarea></div>\
                <div class="sh-editor-gape"></div>\
                <div class="sh-editor-edit"></div>\
                <div class="sh-editor-status"></div>\
                '
            );


            // Apply the editor
            // Make the iframe to a textarea
            var $a = $(this).get(0);
			var ie=0;
            $(this).load(function(){
				// Plz check the browsers
				//alert $a;

				if ($.browser.msie){
					ie = eval ( $(this).attr('id') );
					ie.document.designMode = "on";
				}else{
					$a.contentDocument.designMode = "on";
				}
			}).attr('src', '').appendTo(_opt.window +  ' .sh-editor-edit');

			//
			//
            // preview mode
			//
			//
			//
            $(_opt.window).find('#preview').click( function(e) {
				//$('.sh-textarea').show().val (  _root.contents().find('body').html()  );
				// new
				//alert(_opt.window);
				$(_opt.window).find('.sh-textarea').show().val (  _root.contents().find('body').html()  );
               _realtime =true;
            });

            // to apply tab
            function allowTab(sender, e) {
                if (e.keyCode == 9) {
                    if (e.srcElement) {
                        sender.selection = document.selection.createRange(); sender.selection.text = "\t";
                    }
                    else if (e.target) {
                        var start = sender.value.substring( 0, sender.selectionStart );
                        var end = sender.value.substring( sender.selectionEnd, sender.value.length );
                        var newRange = sender.selectionEnd + 1;
                        var scrollPos = sender.scrollTop;
                        sender.value = String.concat( start, "\t", end );
                        sender.setSelectionRange( newRange, newRange );
                        sender.scrollTop = scrollPos;
                    } return false;
                } else {
                    return true;
                }
            }

            // bind function
            //$a.contentWindow.document.addEventListener("keydown", callme , true);
			/*
            function callme(event){
                var start = $a.tagName.value.substring( 0, $a.tagName.selectionStart );
                var end = $a.tagName.value.substring( $a.tagName.selectionEnd, $a.tagName.value.length );
                var newRange = $a.tagName.selectionEnd + 1;
                var scrollPos = $a.tagName.scrollTop;
                $a.tagName.value = String.concat( start, "\t", end );
                $a.tagName.setSelectionRange( newRange, newRange );
                $a.tagName.scrollTop = scrollPos;
            }
			*/

			// Preview
            $(_opt.window).find('#edit').click(function(e) {
				// apply new html values
				_root.contents().find('body').html(  $(_opt.window).find('.sh-textarea').val() ) ;
				// Remove all in html editor
				$(_opt.window).find('.sh-textarea').val('').hide();
                _realtime =false;
            });


            // Calling the text select plugin
            $(_opt.window).find('#bold').click(function(e) {
                $a.contentWindow.document.execCommand("bold", false, null);
            });
            // Calling the text select plugin
            $(_opt.window).find('#italic').click(function(e) {
                $a.contentWindow.document.execCommand("italic", false, null);
            });
            // Calling the text select plugin
            $(_opt.window).find('#underline').click(function(e) {
                $a.contentWindow.document.execCommand("underline", false, null);
            });
            // Calling the text select plugin
            $(_opt.window).find('#alignleft').click(function(e) {
                $a.contentWindow.document.execCommand("justifyleft", false, null);
            });
            // Calling the text select plugin
            $(_opt.window).find('#alignmiddle').click(function(e) {
                $a.contentWindow.document.execCommand("justifycenter", false, null);
            });
            // Calling the text select plugin
            $(_opt.window).find('#alignright').click(function(e) {
                $a.contentWindow.document.execCommand("justifyright", false, null);
            });

            // Calling the text select plugin
            $(_opt.window).find('#ul').click(function(e) {
                $a.contentWindow.document.execCommand("insertunorderedlist", false, null);
                $a.contentWindow.focus();
            });
            // Calling the text select plugin
            $(_opt.window).find('#oi').click(function(e) {
                $a.contentWindow.document.execCommand("insertorderedlist", false, null);
                $a.contentWindow.focus();
            });
            // Calling the text select plugin
            $(_opt.window).find('#h1').click(function(e) {
                $a.contentWindow.document.execCommand("formatblock", false, '<h1>');
                //$a.contentWindow.document.execCommand("FontSize",0,"22");
                //$a.contentWindow.document.execCommand("RemoveFormat",false,null);
                 $a.contentWindow.document.execCommand("FontName",false,"Impact");
            });

            // Font name
            $(_opt.window).find('#sh-editor-fontname').change(function(e) {
            		var fontname = $(this).val();
            		$a.contentWindow.document.execCommand("FontName",false,fontname);
            });



						// Font size
            $(_opt.window).find('#sh-editor-fontsize').click(function(e) {
            		var fontsize=$(this).val();
                $a.contentWindow.document.execCommand("FontSize",0,fontsize);
            });




					// Remove formats
            $(_opt.window).find('#remove').click(function(e) {
                $a.contentWindow.document.execCommand("RemoveFormat",false,null);
            });





            // table FF
            function InsertAtSelection(cm_newnode) {
              cm_cursel = $a.contentWindow.getSelection();
			  cm_currange = cm_cursel.getRangeAt(0);
              cm_cursel.removeAllRanges();
			  cm_currange.deleteContents();
              container = cm_currange.startContainer;
			  pos = cm_currange.startOffset;
              cm_currange = document.createRange();
              if (container.nodeType==3 && cm_newnode.nodeType==3) {
                container.insertData(pos, cm_newnode.nodeValue);
                cm_currange.setEnd(container, pos+cm_newnode.length);
                cm_currange.setStart(container, pos+cm_newnode.length);
              }else {
                if (container.nodeType==3) {
                  textNode = container;
				  container = textNode.parentNode;
                  text = textNode.nodeValue;
				  textBefore = text.substr(0,pos);
                  textAfter = text.substr(pos);
				  beforeNode = document.createTextNode(textBefore);
                  afterNode = document.createTextNode(textAfter);
				  container.insertBefore(afterNode, textNode);
                  container.insertBefore(cm_newnode, afterNode);
				  container.insertBefore(beforeNode, cm_newnode);
                  container.removeChild(textNode);
                } else {
                  afterNode = container.childNodes[pos];
				  container.insertBefore(cm_newnode, afterNode);
                }
                cm_currange.setEnd(afterNode, 0);
				cm_currange.setStart(afterNode, 0);
              }
              cm_cursel.addRange(cm_currange);
            }

            // table for ie ( bug for ie, dont expect perfect will work yet )
            function InsertAtSelectionIE(cm_newnode) {
				// Try 1
				var sel =  ie.document.selection;
				rng = sel.createRange()
				rng.select();
				sel=rng.text;
				// sel null
				if (sel != "" ){
					ie.document.selection.createRange().pasteHTML( cm_newnode	);
				}else{
					var copy1 =  _root.contents().find('body').html() ;
					_root.contents().find('body').html(  copy1 + cm_newnode ) ;
					$(_opt.window).find('.sh-textarea').val('').hide();
					//var div = document.getElementById('tbl');
					//div.contentEditable = 'true';
				}
			}


            // table for ie/ff
            $(_opt.window).find('#table').click (function(e){

				  // Browser ff support, but ie have problem for table selected insert.
				  if ($.browser.msie){
					var cm_rows = Math.abs (prompt ('Hoeveel Rijen: ', 2));
					if (cm_rows) {
						var cm_cols = Math.abs (prompt ('Hoeveel column: ', 2));
						if (cm_cols) {

						  var cm_table='';		var cm_tbody='';						  var cm_tr='';
						  var cm_td='';			var cm_tc='';
						  // insert <table .... ><tbody>
						  cm_table = '<table ';
						  cm_table += ' border=1';
						  cm_table += ' cellpadding=1';
						  cm_table += ' cellspacing=0';
						  cm_table += ' >';
						  cm_tbody = '<tbody>' ;

						  // insert <tr><td .....</td> </tr>
						  for (var cmtr = 0; cmtr < cm_rows; cmtr++) {
							cm_tr += '<tr>';
							for (var cmtc = 0; cmtc < cm_cols; cmtc++) {
							  cm_td += '<td>';
							  cm_td += 'text';
							  cm_td += '</td>';
							  //cm_tr += cm_td + '</tr>';
							}

							cm_tr += cm_td + '</tr>';
							cm_td = '';
						  }
						  cm_tbody += cm_tr;
						  cm_tr = '';

						  cm_table += cm_tbody + '</tbdoy></table>';

						}else{
							cm_table = '<table border="1" cellpadding="1" cellspacing="0"><tbody><tr><td>teksten..</td><td>teksten..</td></tr><tr><td>teksten..</td><td>teksten..</td></tr></tbody></table><br>';
						}
					}else{
						cm_table = '<table border="1" cellpadding="1" cellspacing="0"><tbody><tr><td>teksten..</td><td>teksten..</td></tr><tr><td>teksten..</td><td>teksten..</td></tr></tbody></table><br>';
					}

					//alert ( cm_table) ;
					InsertAtSelectionIE (cm_table);
					//cm_table='';

				  }else{

					var cm_tblrows = Math.abs ( prompt ('Rijen:', 2) );
					if (cm_tblrows) {
						cm_tblcols = Math.abs ( prompt ('Columen', 2) );
						if (cm_tblcols) {
						  cm_htmltable = $a.contentWindow.document.createElement( "table" );
						  cm_htmltable.setAttribute ( "border", "1" );
						  cm_htmltable.setAttribute ("cellpadding", "4");
						  cm_htmltable.setAttribute ("cellspacing", "0");
						  cm_htmltbody = $a.contentWindow.document.createElement("tbody");

						  for (var cmtr = 0; cmtr < cm_tblrows; cmtr++) {
							cm_htmltr = $a.contentWindow.document.createElement("tr");
							for (var cmtc = 0; cmtc < cm_tblcols; cmtc++) {
							  cm_htmltd = $a.contentWindow.document.createElement("td");
							  cm_htmltc = $a.contentWindow.document.createTextNode("teksten..");
							  cm_htmltd.appendChild(cm_htmltc);
							  cm_htmltr.appendChild(cm_htmltd);
							}
							cm_htmltbody.appendChild(cm_htmltr);
						  }

						  cm_htmltable.appendChild(cm_htmltbody);
						}
					}

					//for (var a in cm_htmltable){
						//alert ( cm_htmltable[a] );
					//}

					InsertAtSelection (cm_htmltable);
				  }




            });

            // images
            $(_opt.window).find('#images').click (function(e){
                $a.contentWindow.document.execCommand( "InsertImage", false, '' + _opt.imgroot + 'text_bold.png' );
                $a.contentWindow.focus();
            });
            // pointer
            $(_opt.window).find('#codes').click (function(e){
                $a.contentWindow.document.execCommand( "superscript", false, null );
            });
            // line
            $(_opt.window).find('#hr').click (function(e){
                $a.contentWindow.document.execCommand( "InsertHorizontalRule", false, null );
            });


            // font color
						//This variable must have global scope for the callColorDlg function to persist the chosen color
						var sInitColor = null;
						// put this in body
						//<OBJECT id=dlgHelper CLASSID="clsid:3050f819-98b5-11cf-bb82-00aa00bdce0b" width="0px" height="0px"></OBJECT>
            $(_opt.window).find('#forecolor').click (function(e){

								if ($.browser.msie){

									//if sInitColor is null, the color dialog box has not yet been called
									if (sInitColor == null)
										var sColor = dlgHelper.ChooseColorDlg();
									else
									//call the dialog box and initialize the color to the color previously chosen
										var sColor = dlgHelper.ChooseColorDlg(sInitColor);
									//change the return value from a decimal value to a hex value and make sure the value has 6
									//digits to represent the RRGGBB schema required by the color table
										sColor = sColor.toString(16);
									if (sColor.length < 6) {
										var sTempString = "000000".substring(0,6-sColor.length);
										sColor = sTempString.concat(sColor);
									}
										ie.document.execCommand("ForeColor", false, sColor);

									//set the initialization color to the color chosen
										sInitColor = sColor;


								}else{

									// Color draw
									var colorlist = new Array();
									colorlist = [
										'000000','ff0000','00ff26','000dff','ffaa00','ffdd00','66ff00','00f7ff','4444ff','ff00f7','474343',
										'2c2e29','ffffff','cccccc','dddddd','eeeeee','5cb8b3','64807f','b8d1d0', '577851','8ca389','ffcb94'
									];

									var cols = '<div style="background-color:white;border:solid 1px grey;padding:2px;">';
									var pressenter = '';
									var coutns = 0;
									for(var i in colorlist){
										cols += pressenter + '<span id="sh_col' + colorlist[i] + '" class="sh-editor-colors" style="cursor:pointer;background-color:#' + colorlist[i] + '">&nbsp;&nbsp;&nbsp;</span>';
										if (coutns>6){
											pressenter = '<br/>';
										}else{
											pressenter = '';
										}
									}
									cols += '</div>';


									//alert(cols);
									$(_opt.window).find('.sh-editor-coloring').empty().append(cols);

								}







            });



						// on the color click
						$(_opt.window).find('.sh-editor-colors').live('click',function(e){
								var colorthatyouclick = $(this).css('background-color');
								$a.contentWindow.document.execCommand( "forecolor", false, colorthatyouclick );
								$a.contentWindow.focus();
						});




            // background
            $(_opt.window).find('#backcolor').click (function(e){


								if ($.browser.msie){

									//if sInitColor is null, the color dialog box has not yet been called
									if (sInitColor == null)
										var sColor = dlgHelper.ChooseColorDlg();
									else
									//call the dialog box and initialize the color to the color previously chosen
										var sColor = dlgHelper.ChooseColorDlg(sInitColor);
									//change the return value from a decimal value to a hex value and make sure the value has 6
									//digits to represent the RRGGBB schema required by the color table
										sColor = sColor.toString(16);
									if (sColor.length < 6) {
										var sTempString = "000000".substring(0,6-sColor.length);
										sColor = sTempString.concat(sColor);
									}
										ie.document.execCommand("backcolor", false, sColor);

									//set the initialization color to the color chosen
										sInitColor = sColor;


								}else{



									var colorlist = new Array();
									colorlist = [
										'000000','ff0000','00ff26','000dff','ffaa00','ffdd00','66ff00','00f7ff','4444ff','ff00f7','474343',
										'2c2e29','ffffff','cccccc','dddddd','eeeeee','5cb8b3','64807f','b8d1d0', '577851','8ca389','ffcb94'
									];

									var cols = '<div style="background-color:white;border:solid 1px grey;padding:2px;">';
									var pressenter = '';
									var coutns = 0;
									for(var i in colorlist){
										cols += pressenter + '<span id="sh_col' + colorlist[i] + '" class="sh-editor-bckcolors" style="cursor:pointer;background-color:#' + colorlist[i] + '">&nbsp;&nbsp;&nbsp;</span>';
										if (coutns>6){
											pressenter = '<br/>';
										}else{
											pressenter = '';
										}
									}
									cols += '</div>';


									//alert(cols);
									$(_opt.window).find('.sh-editor-coloring').empty().append(cols);

								}



            });

            $(_opt.window).find('.sh-editor-bckcolors').live('click',function(){
            		var colorthatyouclick = $(this).css('background-color');
								if ( $.browser.msie){
									// IE shit ass..
									//$a.contentWindow.document.execCommand( "backcolor", false, colorthatyouclick );
								}else{
									// ff, all other works
									$a.contentWindow.document.execCommand( "hilitecolor", false, colorthatyouclick );
								}
								$a.contentWindow.focus();

            });



            // Print now...
            $(_opt.window).find('#printit').click (function(e){
			$($a.tagName).contents().find('head').empty().html('\
				<TITLE>news</TITLE>\
				<style REL="stylesheet" TYPE="text/css" MEDIA="print" >\
				@media all {  body { margin:0; }  }\
				</style>\
				');

                //_root.attr('src')
                $a.contentWindow.print();
            });
            // return this for container manipulation.
			_opt.one = $(this).parent().parent();
			_opt.three = $a;
            return _opt;
    }

	// Outside to inside...
	$.fn.editor.defaults = {
		one: 0, three: 0,
		two : function (str) {
			$(this.three).contents().find('body').html(str) ;
			//alert ( $(this.three).contents().find('body').html()  );
		}
	};

})(jQuery);
