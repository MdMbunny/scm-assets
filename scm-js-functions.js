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
// OBJECT
// **********************************************

Object.size = function(obj) {
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

Array.prototype.move = function( from, to ){
    while(from < 0) {
        from += this.length;
    }
    while (to < 0) {
        to += this.length;
    }
    if (to >= this.length) {
        var k = to - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(to, 0, this.splice(from, 1)[0]);
};

Array.prototype.swap = function( a, b ){

    var temp = this[a];
    this[a] = this[b];
    this[b] = temp;

};

Array.prototype.csvSwapColumn = function( a, b ){
    for (var i = 0; i < this.length; i++) {
        this[i].swap( a, b );
    }
}

Array.prototype.csvMoveColumn = function( from, to ){
    for (var i = 0; i < this.length; i++) {
        this[i].move( from, to );
    }
}

Array.prototype.csvInsertColumn = function( col, index ){
    index = ( undefined == index ? this.length : index );
    for (var i = 0; i < this.length; i++) {
        this[i].splice(index, 0, col);
        if(!i) col = '';
    }
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