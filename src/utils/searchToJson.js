export function urlArgs(location){ 
    var args = {};
    if(location==={}||location===null||location===undefined)
        return {};
    var query = location.search.substring(1); 
    var pairs = query.split("&"); 
    for(var i = 0;i < pairs.length; i++){ 
        var pos = pairs[i].indexOf("="); 
        if(pos === -1) 
        continue; 
        var name = pairs[i].substring(0, pos); 
        var value = pairs[i].substring(pos + 1); 
        value = decodeURIComponent(value); 
        args[name] = value; 
    } 
    return args; 
}
/* * 使用方法 
 * var args = urlArgs(location);
 * var q = args.q || ""; 
 * 
 * * var n = args.n ? parseInt(args.n) : 10; 
 * */

