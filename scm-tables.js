/*
*****************************************************
* SCM TABLES
*****************************************************
*/


(function($) {

/*
*****************************************************
*	TABLE
*****************************************************
*/

$.fn.addTable = function( opt ){

	

	var defaults = {
		id: 'scm-table',
		classes: '',
		css: {},
		sortable: false,
		nosort: [],
		editable: false,
		noedit: [],
		auto: [],
		formats: [],
		decimals: [],
		autocomplete: false,
		noauto: [],
		head: 1,
		header: [],
		foot: 0,
		footer: [],
		columns: 3,
		rows: 3,
		prepend: false,
	};
	var options = $.extend( defaults, opt ),
		$this = this;
		$table = $( '<table class="scm-table"></table>' ).attr( 'id', options.id ).addClass( options.classes ).css( options.css );

	if( options.prepend )
		$this.prepend( $table );
	else
		$this.append( $table );

	var	$thead,
		$tbody,
		$tfoot,
		classes = [];

	var HeadFoot = function( elem ){
		
		var $elem = $( '<t' + elem + '></t' + elem + '>' ).appendTo( $table ),
			rows = options[elem],
			cont = options[elem+'er'],
			tag = ( elem == 'head' ? 'th' : 'td' );
		for (var i = 0; i < rows; i++) {
			var rowclass = ( i == rows-1 ? 'class="row-' + elem + '" ' : '' );
			var $row = $( '<tr ' + rowclass + 'data-table-row="' + i + '"></tr>' ).appendTo( $elem );
			var j = 0;
			if( cont[i] ){

				$.each( cont[i], function( k, value ) {
					var format = ( options.formats[k] ? options.formats[k] : 'string' );
					var decimal = ( options.decimals[k] ? options.decimals[k] : 0 );
					var nosort, noedit = '';
					if( rowclass ){
						classes[j] = k;
						nosort = ( options.nosort.length && options.nosort[k] );
						noedit = ( options.noedit.length && options.noedit[k] );
					}

					var cls = ( $.isNumeric( k ) ? '' : k );
					if( cls ){
						var icon = $.getTableIcon( cls );
						cls = cls + ' ' + icon.classes;
						value = icon.value + ' ' + value;
					}

					if( rowclass ) cls = cls + ( nosort ? ' no-sort' : ' sort' ) + ( noedit ? ' no-edit' : ' edit' );
					var auto = ( options.autocomplete && !options.noauto[k] && elem == 'head' && rowclass && format == 'string' );
					//if( options.datalist && !options.nolist[k] && elem == 'head' && rowclass && format == 'string' ) $this.prepend( '<datalist id="list-' + k + '"></datalist>' );
					$row.append( '<' + tag + ( cls ? ' class="' + cls + '"' : '' ) + ( auto ? ' data-auto-complete="true"' : '' ) + ' data-column-name="' + k + '" data-column-format="' + format + '"' + ' data-column-decimal="' + decimal + '"' + ' data-column-sort="' + ( nosort ? false : true ) + '"' + ' data-column-edit="' + ( noedit ? false : true ) + '"' + ' data-cell="' + (i+1)*j + '" data-cell-row="' + i + '" data-cell-column="' + j + '" >' + value + '</th>' );
					j++;
				});
			}
		}
	}

	var Body = function(){
		$tbody = $( '<tbody></tbody>' ).appendTo( $table );
		for (var i = 0; i < options.rows; i++) {
			//$table.addRow( i, options, classes );
			var $row = $( '<tr data-table-row="' + i + '"></tr>' ).appendTo( $tbody );
			for (var j = 0; j < options.columns; j++) {
				var ind = classes[j];
				var cls = ( $.isNumeric( ind ) ? '' : ind );
				var noedit = ( options.noedit.length && options.noedit[ind] );
				$row.append( '<td class="cell' + ( cls ? ' ' + cls : '' ) + ( noedit ? ' no-edit' : '' ) + '" data-column-name="' + ind + '" data-cell="' + (i+1)*j + '" data-cell-row="' + i + '" data-cell-column="' + j + '" data-cell-format="' + ( options.formats[ind] ? options.formats[ind] : 'string' ) + '" data-cell-decimal="' + ( options.decimals[ind] ? options.decimals[ind] : 0 ) + ' data-cell-auto="' + ( options.auto[ind] ? options.auto[ind] : '' ) + '"></th>' );
			}
		}
	}	

	if( options.head && options.header ) HeadFoot( 'head' );
	if( options.foot && options.footer ) HeadFoot( 'foot' );
	Body();

	if( options.sortable ) $table.addClass( 'sortable' ).sortTable();
	if( options.editable ) $table.addClass( 'editable' ).editTable({
		editor: $('<input class="editable-input">'),
		offset: { 'width': 1, 'height': 1 },
	});

	return $table;
}

// *****************************************************
// *	CELLS
// *****************************************************

$.fn.getCell = function( col, row, body ){
	var cls = '.cell' + ( undefined === row || row === false || $.isNumeric( row ) ? '' : '.' + row ) + ( undefined === col || col === false || $.isNumeric( col ) ? '' : '.' + col );
	var data = ( $.isNumeric( row ) ? '[data-cell-row="' + row + '"]' : '') + ( $.isNumeric( col ) ? '[data-cell-column="' + col + '"]' : '');

	return $( $(this).find( ( body ? body : 'tbody ' ) + cls + data ) );
}

$.fn.pushRow = function( row ){
	var $tbody = this.find( 'tbody' ),
		$rows = $tbody.find('tr'),
		n = $rows.length,
		l = n-1,
		i = ( undefined === row ? l : row ),
		$tr = $( $rows[i] ).clone().data( 'table-row', n ).appendTo( $tbody ),
		c = $tr.length;
	$.each( $tr.find('td'), function( j, value ) {
		$(this).data( 'cell', $(this).data( 'cell' ) + c ).data( 'cell-row', n ).text('');
	});
}

/*$.fn.addRow = function( row, opt, head ){
	var defaults = {
		noedit: [],
		auto: [],
		formats: [],
		decimals: [],
	};
	var options = $.extend( defaults, opt ),
		$tbody = this.find( 'tbody' ),
		i = ( undefined === row ? $tbody.find('tr').length : row ),
		$row = $( '<tr data-table-row="' + i + '"></tr>' ).appendTo( $tbody ),
		max = $( $tbody.find('tr')[0] ).find('td').length;

	for (var j = 0; j < max; j++) {
		var ind = ( undefined === head ? j : head[j] );
		var cls = ( $.isNumeric( ind ) ? '' : ind );
		var noedit = ( options.noedit.length && options.noedit[ind] );
		$row.append( '<td class="cell' + ( cls ? ' ' + cls : '' ) + ( noedit ? ' no-edit' : '' ) + '" data-cell="' + (i+1)*j + '" data-cell-row="' + i + '" data-cell-column="' + j + '" data-cell-format="' + ( options.formats[ind] ? options.formats[ind] : 'string' ) + '" data-cell-decimal="' + ( options.decimals[ind] ? options.decimals[ind] : 0 ) + ' data-cell-auto="' + ( options.auto[ind] ? options.auto[ind] : '' ) + '"></th>' );
	}
}*/

$.fn.getRow = function( row, body ){
	return $( $(this).find( ( body ? body : 'tbody ' ) + ( $.isNumeric( row ) ? '[data-table-row="' + row + '"]' : 'tr.' + row ) ) );
}

// *****************************************************
// *	SORTABLE TABLE
// *****************************************************

	$.fn.sortColumn = function () {

		return this.each( function() {

			var $this = $(this),
				$table = $this.parent().parent().parent(),
				format = ( $this.data('column-format') ? $this.data('column-format') : 'string' ),
				decimal = parseInt( $this.data('column-decimal') ? $this.data('column-decimal') : 0 ),
				sort = $this.data('column-sort') !== false,
				evt = $.Event( 'sort' );

			$this.trigger( evt );
			if( evt.result === false || !sort )
				return false;

			$this.siblings().removeClass( 'sort-down' ).removeClass( 'sort-up' );

			if( $this.hasClass( 'sort-down' ) ){
				$this.removeClass( 'sort-down' );
				$this.addClass( 'sort-up' );

			}else if( $this.hasClass( 'sort-up' ) ){
				$this.removeClass( 'sort-up' );

			}else{
				$this.addClass( 'sort-down' );

			}
			
		});
	}

	$.fn.orderTable = function( order ) {

		return this.each( function() {

			var $this = $(this),
				$rows = $this.find( 'tbody tr' ),
				neworder = [];

			if( $rows > 0 ){
				for (var i = 0; i < $rows.length; i++) {
					//$rows[i]
				};
			}

		});
	}

	$.fn.sortTable = function () {

		return this.each( function() {

			var $this = $(this),
				$heads = $this.find( 'thead tr.row-head th:not( [data-column-sort="false"] )' );

			if( $heads.length > 0 ){
				$heads.css( 'cursor', 'pointer' )
				.on( 'click', function( e ){
					$(this).sortColumn();
				} );
			}

		});
	}

// *****************************************************
// *	EDITABLE TABLE
// *****************************************************

	$.fn.validCell = function ( set ) { // Add Format Validation
		
		return this.each( function() {

			var $this = $(this),
				val = ( undefined != set ? set : $this.val() ),
				format = ( $this.data('cell-format') ? $this.data('cell-format') : 'string' ),
				correct = $this.data('cell-correct') !== false,
				decimal = parseInt( $this.data( 'cell-decimal' ) ),
				evt = $.Event( 'validate' );

			$this.trigger( evt, val );
			if( evt.result === false )
				$this.addClass( 'error' );
			else
				$this.removeClass( 'error' );

		});
	}

	$.fn.editCell = function ( set ) {
		
		return this.each( function() {
		
			var $this = $(this),
				val = ( undefined != set ? set : $this.val() ),
				format = ( $this.data('cell-format') ? $this.data('cell-format') : 'string' ),
				correct = $this.data('cell-correct') !== false,
				auto = $this.data('cell-auto') === true,
				decimal = parseInt( $this.data( 'cell-decimal' ) ),
				evt = $.Event('change'),
				orig;

			// Text is the same || Validate Event returned Error = keeps original text
			if( $this.text() === val.toString() || $this.hasClass('error') )
				return true;

			// Autocorrect > Format = corrects value by format
			if( correct ){
				$this.removeClass('error');
				if( auto || ( !auto && val !== '' ) ){
					switch( format ){
						case 'int':
						case 'number':
						case 'float':
							val = $.Numeric( val );
							if( val === false ) return true;
							val = parseFloat( val );
							if( format == 'int' ) val = Math.round( val );
							else if( decimal ) val = val.toFixed( decimal );
						break;
					}
				}
			}
			
			// Change Event = back to original text if Event returned false
			orig = $this.html();
			$this.text( val.toString() ).trigger( evt, val );
			if( evt.result === false )
				$this.html( orig );
		});
	}

	$.fn.editTable = function( opt ){

		'use strict';
		return this.each( function(){

			var defaultOptions = function () {
					var opts = $.extend({}, $.fn.editTable.defaults);
					opts.editor = opts.editor.clone();
					return opts;
				},
				options = $.extend( defaultOptions(), opt );
			
			var ARROW_LEFT = 37, ARROW_UP = 38, ARROW_RIGHT = 39, ARROW_DOWN = 40, ENTER = 13, ESC = 27, TAB = 9;

			var $this = $(this),
				$parent = $this.parent(),
				$input = options.editor.css( 'position', 'absolute' ).hide().appendTo( $parent ),
				offset = options.offset,
				width = ( 'width' in offset ? offset.width : 0 ),
				height = ( 'height' in offset ? offset.height : 0 ),
				$cell,
				cmdKey = false;

			var showEditor = function( select ) {
					$cell = $this.find( 'td.edit:focus' );
					if( $cell.length ){
						$cell.removeClass('error');
						var name = $cell.data( 'column-name' );
						//var $list = $( 'datalist#list-' + name );
						var list = $this.find( 'th[data-column-name="' + name + '"]' ).data( 'auto-complete' );

						$input.val( $cell.text() )
							.show()
							.offset( $cell.offset() )
							.css( $cell.css( options.props ) )
							.width( $cell.width() + width )
							.height( $cell.height() + height );

						if( list ){
							
							//$list.empty();
							var $cells = $this.find( 'td[data-column-name="' + name + '"]' ).not( $cell );
							var arr = [];
						    $cells.each(function() {
						        if ($.inArray($(this).text(), arr) == -1)
						            arr.push($(this).text());
						    });

						    /*for (var i = 0; i < arr.length; i++) {
						        $( '<option value="' + arr[i] + '">' ).appendTo( $list );
						    }
						    $input.attr( 'list', 'list-' + name );*/
						    $input.autocomplete( {
						    	source: arr,
						    	appendTo: $parent,
							});
						}

						$input.focus();

						if( select )
							$input.select();
					}
				},
				checkCell = function( cell, keycode ){
					var arr = [];
					if( keycode ){
						if( keycode === ARROW_RIGHT )
							arr = ( !cmdKey ? cell.nextAll( 'td.edit:first' ) : cell.nextAll( 'td.edit:last' ) );
						else if(keycode === ARROW_LEFT)
							arr = ( !cmdKey ? cell.prevAll( 'td.edit:first' ) : cell.prevAll( 'td.edit:last' ) );
						else if(keycode === ARROW_UP)
							arr = ( !cmdKey ? cell.parent().prev().children().eq( cell.index() ) : cell.parent().prevAll( 'tr:last' ).children().eq( cell.index() ) );
						else if(keycode === ARROW_DOWN)
							arr = ( !cmdKey ? cell.parent().next().children().eq( cell.index() ) : cell.parent().nextAll( 'tr:last' ).children().eq( cell.index() ) );
						else if(keycode === true)
							arr = cell.filter( '.edit' );
						else
							return arr;
						return arr.filter( '.edit' );
					}

					return arr;
				};

			$input.blur( function(){
				$cell.editCell( $input.val() );
				$input.hide();
			}).keydown( function( e ){
				if( e.which === ENTER ){
					$cell.editCell( $input.val() );
					$input.hide();
					$cell.focus();
					e.preventDefault();
					e.stopPropagation();
				}else if( e.which === ESC ){
					$input.val( $cell.text() );
					e.preventDefault();
					e.stopPropagation();
					$input.hide();
					$cell.focus();
				}else if( e.which === TAB ){
					$cell.focus();
				}/*else if( this.selectionEnd - this.selectionStart === this.value.length ){
					var check = checkCell( $cell, e.which );
					if( check.length > 0 ){
						check.focus();
						e.preventDefault();
						e.stopPropagation();
					}
				}*/
			})
			.on( 'input paste', function(){
				$cell.validCell( $input.val() );
			});

			$this.find( 'td' ).prop( 'tabindex', 1 ).addClass('edit');
			//$this.find( '[data-cell-edit="false"]' ).removeClass('edit');
			$this.find( '.no-edit' ).removeClass('edit');
			$this.on( 'click keypress dblclick', function( e ){
				showEditor( true );
			})
			.keydown( function( e ){
				if( e.which == 93 ) cmdKey = true;
				var prevent = true,
					check = checkCell( $( e.target ), e.which );
				if( check.length > 0 ){
					check.focus();
				}else if( e.which === ENTER ){
					showEditor( true );
				}/*else if( e.which === 17 || e.which === 91 || e.which === 93 ){
					showEditor( true );
					prevent = false;
				}*/else{
					prevent = false;
				}
				if( prevent ){
					e.stopPropagation();
					e.preventDefault();
				}
			}).keyup( function( e ){
				if( e.which == 93 ) cmdKey = false;
			});

			$( window ).on( 'resize', function () {
				if( $input.is(':visible') ) {
					$input.offset( $cell.offset() )
					.width( $cell.width() + width )
					.height( $cell.height() + height );
				}
			});
		});

	};
	$.fn.editTable.defaults = {
		props: ['padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right',
						  'text-align', 'font', 'font-size', 'font-family', 'font-weight',
						  'border-radius', 'border', 'border-top', 'border-bottom', 'border-left', 'border-right'],
		editor: $('<input>'),
		offset: { 'width': 0, 'height': 0 },
	};


// *****************************************************
// *      TABLE HEAD ICONS
// *****************************************************

$.getTableIcon = function( name ){
	var icon = {
		classes: 'pin',
		value: '',
	};
	switch( name ){
		case 'count':
		icon.classes = icon.classes + ' count light-purple';
		icon.value = '<i class="fa fa-hashtag"></i>';
		break;
		case 'date':
		icon.classes = icon.classes + ' date light-green';
		icon.value = '<i class="fa fa-calendar-o"></i>';
		break;
		case 'time':
		icon.classes = icon.classes + ' time light-purple';
		icon.value = '<i class="fa fa-clock-o"></i>';
		break;
		case 'best':
		icon.classes = icon.classes + ' best light-red';
		icon.value = '<i class="fa fa-thumbs-up"></i>';
		break;
		case 'average':
		icon.classes = icon.classes + ' average light-red';
		icon.value = '<i class="fa fa-area-chart"></i>';
		break;
		case 'worst':
		icon.classes = icon.classes + ' worst light-red';
		icon.value = '<i class="fa fa-thumbs-down"></i>';
		break;
		case 'win':
		icon.classes = icon.classes + ' win light-blue';
		icon.value = '<i class="fa fa-trophy"></i>';
		break;
		case 'game':
		icon.classes = icon.classes + ' game light-green';
		icon.value = '<i class="fa fa-gamepad"></i>';
		break;
		case 'player':
		icon.classes = icon.classes + ' player grey';
		icon.value = '<i class="fa fa-male"></i>';
		break;
		case 'star':
		icon.classes = icon.classes + ' star light-blue';
		icon.value = '<i class="fa fa-star"></i>';
		break;
		case 'gold':
		icon.classes = icon.classes + ' star gold';
		icon.value = '<i class="fa fa-star"></i>';
		break;
		case 'silver':
		icon.classes = icon.classes + ' star silver';
		icon.value = '<i class="fa fa-star"></i>';
		break;
		case 'bronze':
		icon.classes = icon.classes + ' star bronze';
		icon.value = '<i class="fa fa-star"></i>';
		break;
		case 'wood':
		icon.classes = icon.classes + ' star wood';
		icon.value = '<i class="fa fa-star"></i>';
		break;
		case 'chart':
		icon.classes = icon.classes + ' chart light-green';
		icon.value = '<i class="fa fa-pie-chart"></i>';
		break;
		case 'goal':
		icon.classes = icon.classes + ' goal light-green';
		icon.value = '<i class="fa fa-font-awesome"></i>';
		break;
		default:
		icon.classes = icon.classes + ' scores light-blue';
		icon.value = '<i class="fa text">' + name[0] + '</i>';
		break;
	}
	return icon;
}


})( jQuery );
