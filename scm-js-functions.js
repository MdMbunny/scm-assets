// **********************************************
// SCROLL
// **********************************************

function preventDefault(e){
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
function preventDefaultForScrollKeys(e){
    var keys ={37: 1, 38: 1, 39: 1, 40: 1};
    if (keys[e.keyCode]){
        preventDefault(e);
        return false;
    }
}

function disableScroll(){
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll(){
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}

// **********************************************
// SORT
// **********************************************

function sortAsc(a, b){
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
}

function sortDesc(a, b){
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
}

// **********************************************
// DATE AND TIME
// **********************************************

function dateDiff( ol, nw, str ){

    var dt1 = new Date( ol );
    var dt2 = nw ? new Date( nw ) : new Date();
    var diff = ( nw || dt2.getTime() ) - ol;

    var y = dt2.getUTCFullYear() - dt1.getUTCFullYear();
    var m = dt2.getUTCMonth() - dt1.getUTCMonth();// + ( y != 0 ? y * 12 : 0 );
    y -= ( m<0 ? 1 : 0 );
    m = ( m<0 ? 12+m : m );

    var temp = new Date( dt1.getTime() );
    temp.setFullYear( temp.getFullYear() + y, temp.getMonth() + m );
    var tdiff = ( nw || dt2.getTime() ) - temp.getTime();
    
    var s = parseInt( Floor( m / 3 ) );
    var d = Floor( tdiff / 1000 / 60 / 60 / 24 );
    m -= ( d<0 ? 1 : 0 );

    temp = new Date( dt1.getTime() );
    temp.setFullYear( temp.getFullYear() + y, temp.getMonth() + m );
    tdiff = ( nw || dt2.getTime() ) - temp.getTime();

    d = Floor( tdiff / 1000 / 60 / 60 / 24 );

    var w = Floor( d / 7 );

    var yy = ( y === 1 ? 'year' : 'years' );
    var mm = ( m === 1 ? 'month' : 'months' );
    var dd = ( d === 1 ? 'day' : 'days' );

    return {
        diff: diff,
        years: y,
        seasons: s,
        months: m,
        days: d,
        weeks: w,
        string: ( y ? y + ' ' + yy + ( m || d ? ', ' : '' ) : '' ) + ( m ? m + ' ' + mm + ( d ? ', ' : '' ) : '' ) + ( d ? d + ' ' + dd : '' ),
    };
}

function timeToSec( time ){
    var sec = 0;
    var arr = time.split( ':' ).reverse();
    for( var k in arr )
        sec += Math.pow( 60, k ) * arr[k];
    
    return sec;
}

function toHHMMSS( num ){
    num = Math.round( num );
    var hours   = Math.floor( num / 3600 );
    num -= hours*3600;
    var minutes = Math.floor( num / 60 );
    num -= minutes*60;
    var seconds = Math.floor(num - (hours * 3600) - (minutes * 60));

    if (hours   < 10){hours   = "0"+hours;}
    if (minutes < 10){minutes = "0"+minutes;}
    if (seconds < 10){seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

function toHHMM(num){
    var hours   = Math.floor(num / 3600);
    var minutes = Math.floor((num - (hours * 3600)) / 60);

    if (hours   < 10){hours   = "0"+hours;}
    if (minutes < 10){minutes = "0"+minutes;}
    return hours+':'+minutes;
}

function toMS( hrs, min, sec ){
    return( ( (+hrs||0) * 60 * 60 + (+min||0) * 60 + (+sec||0) ) * 1000 );
}

function dateSortAsc(a, b){
    var date1 = dateToMS(a);
    var date2 = dateToMS(b);
    return sortAsc( date1, date2 );
}

function dateSortDesc(a, b){
    var date1 = dateToMS(a);
    var date2 = dateToMS(b);
    return sortDesc( date1, date2 );
}

function toDate(val){
    var date = val.split('-');
    return new Date(date[2], date[1] - 1, date[0]);
}
function dateToMS(val){
    return toDate(val).getTime();
}

// **********************************************
// HTML
// **********************************************

function clearSelection(){
    if ( document.selection ){
        document.selection.empty();
    } else if ( window.getSelection ){
        window.getSelection().removeAllRanges();
    }
}

function getit( tag, txt, cls, col, bg, data ){
    return '<' + ( tag || 'p' ) + ' class="' + ( cls || 'text' ) + ( col || bg ? ' color-it' : '' ) + '"' + ( col ? ' data-color-it="' + col + '"' : '' ) + ( bg ? ' data-color-bg="' + bg + '"' : '' ) + ( data ? ' ' + data : '' ) + '>' + txt + '</' + ( tag || 'p' ) + '>';
}

function getImg( url, cls, alt, data ){
    return '<img src="' + ( url || '' ) + '" class="' + ( cls || 'image' ) + '"' + ( alt ? ' alt="' + alt + '"' : '' ) + ( data ? ' ' + data : '' ) + '>';
}

function getColumn( col, cls ){
    return getit( 'div', '', 'column-layout' + ( cls ? ' ' + cls : '' ), '', '', 'data-column="' + ( col != '11' ? 'middle' : 'solo' ) + '" data-column-width="' + ( col || '11' ) + '"' );
}

function getTitle( tit, tag, cls, col, bg, data ){
    return getit( 'h' + ( tag || '1' ), tit, ( cls || 'title' ) + ( col || bg ? ' color-it' : '' ), col, bg, data );
}

function getSpan( txt, cls, col, bg, data ){
    return getit( 'span', txt, cls, col, bg, data );
}

function getDiv( cls, col, bg, data ){
    return getit( 'div', '', cls, col, bg, data );
}

function getIcon( icon, cls, col, bg, data, tag ){

    if( undefined === icon || !icon ) return '';

    var ico = '';
    var second = '';
    var html = '';
    cls = ( cls ? ' ' + cls : '' );
    data = ( col ? ' data-color-it="' + col + '"' : '' ) + ( bg ? ' data-color-bg="' + bg + '"' : '' ) + ( data ? ' ' + data : '' );
    if( typeof icon != 'string' ){
        ico = ' fa-stack-1x';
        second = icon[0];
        icon = icon[1];
    }

    if( icon.length > 1 )
        html = '<i class="fa ' + icon + ico + cls + '"' + data + '></i>';
    else if( icon )
        html = '<' + ( tag || 'i' ) + ' class="fa text letter' + ico + cls + '"' + data + '>' + icon + '</' + ( tag || 'i' ) + '>';
    
    if( second ) html = '<' + ( tag || 'span' ) + ' class="fa-stack fa-lg' + cls + '"' + data + '><i class="fa ' + second + ' fa-stack-2x">' + html + '</i></' + ( tag || 'span' ) + '>';

    return html;

}

// **********************************************
// COLORS
// **********************************************

function rgbToHex(rgb){
    if( typeof rgb == 'string' ) return rgb;
    return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
}

function hexToRgb(hex){
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b){
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?{
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function hslToRgb(h, s, l){
        var r, g, b;

        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            var hue2rgb = function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

function colorLuminance(hex, lum){

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6){
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var ret = "#", c, i;
    for (i = 0; i < 3; i++){
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        ret += ("00"+c).substr(c.length);
    }

    return ret;
}

function colorsContrast(F, B){
    F= String(F).match(/\d+/g), 
    B= String(B).match(/\d+/g);
    var abs= Math.abs, 
    BG= (B[0]*299 + B[1]*587 + B[2]*114)/1000, 
    FG= (F[0]*299 + F[1]*587 + F[2]*114)/1000, 
    bright= Math.round(Math.abs(BG - FG)), 
    diff= abs(B[0]-F[0])+abs(B[1]-F[1])+abs(B[2]-F[2]);
    return [bright, diff];
}

function getHexBrightness( color ){

    color = color.replace( '#', '' );
    var r = parseInt( color.substring( 0, 2 ), 16 );
    var g = parseInt( color.substring( 2, 4 ), 16 );
    var b = parseInt( color.substring( 4, 6 ), 16 );

    return r*2 + g*2 + b;
}

function brighterColor( hexa, hexb ){
    var cola = getHexBrightness( hexa );
    var colb = getHexBrightness( hexb );
    if( cola > colb ) return hexa;
    return hexb;
}

// **********************************************
// IMG
// **********************************************

function isPortrait( img ){
    var w = img.naturalWidth || img.width,
        h = img.naturalHeight || img.height;
    return ( h > w );
}

// **********************************************
// STRING
// **********************************************

// Utils

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate( date, dsep, sep, hsep ){
    dsep = dsep || '';
    sep = sep || '';
    hsep = hsep || '';
    var month = day = hours = mins = secs = year = '';
    if( !date ){
        var d = new Date();
        month = d.getMonth()+1;
        day = d.getDate();
        hours = d.getHours();
        mins = d.getMinutes();
        secs = d.getSeconds();
        year = d.getFullYear();
    }else{
        month = date.mon;
        day = date.mday;
        hours = date.hours;
        mins = date.minutes;
        secs = date.seconds;
        year = date.year;
    }

    var ret = year + dsep +
        (month<10 ? '0' : '') + month + dsep +
        (day<10 ? '0' : '') + day + sep +
        (hours<10 ? '0' : '') + hours + hsep +
        (mins<10 ? '0' : '') + mins + hsep +
        (secs<10 ? '0' : '') + secs;

    return ret;
}

function splitTrim( string, sep ){
    return arrClean( string.split( sep || ',' ).map( function(v){ return trimString(v); } ) );
}
function splitSanitize( string, sep ){
    return arrClean( string.split( sep || ',' ).map( function(v){ return sanitizeTitle(v); } ) );
}

var replaceBetween = function( str, needle, replace, sep ){
    sep = sep || ',';
    if( !str || !needle || !replace ) return '';
    var arr = str.split( sep );
    for( var i in arr ){
        if( arr[i] == needle ) 
        arr[i] = replace;
    }
    return arr.join(sep);
}

function trimString( string ){
    return string.replace(/^\s+|\s+$/g, '');
}

function sanitizeTitle(str,sub){
    str = trimString( str );
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";

    for (var i=0, l=from.length ; i<l ; i++)
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, sub || '-') // collapse whitespace and replace by -
        .replace(/-+/g, sub || '-'); // collapse dashes

    return str;
}

function isURL(str){
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(str);
}

function escapeJSON( str ){
    return str.replace(/\\n/g, "\\n")
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
};

function oppositePos( pos ){
    return ( pos == 'top' ? 'bottom' : ( pos == 'bottom' ? 'top' : ( pos == 'left' ? 'right' : 'left' ) ) );
}

function replaceAll( search, replace, txt ){
    return txt.replace(new RegExp(search, 'g'), replace);
}

function removeSpaces( string, sub ){
    return string.replace( /\s+/g, sub || '' );
}

function validateEmail( email ){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test( email );
}

var getFileExtension = function( string ){
    return ( string.substring( string.lastIndexOf( '.' ) + 1, string.length ) || string ).split( '/' )[0];
}

// **********************************************
// NUMBER
// **********************************************

function isNumeric(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function Round( num, rnd ){
    rnd = rnd && rnd !== true ? rnd : 0;
    var mlt = '1';
    for( var i = 0; i < rnd; i++){
        mlt = mlt + '0';
    }
    mlt = parseInt( mlt );
    return Math.round( num * mlt ) / mlt;
}
function Floor( num, rnd ){
    rnd = rnd && rnd !== true ? rnd : 0;
    var mlt = '1';
    for( var i = 0; i < rnd; i++){
        mlt = mlt + '0';
    }
    mlt = parseInt( mlt );
    return Math.floor( num * mlt ) / mlt;
}
function Ceil( num, rnd ){
    rnd = rnd && rnd !== true ? rnd : 0;
    var mlt = '1';
    for( var i = 0; i < rnd; i++){
        mlt = mlt + '0';
    }
    mlt = parseInt( mlt );
    return Math.ceil( num * mlt ) / mlt;
}

// **********************************************
// OBJECT
// **********************************************

function count( elem ){
    if( Array.isArray( elem ) || typeof elem == 'string' ) return elem.length;
    return objSize( elem );
}

function isObject( obj ){
    return obj !== null && typeof obj === 'object';
}

function objMerge( a, b ){
    for( var key in b ){
        if (b.hasOwnProperty(key))
            a[key] = b[key];
    }
    return a;
}

function cloneObject( obj ){
    return JSON.parse(JSON.stringify(obj));
}

function objKeys( obj ){
    var arr = [];
    for (key in obj)
        if (obj.hasOwnProperty(key)) arr.push( key );
    
    return arr;
}

function objValues( obj ){
    var arr = [];
    for (key in obj)
        if (obj.hasOwnProperty(key)) arr.push( obj[key] );
    
    return arr;
}

function objFirstKey(obj){
    return Object.keys(obj)[0];
}
function objFirstValue(obj){
    return obj[Object.keys(obj)[0]];
}
function objLastKey(obj){
    return Object.keys(obj)[objSize(obj)-1];
}
function objLastValue(obj){
    return obj[Object.keys(obj)[objSize(obj)-1]];
}

function objValues(obj){
    return Object.keys(obj).map(function(key){
        return obj[key];
    });
}

function objSize(obj){
    var size = 0, key;
    for (key in obj)
        if (obj.hasOwnProperty(key)) size++;
    
    return size;
};

function objInsert(obj,n,k){
    var o ={};
    var key, nkey;
    for( key in obj ){
        if( obj.hasOwnProperty(key) ){
            if( k !== '' && ( !k || k==key ) ){
                k = '';
                for( nkey in n ){
                    if( n.hasOwnProperty(nkey) ){
                        o[nkey] = n[nkey];
                    }
                }
            }
            
            o[key] = obj[key];
            
        }
    }

    return o;
};

function objToArray(obj){
    var arr = [];
    for (var key in obj){
        if (obj.hasOwnProperty(key)) arr.push({ key: obj[key] } );
    }
    return arr;
};
function arrToObject(arr){
    var obj ={};
    for (var i = 0; i < arr.length; i++){
        var k,v = '';
        k = Object.keys(arr[i])[0];
        v = arr[i][k];
        obj[k] = v;
    };
    return obj;
}

function sortObj( obj ){
    var nobj ={};
    
    var keys = Object.keys( obj ),
        i, len = keys.length;

    keys.sort();

    for (i = 0; i < len; i++){
      k = keys[i];
      nobj[k] = obj[k];
    }

    return nobj;

}

function rsortObj( obj ){
    var nobj ={};
    
    var keys = Object.keys( obj ),
        i, len = keys.length;

    keys.sort();
    keys.reverse();

    for (i = 0; i < len; i++){
      k = keys[i];
      nobj[k] = obj[k];
    }

    return nobj;

}

function rsortByKey( obj, key ){
    var keys = [];
    var nobj ={}
    for(var k in obj){
        if (obj.hasOwnProperty(k))
            keys.push(k);
    }

    keys.sort( function( a, b ){
        return obj[b][key] - obj[a][key];
    
    });
    for (var i = 0; i < keys.length; i++){
        nobj[keys[i]] = obj[keys[i]];
    };

    return nobj;

};
function sortByKey( obj, key ){
    var keys = [];
    var nobj ={}
    for(var k in obj){
        if (obj.hasOwnProperty(k))
            keys.push(k);
    }

    keys.sort( function( a, b ){
        return obj[a][key] - obj[b][key];
    
    });
    for (var i = 0; i < keys.length; i++){
        nobj[keys[i]] = obj[keys[i]];
    };

    return nobj;

};

function sortKeys( obj ){
    var keys = [];
    for(var key in obj)
        keys.push(key);
    return keys.sort(function(a,b){return obj[a]-obj[b]});
}

function rsortKeys( obj ){
    var keys = [];
    for(var key in obj)
        keys.push(key);
    return keys.sort(function(a,b){return obj[b]-obj[a]});
}

function objByValueKey( obj, value, key ){
    key = key || 'name';
    for( var k in obj ){
        if( obj[k] && obj[k][key] !== undefined && obj[k][key] === value )
            return k;
    }
    return '';
}

function objNext( obj, key, loop ){
    var keys = Object.keys( obj );
    var ind = keys.indexOf(key);
    if( ind < 0 ) return false;
    if( ind == keys.length-1 ){
        if( loop ) ind = 0;
    }else{
        ind = ind + 1;
    }
    return obj[keys[ind]];
}
function objPrev( obj, key, loop ){
    var keys = Object.keys( obj );
    var ind = keys.indexOf(key);
    if( ind < 0 ) return false;
    if( !ind ){
        if( loop ) ind = keys.length-1;
    }else{
        ind = ind - 1;
    }
    return obj[keys[ind]];
}

// **********************************************
// ARRAY
// **********************************************

function letterRange( start, stop ){
  var result = [];
  for( var idx = start.charCodeAt(0), end = stop.charCodeAt(0); idx <= end; ++idx ){
    result.push( String.fromCharCode( idx ) );
  }
  return result;
}

function toArray( obj ){
    return Array.isArray( obj ) ? obj : [ obj ];
}

function inArray( arr, elem ){
    return arr.indexOf( elem ) > -1;
}

function arrRemove( arr, elem ){
    var index = arr.indexOf( elem );
    if( index > -1 )
        arr.splice( index, 1 );
}

function arrAdd( arr, elem ){
    if( !arr ) arr = [];
    if( undefined === elem ) return arr.length;
    if( !inArray( arr, elem ) )
        return arr.push( elem );
}

function arrClean( arr ){
    var clean = [];
    for( var i = 0; i < arr.length; i++ ){
        if( arr[i] || arr[i] === 0 || arr[i] === false )
            clean.push( arr[i] );
    }
    return clean;
}

function arrEqual( a, b ){
    if( a === b ) return true;
    if( a == null || b == null ) return false;
    if( a.length != b.length ) return false;

    a = a.concat().sort();
    b = b.concat().sort();

    for( var i = 0; i < a.length; ++i ){
        if( a[i] !== b[i] ) return false;
    }
    return true;
}

function arrUnique( arr ){
    var a = arr.concat();
    for( var i = 0; i < a.length; ++i ){
        for( var j = i + 1 ; j < a.length; ++j ){
            if( a[i] === a[j] )
                a.splice( j--, 1 );
        }
    }
    return a;
}

function arrMerge(){
    var args = Array.prototype.slice.call( arguments );
    var a = [];
    for( var i = 0; i < args.length; ++i ){
       a = a.concat( args[i] );
    }
    return arrUnique( a );
}

function arrMove( arr, from, to ){
    while(from < 0){
        from += arr.length;
    }
    while (to < 0){
        to += arr.length;
    }
    if (to >= arr.length){
        var k = to - arr.length;
        while ((k--) + 1){
            arr.push(undefined);
        }
    }
    arr.splice(to, 0, arr.splice(from, 1)[0]);
    return arr;
};

function arrSwap( arr, a, b ){

    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
    return arr;

};

function arrClone( arr ){
 return arr.slice(0);
}

function arrCombinations(input,permArr,usedChars){
    if( !permArr ) permArr = [];
    if( !usedChars ) usedChars = [];

    var i, ch;
    for (i = 0; i < input.length; i++){
        ch = input.splice(i, 1)[0];
        usedChars.push(ch);
        if (input.length == 0){
            permArr.push(usedChars.slice());
        }
        arrCombinations(input,permArr,usedChars);
        input.splice(i, 0, ch);
        usedChars.pop();
    }
    return permArr;
};

function arrSum( arr ){
    return arrClone(arr).reduce( function(a, b) { return a + b; }, 0 );
}

function arrAverage( arr ){
    //arr = arr.values();
    var tot = arr.length;
    if (!tot)
        return 0;
    return arrSum( arr ) / tot;
}

function getAllByValue( arr, value ){
    var res = [];
    for( var k in arr ){
        if( arr[k] !== undefined && arr[k] === value )
            res.push( k );
    }
    return res;
}

function getAllByValueKey( arr, value, key ){
    key = key || 'name';
    var res = [];
    for( var k in arr ){
        if( arr[k] && arr[k][key] !== undefined && arr[k][key] === value )
            res.push( k );
    }
    return res;
}

function getByValueKey( arr, value, key ){
    key = key || 'name';
    for( var k in arr ){
        if( arr[k] && arr[k][key] !== undefined && arr[k][key] === value )
            return k;
    }
    return -1;
}

function arrNext( arr, val, attr, loop ){

    var ind = parseInt( getByValueKey( arr, val, attr ) );
    if( ind < 0 ) return false;
    if( ind == arr.length-1 ){
        if( loop ) ind = 0;
    }else{
        ind = ind + 1;
    }
    return arr[ind];
}
function arrPrev( arr, val, attr, loop ){

    var ind = parseInt( getByValueKey( arr, val, attr ) );
    if( ind < 0 ) return false;
    if( !ind ){
        if( loop ) ind = arr.length-1;
    }else{
        ind = ind - 1;
    }
    return arr[ind];
}


function csvGetColumns( csv, head ){
    var arr = [];
    for( var i in head ){
        arr[ head[i] ] = csvGetColumn( csv, head[i] );
    }
    return arr;
}

function csvGetColumn( csv, head ){
    if( typeof head == 'string' ) head = csvGetColumnIndex( csv, head );
    var arr = [];
    for( var i = 1; i < csv.length; i++ )
        arr.push( csv[i][head] );
    return arr;
}

function csvGetColumnIndex( csv, head ){
    return csv[0].indexOf( head );
}

function csvRemoveColumn( arr, index ){
    var index = ( undefined == index ? arr.length : index );
    for (var i = 0; i < arr.length; i++){
        arr[i].splice( index, 1 );
    }
    return arr;
}

function csvSwapColumn( arr, a, b ){
    for (var i = 0; i < arr.length; i++){
        arr = arrSwap( arr[i], a, b );
    }
    return arr;
}

function csvMoveColumn( arr, from, to ){
    for (var i = 0; i < arr.length; i++){
        arr = arrMove( arr[i], from, to );
    }
    return arr;
}

function csvInsertColumn( arr, col, index ){
    index = ( undefined == index ? arr.length : index );
    for (var i = 0; i < arr.length; i++){
        arr[i].splice(index, 0, col);
        if(!i) col = '';
    }
    return arr;
}

function arrMultisort(arr){

  //   example 1: array_multisort([1, 2, 1, 2, 1, 2], [1, 2, 3, 4, 5, 6])
  //   returns 1: true
  //   example 2: var $characters = {A: 'Edward', B: 'Locke', C: 'Sabin', D: 'Terra', E: 'Edward'}
  //   example 2: var $jobs = {A: 'Warrior', B: 'Thief', C: 'Monk', D: 'Mage', E: 'Knight'}
  //   example 2: array_multisort($characters, 'SORT_DESC', 'SORT_STRING', $jobs, 'SORT_ASC', 'SORT_STRING')
  //   returns 2: true
  //   example 3: var $lastnames = [ 'Carter','Adams','Monroe','Tyler','Madison','Kennedy','Adams']
  //   example 3: var $firstnames = ['James', 'John' ,'James', 'John', 'James',  'John',   'John']
  //   example 3: var $president = [ 39, 6, 5, 10, 4, 35, 2 ]
  //   example 3: array_multisort($firstnames, 'SORT_DESC', 'SORT_STRING', $lastnames, 'SORT_ASC', 'SORT_STRING', $president, 'SORT_NUMERIC')
  //   returns 3: true
  //      note 1: flags: Translation table for sort arguments.
  //      note 1: Each argument turns on certain bits in the flag byte through addition.
  //      note 1: bits: HGFE DCBA
  //      note 1: args: Holds pointer to arguments for reassignment

  var g;
  var i;
  var j;
  var k;
  var l;
  var sal;
  var vkey;
  var elIndex;
  var lastSorts;
  var tmpArray;
  var zlast;

  var sortFlag = [0];
  var thingsToSort = [];
  var nLastSort = [];
  var lastSort = [];
  // possibly redundant
  var args = arguments;

  var flags = {
    'SORT_REGULAR': 16,
    'SORT_NUMERIC': 17,
    'SORT_STRING': 18,
    'SORT_ASC': 32,
    'SORT_DESC': 40
  }

  var sortDuplicator = function (a, b) {
    return nLastSort.shift()
  }

  var sortFunctions = [
    [

      function (a, b) {
        lastSort.push(a > b ? 1 : (a < b ? -1 : 0))
        return a > b ? 1 : (a < b ? -1 : 0)
      },
      function (a, b) {
        lastSort.push(b > a ? 1 : (b < a ? -1 : 0))
        return b > a ? 1 : (b < a ? -1 : 0)
      }
    ],
    [

      function (a, b) {
        lastSort.push(a - b)
        return a - b
      },
      function (a, b) {
        lastSort.push(b - a)
        return b - a
      }
    ],
    [

      function (a, b) {
        lastSort.push((a + '') > (b + '') ? 1 : ((a + '') < (b + '') ? -1 : 0))
        return (a + '') > (b + '') ? 1 : ((a + '') < (b + '') ? -1 : 0)
      },
      function (a, b) {
        lastSort.push((b + '') > (a + '') ? 1 : ((b + '') < (a + '') ? -1 : 0))
        return (b + '') > (a + '') ? 1 : ((b + '') < (a + '') ? -1 : 0)
      }
    ]
  ]

  var sortArrs = [
    []
  ]

  var sortKeys = [
    []
  ]

  // Store first argument into sortArrs and sortKeys if an Object.
  // First Argument should be either a Javascript Array or an Object,
  // otherwise function would return FALSE like in PHP
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    sortArrs[0] = arr
  } else if (arr && typeof arr === 'object') {
    for (i in arr) {
      if (arr.hasOwnProperty(i)) {
        sortKeys[0].push(i)
        sortArrs[0].push(arr[i])
      }
    }
  } else {
    return false
  }

  // arrMainLength: Holds the length of the first array.
  // All other arrays must be of equal length, otherwise function would return FALSE like in PHP
  // sortComponents: Holds 2 indexes per every section of the array
  // that can be sorted. As this is the start, the whole array can be sorted.
  var arrMainLength = sortArrs[0].length
  var sortComponents = [0, arrMainLength]

  // Loop through all other arguments, checking lengths and sort flags
  // of arrays and adding them to the above variables.
  var argl = arguments.length
  for (j = 1; j < argl; j++) {
    if (Object.prototype.toString.call(arguments[j]) === '[object Array]') {
      sortArrs[j] = arguments[j]
      sortFlag[j] = 0
      if (arguments[j].length !== arrMainLength) {
        return false
      }
    } else if (arguments[j] && typeof arguments[j] === 'object') {
      sortKeys[j] = []
      sortArrs[j] = []
      sortFlag[j] = 0
      for (i in arguments[j]) {
        if (arguments[j].hasOwnProperty(i)) {
          sortKeys[j].push(i)
          sortArrs[j].push(arguments[j][i])
        }
      }
      if (sortArrs[j].length !== arrMainLength) {
        return false
      }
    } else if (typeof arguments[j] === 'string') {
      var lFlag = sortFlag.pop()
      // Keep extra parentheses around latter flags check
      // to avoid minimization leading to CDATA closer
      if (typeof flags[arguments[j]] === 'undefined' ||
        ((((flags[arguments[j]]) >>> 4) & (lFlag >>> 4)) > 0)) {
        return false
      }
      sortFlag.push(lFlag + flags[arguments[j]])
    } else {
      return false
    }
  }

  for (i = 0; i !== arrMainLength; i++) {
    thingsToSort.push(true)
  }

  // Sort all the arrays....
  for (i in sortArrs) {
    if (sortArrs.hasOwnProperty(i)) {
      lastSorts = []
      tmpArray = []
      elIndex = 0
      nLastSort = []
      lastSort = []

      // If there are no sortComponents, then no more sorting is neeeded.
      // Copy the array back to the argument.
      if (sortComponents.length === 0) {
        if (Object.prototype.toString.call(arguments[i]) === '[object Array]') {
          args[i] = sortArrs[i]
        } else {
          for (k in arguments[i]) {
            if (arguments[i].hasOwnProperty(k)) {
              delete arguments[i][k]
            }
          }
          sal = sortArrs[i].length
          for (j = 0, vkey = 0; j < sal; j++) {
            vkey = sortKeys[i][j]
            args[i][vkey] = sortArrs[i][j]
          }
        }
        sortArrs.splice(i, 1)
        sortKeys.splice(i, 1)
        continue
      }

      // Sort function for sorting. Either sorts asc or desc, regular/string or numeric.
      var sFunction = sortFunctions[(sortFlag[i] & 3)][((sortFlag[i] & 8) > 0) ? 1 : 0]

      // Sort current array.
      for (l = 0; l !== sortComponents.length; l += 2) {
        tmpArray = sortArrs[i].slice(sortComponents[l], sortComponents[l + 1] + 1)
        tmpArray.sort(sFunction)
        // Is there a better way to copy an array in Javascript?
        lastSorts[l] = [].concat(lastSort)
        elIndex = sortComponents[l]
        for (g in tmpArray) {
          if (tmpArray.hasOwnProperty(g)) {
            sortArrs[i][elIndex] = tmpArray[g]
            elIndex++
          }
        }
      }

      // Duplicate the sorting of the current array on future arrays.
      sFunction = sortDuplicator
      for (j in sortArrs) {
        if (sortArrs.hasOwnProperty(j)) {
          if (sortArrs[j] === sortArrs[i]) {
            continue
          }
          for (l = 0; l !== sortComponents.length; l += 2) {
            tmpArray = sortArrs[j].slice(sortComponents[l], sortComponents[l + 1] + 1)
            // alert(l + ':' + nLastSort);
            nLastSort = [].concat(lastSorts[l])
            tmpArray.sort(sFunction)
            elIndex = sortComponents[l]
            for (g in tmpArray) {
              if (tmpArray.hasOwnProperty(g)) {
                sortArrs[j][elIndex] = tmpArray[g]
                elIndex++
              }
            }
          }
        }
      }

      // Duplicate the sorting of the current array on array keys
      for (j in sortKeys) {
        if (sortKeys.hasOwnProperty(j)) {
          for (l = 0; l !== sortComponents.length; l += 2) {
            tmpArray = sortKeys[j].slice(sortComponents[l], sortComponents[l + 1] + 1)
            nLastSort = [].concat(lastSorts[l])
            tmpArray.sort(sFunction)
            elIndex = sortComponents[l]
            for (g in tmpArray) {
              if (tmpArray.hasOwnProperty(g)) {
                sortKeys[j][elIndex] = tmpArray[g]
                elIndex++
              }
            }
          }
        }
      }

      // Generate the next sortComponents
      zlast = null
      sortComponents = []
      for (j in sortArrs[i]) {
        if (sortArrs[i].hasOwnProperty(j)) {
          if (!thingsToSort[j]) {
            if ((sortComponents.length & 1)) {
              sortComponents.push(j - 1)
            }
            zlast = null
            continue
          }
          if (!(sortComponents.length & 1)) {
            if (zlast !== null) {
              if (sortArrs[i][j] === zlast) {
                sortComponents.push(j - 1)
              } else {
                thingsToSort[j] = false
              }
            }
            zlast = sortArrs[i][j]
          } else {
            if (sortArrs[i][j] !== zlast) {
              sortComponents.push(j - 1)
              zlast = sortArrs[i][j]
            }
          }
        }
      }

      if (sortComponents.length & 1) {
        sortComponents.push(j)
      }
      if (Object.prototype.toString.call(arguments[i]) === '[object Array]') {
        args[i] = sortArrs[i]
      } else {
        for (j in arguments[i]) {
          if (arguments[i].hasOwnProperty(j)) {
            delete arguments[i][j]
          }
        }

        sal = sortArrs[i].length
        for (j = 0, vkey = 0; j < sal; j++) {
          vkey = sortKeys[i][j]
          args[i][vkey] = sortArrs[i][j]
        }
      }
      sortArrs.splice(i, 1)
      sortKeys.splice(i, 1)
    }
  }
  return true
}

// **********************************************