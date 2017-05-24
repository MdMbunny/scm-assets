// **********************************************
// SCROLL
// **********************************************

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}

// **********************************************
// COLORS
// **********************************************

function rgbToHex(rgb) {
    return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
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

function colorLuminance(hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
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

// **********************************************
// IMG
// **********************************************

var isPortrait = function( img ){
    var w = img.naturalWidth || img.width,
        h = img.naturalHeight || img.height;
    return ( h > w );
}

// **********************************************
// STRING
// **********************************************

// Utils

var formatDate = function( date, dsep, sep, hsep ){
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

var sanitizeTitle = function (str){
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

var isURL = function(str) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(str);
}

var escapeJSON = function( str ) {
    return str.replace(/\\n/g, "\\n")
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
};

var oppositePos = function( pos ){
    return ( pos == 'top' ? 'bottom' : ( pos == 'bottom' ? 'top' : ( pos == 'left' ? 'right' : 'left' ) ) );
}

// **********************************************
// NUMBER
// **********************************************

// Prototype

var toHHMMSS = function( num ){
    num = Math.round( num );
    var hours   = Math.floor( num / 3600 );
    num -= hours*3600;
    var minutes = Math.floor( num / 60 );
    num -= minutes*60;
    var seconds = Math.floor(num - (hours * 3600) - (minutes * 60));

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

var toHHMM = function (num) {
    var hours   = Math.floor(num / 3600);
    var minutes = Math.floor((num - (hours * 3600)) / 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    return hours+':'+minutes;
}

// **********************************************
// OBJECT
// **********************************************

var sortByKey = function( obj, key ) {
    var keys = [];
    var nobj = {}
    for(var k in obj){
        if (obj.hasOwnProperty(k))
            keys.push(k);
    }

    keys.sort( function( a, b ){
        return obj[a][key] - obj[b][key];
    
    });
    for (var i = 0; i < keys.length; i++) {
        nobj[keys[i]] = obj[keys[i]];
    };

    return nobj;

};

var objSize = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

var objInsert = function(obj,n,k) {
    var o = {};
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

var objToArray = function(obj) {
    var arr = [];
    for (key in obj) {
        if (obj.hasOwnProperty(key)) arr.push( { key: obj[key] } );
    }
    return arr;
};
var arrToObject = function(arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        var k,v = '';
        k = Object.keys(arr[i])[0];
        v = arr[i][k];
        obj[k] = v;
    };
    return obj;
}

// **********************************************
// ARRAY
// **********************************************

var arrUnique = function( arr ) {
    var a = arr.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

var arrMove = function( arr, from, to ){
    while(from < 0) {
        from += arr.length;
    }
    while (to < 0) {
        to += arr.length;
    }
    if (to >= arr.length) {
        var k = to - arr.length;
        while ((k--) + 1) {
            arr.push(undefined);
        }
    }
    arr.splice(to, 0, arr.splice(from, 1)[0]);
    return arr;
};
/*var arrMove = function( arr, from, to ){
    if (to >= arr.length) {
        var k = to - arr.length;
        while ((k--) + 1) {
            arr.push(undefined);
        }
    }
    
    arr.splice(to, 0, arr.splice(from, 1)[0]);
    return arr;
};*/


var arrSwap = function( arr, a, b ){

    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
    return arr;

};

var arrCombinations = function(input,permArr,usedChars) {
    if( !permArr ) permArr = [];
    if( !usedChars ) usedChars = [];

    var i, ch;
    for (i = 0; i < input.length; i++) {
        ch = input.splice(i, 1)[0];
        usedChars.push(ch);
        if (input.length == 0) {
            permArr.push(usedChars.slice());
        }
        arrCombinations(input,permArr,usedChars);
        input.splice(i, 0, ch);
        usedChars.pop();
    }
    return permArr
};

var csvSwapColumn = function( arr, a, b ){
    for (var i = 0; i < arr.length; i++) {
        arr = arrSwap( arr[i], a, b );
    }
    return arr;
}

var csvMoveColumn = function( arr, from, to ){
    for (var i = 0; i < arr.length; i++) {
        arr = arrMove( arr[i], from, to );
    }
    return arr;
}

var csvInsertColumn = function( arr, col, index ){
    index = ( undefined == index ? arr.length : index );
    for (var i = 0; i < arr.length; i++) {
        arr[i].splice(index, 0, col);
        if(!i) col = '';
    }
    return arr;
}

// Utils

var sortKeys = function( obj ) {
    var keys = [];
    for(var key in obj)
    	keys.push(key);
    return keys.sort(function(a,b){return obj[a]-obj[b]});
}

var rsortKeys = function( obj ) {
    var keys = [];
    for(var key in obj)
    	keys.push(key);
    return keys.sort(function(a,b){return obj[b]-obj[a]});
}


// **********************************************