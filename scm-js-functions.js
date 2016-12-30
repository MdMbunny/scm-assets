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

// **********************************************
// NUMBER
// **********************************************

// Prototype

var toHHMMSS = function (num) {
    var hours   = Math.floor(num / 3600);
    var minutes = Math.floor((num - (hours * 3600)) / 60);
    var seconds = num - (hours * 3600) - (minutes * 60);

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

var objSize = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

// **********************************************
// ARRAY
// **********************************************

// Prototype

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

var arrSwap = function( arr, a, b ){

    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
    return arr;

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