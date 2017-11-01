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
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++){
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
    }

    return rgb;
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

function isNumeric(num){
    return !isNaN(num);
}

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

function sanitizeTitle(str){
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";

    for (var i=0, l=from.length ; i<l ; i++)
   {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

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

// **********************************************
// NUMBER
// **********************************************

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

// **********************************************
// OBJECT
// **********************************************

function objValues(obj){
    return Object.keys(obj).map(function(key){
        return obj[key];
    });
}

function objSize(obj){
    var size = 0, key;
    for (key in obj){
        if (obj.hasOwnProperty(key)) size++;
    }
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

function toArray( obj ){
    return Array.isArray( obj ) ? obj : [ obj ];
}

function arrClean( arr ){
    var clean = [];
    for( var i = 0; i < arr.length; i++ ){
        if( arr[i] || arr[i] === 0 )
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

// **********************************************