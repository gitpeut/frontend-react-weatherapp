

function createTimeString( unixTime ){
    //convert UNIX time to a Date object

    const  jsTime = new Date( (unixTime*1000) );
    return jsTime.toLocaleString([], { hour: '2-digit', minute: '2-digit' });

}

export default createTimeString;