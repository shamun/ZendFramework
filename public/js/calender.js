//alert( $.browser.version) ;
var _calender = (function(){
			// Make today moth
			_todaymonth = function(){
				_d = new Date();
				return _d.getMonth()+1;
			}
			// Make year
			_todayyear = function(){
				_d = new Date();
				_d = _d.getYear()
				if (_d<1000) _d+=1900;
				return _d;
			}
			// today function
			_today = function() {
				_d = new Date();
				return _d.getDate();
			}

			// Class and object
			return {
				_months     : ['January',"February", "March" , "April", "May", "June" , "July", "August", "September","October" , "November" , "December" ],
				_nl_months  : ['Januari','Februari','Maart','April','Mei','Juni','Juli','Augustus','September','Oktober','November','December'],
				_en_months  : ["January","February", "March" , "April", "May", "June" , "July", "August", "September","October" , "November" , "December"],
				_weeks      : ["Ma", "Di", "Wo", "Do", "Fr", "Za","Zo"],
				dayNames    : ["Zo","Ma","Di","Wo","Do","Fr","Za"],
				_dmm        : _todaymonth(),
				_dyyyy      : _todayyear(),
				_yydyy		: _todayyear(),
				_ddd		: _today(),
				_dblock     : '',
				_clikeditem : '',
				// This funciton will check which boxes are for multi select
				_chkred     : function (_date){
				  //var _p = this._dblock.split(',');
				  //for (var _tm=0;_tm<_p.length;_tm++){
					//if (_date == _p[_tm]){
					  //return 1;
					//}
				  //}
				  var items_ab = this._dblock.split(',');
				  for(var _tm=0; _tm<items_ab.length;_tm++){
					var thisdate = items_ab[_tm].split(':');
					if(_date == thisdate[1] ){
						return 1;
					}
				  }
				},
				// This funciton will check which boxes are for multi select
				takecolor     : function (_date){

				  var items_ab = this._dblock.split(',');
				  for(var _tm=0; _tm<items_ab.length;_tm++){
					var thisdate = items_ab[_tm].split(':');
					if(_date == thisdate[1] ){
						return thisdate[0];
					}
				  }
				},
				// This funciton will check which boxes are for multi select
				uniqueday     : function (_date,clr){

				  var items_ab = this._dblock.split(',');
				  for(var _tm=0; _tm<items_ab.length;_tm++){
					var thisdate = items_ab[_tm].split(':');
					if(_date == thisdate[1] ){
						if (clr==thisdate[0]){
							return 1;
						}
					}
				  }
				},
				daysInMonth : function(month,year){
				  var m = [31,28,31,30,31,30,31,31,30,31,30,31];
				  if (month != 2) return m[month - 1];
				  if (year%4 != 0) return m[1];
				  if (year%100 == 0 && year%400 != 0) return m[1];
				  return m[1] + 1;
				},
				getTheDay   : function (aText){
				  var now = new Date(aText);
				  return this.dayNames[now.getDay()];
				},
				_ajax   : function(_data){
					_calender._dblock = '2009-12-1,2009-12-5';
					_calender.draw(_data);
					/*
					$.ajax({
						type    : 'POST',
						url     : 'include/add_edit_del.php',
						data    : 'oper=blad&model=verzending_color',
						success : function(msg){
							_calender._dblock = msg;
							_calender.draw(_data);

							//alert (msg);
						}
					});
					*/
				},
				_default    : function(_this)
        {
          
					$(_this).find('._wdays').hover(function() {
						_hovercolor = $(this).css('background-color');

						$(this).css({
							//'background-image':'url(images/menu0.png)',
							//'background-position':'0% 900px'
							'background-color':'orange'
						});
					}
					, function () {
						 //'background-color':'#eeeeee'
						$(this).css({
							'background-color':_hovercolor });
					});

					$(_this).find('._cprev').click (function(){
						   $(_this).html('');
							_calender._dmm = _calender._dmm - 1;
							if ( ( _calender._dmm == 0) ){
							   _calender._dmm = 12;
							   _calender._dyyyy = _calender._dyyyy - 1;
							}
							_calender.draw(_this);
					  }).hover(function(){
						$(this).css('border-bottom', 'solid 2px red');
					  },function(){
						$(this).css('border-bottom', 'none');
					  });

					$(_this).find('._cnext').click (function(){
						   $(_this).html('');
							_calender._dmm = _calender._dmm + 1;
							if ( ( _calender._dmm == 13) ){
							   _calender._dmm = 1;
							   _calender._dyyyy = _calender._dyyyy + 1;
							}
							_calender.draw(_this);
					  }).hover(function(){
						$(this).css('border-bottom', 'solid 2px red');
					  },function(){
						$(this).css('border-bottom', 'none');
					  });

					// query for the price.
					$(_this).find('._wdays').click (function() 
          {

            

						_t = $(this).attr('id').replace('d','');
						_v1 = $(_this).find('.calender').attr('id') + '-' +  _t;
						$(_calender._clikeditem).val(_v1);

						if (_this == '#totcal'){

							_thuis = $('[name="huis"]').val();
							_a= $('[name="van"]').val();
							_b= $('[name="tot"]').val();

							if (_a !=''){
								$.ajax({
									type    : 'POST',  url     : 'include/auto_extra.php',
									data    : 'huis=' + _thuis + '&van=' + _a + '&tot=' + _b ,
									success : function(msg){
										msg = msg.split('#');
										switch(_thuis){
											case '1':
												$('#a1').html('').hide('slow').show('slow').append(msg[0]);
												$('#a01').html('').hide('slow').show('slow').append(msg[1]);
												break;
											case '2':
												$('#a2').html('').hide('slow').show('slow').append(msg[0]);
												$('#bb2').html('').hide('slow').show('slow').append(msg[1]);
												break;
										}


									}
								});
							}

						}else{
							$.ajax({
								type    : 'POST',
								url     : 'include/auto_price.php',
								data    : 'chk=' + _v1,
								beforeSend: function(){},
								complete: function(){},
								success : function(msg){
									msg = msg.split(',');
									$('#a1').html('').hide('slow').show('slow').append(msg[0]);
									$('#a2').html('').hide('slow').show('slow').append(msg[1]);
								}
							});
						}



            

					});

				},
				_van : 0,
				_tot : 0,
				draw : function (divID) {

				  var _mm = this._dmm;
				  var _yyyy = this._dyyyy;


				  var _ii = 0;
				  var _table = '<div id="calenderbox" style=" padding:3px; width:305px; height:228px; background-color:white; border:solid 1px black;"><table width="100%" class="calender" id="' + _yyyy + '-' + _mm + '" >' +
					'<thead>' +
						'<tr>' +
							'<td colspan="7" class="_whead" align="center" style="background-color:#cccccc;         border:solid 1px #d6d6d6;         text-align:center;">' +
								'<div class="_cprev" style="cursor:pointer; background-image:url(images/menu_split.png);background-position:0% 40%;height:100%;width:20%;float:left">&laquo;</div>' +
								'<div class="_ctitle" style="cursor:pointer; background-image:url(images/menu_split.png);background-position:0% 50%;height:100%;width:60%;float:left;">' + this._nl_months[_mm-1] + ', ' + _yyyy +  '</div>' +
								'<div class="_cnext" style="cursor:pointer; background-image:url(images/menu_split.png);background-position:0% 40%;height:100%;width:20%;float:left">&raquo;</div>' +
							'</td>' +
						'</tr>' +
						'<tr>' +
						   '<td class="_wweek">Ma</td>' +
						   '<td class="_wweek">Di</td>' +
						   '<td class="_wweek">Wo</td>' +
						   '<td class="_wweek">Do</td>' +
						   '<td class="_wweek">Fr</td>' +
						   '<td class="_wweek">Za</td>' +
						   '<td class="_wweek" >Zo</td>' +
						'</tr>' +
					'</thead>' +
					'</table></div>';
					$('#calenderbox').remove();
					$(divID).empty().append(_table);



					// STart here.
					_checks = ' ' + this._months[_mm-1] + ',' + _yyyy; // ' Janurary,2009 '
					_month = this.daysInMonth(_mm,_yyyy);
					_rows = _month/7;
					_d =new Array("Ma","Di","Wo","Do","Fr","Za","Zo");

					if (Math.round(_rows) < _rows) { _rows = Math.round(_rows) + 1 ;  }else{  _rows =  Math.round(_rows);  }

					var _todaydate = this._ddd;
					var _todaymonth = new Date().getMonth()+1;
					var _todayyear = this._yydyy;


					for (_i = 0 ; _i <  _rows+1; _i++ ){
							// Draw the dates
							_this = '<tbody id="c' +  _i  + '">'  + '<tr>';
							for ( _j= 0 ; _j < 7; _j++){
									_check = (_ii + 1) + _checks;
									//console.log ( _ii +  '*** ' + _check  + ' ---- ' + getTheDay(_check)  + '---' + _d[_j]);
									if (_d[_j] == this.getTheDay( _check ) ){
										if ( _ii<_month ){

										  if (this._chkred(_yyyy + '-' + _mm + '-' +(_ii+1)) == 1) {
											// Atleast one exist..
											var newcolor = this.takecolor(_yyyy + '-' + _mm + '-' +(_ii+1));

											// Search for 3 maga
											var a = this.uniqueday(_yyyy + '-' + _mm + '-' +(_ii+1),'red');
											var b = this.uniqueday(_yyyy + '-' + _mm + '-' +(_ii+1),'green');
											var c = this.uniqueday(_yyyy + '-' + _mm + '-' +(_ii+1),'orange');

											if (a==1){ a =	'<img src="../dn0/images/flag_red.png" />';	 }else{a=''}
											if (b==1){ b =	'<img src="../dn0/images/flag_green.png" />';	 }else{b=''}
											if (c==1){ c =	'<img src="../dn0/images/flag_orange.png" />';	 }else{c=''}



											_this += '<td style="background-color:#555555; color:red; border:solid 1px #cccccc;  cursor:pointer;  width:14%;   text-align:center;" class="_wdays"  id="d' +  (_ii+1)  + '" ><b>' + (_ii + 1) +
											'<div>' + a + b + c + '</div>'  +
											'</td>';
											//alert('test');

										  }else{
											//alert ( ( parseInt(_todayyear) == parseInt(_yyyy) )  );
											//$('#titel').attr('class' , parseInt(_todayyear));
											if ( ( ( parseInt(_todaydate) == parseInt(_ii,10)+1  )  && ( parseInt(_todaymonth) == parseInt(_mm)  ) && ( parseInt(_todayyear) == parseInt(_yyyy) )   )  ) {

												_this += '<td style="background-color:black;color:white;  border:solid 1px #cccccc;  cursor:pointer;   width:14%;   text-align:center;" class="_wdays" id="d' +  (_ii+1)  + '" >' + (_ii + 1) + '</td>';
											}else{
												_this += '<td style="background-color:#eeeeee;  border:solid 1px #cccccc;  cursor:pointer;   width:14%;   text-align:center;" class="_wdays" id="d' +  (_ii+1)  + '" >' + (_ii + 1) + '</td>';
											}


										 }
										}
										_ii++;
									}else{
										_this += '<td  class="_wempty" id="d' + _j + _ii  + '"></td>';
									}
							}
							_this += '</tr></tbody>' ;
							$(divID + ' .calender').append( _this );
					}

				   this._default(divID);
				}//end of draw
			}//end of return
	})(); //End of calender class

	//$(this).after('<div id="metdatum"></div>');
	//$('#metdatum').empty();
	//_calender._clikeditem = $(this);
	//_calender.draw('#kalender');

  

	