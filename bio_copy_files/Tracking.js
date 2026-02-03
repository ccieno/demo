function HC_SetCookie(e, t) {
    date = new Date, date.setTime(date.getTime() + 31536e7), document.cookie = e + "=" + escape(t) + "; path=/;SameSite=None;Secure=true; expires=" + date.toGMTString()
}

function TokenInRequest() {
    var e = document.URL.toLowerCase(),
        t = e.indexOf("bearertoken=");
    if (-1 == t) return null;
    t += 12;
    var n = e.indexOf("&", t);
    return -1 == n && (n = e.length), e.substring(t, n)
}

function ParInRequest(e) {
    var t = document.URL.toLowerCase(),
        n = t.indexOf(e + "=");
    if (-1 == n) return null;
    n += e.length + 1;
    var r = t.indexOf("&", n);
    return -1 == r && (r = t.length), t.substring(n, r)
}

function HC_GetCookie(e) {
    for (var t = document.cookie.split("; "), n = 0; n < t.length; n++) {
        var r = t[n].split("=");
        if (e == r[0]) return unescape(r[1])
    }
    return null
}

function GenerateUniqueID() {
    function e() {
        return Math.random().toString(16).slice(-4)
    }
    var t = +new Date;
    return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e() + "-" + t.toString()
}

function SaveTracking() {
    var e = HC_GetCookie("AtreemoUniqueID_cookie");
    HC_SetCookie("AtreemoUniqueID_cookie", null == e ? e = GenerateUniqueID() : e);
    var r = null, n = null;
    try {
        r = AtreemoTrackingLbr.InitParams(1);
    } catch (e) { }

    if (r != null) {
        n = AtreemoTrackingLbr.InitParams(0);
    }
    else {
        var t = AtreemoTrackingLbr.InitParams(0);
        n = t.split(",")[0];
        r = t.split(",")[1];
    }


    var o = document.referrer;
    var i = document.getElementsByTagName("BODY")[0];
    null != i && null != i || (i = document.getElementsByTagName("body")[0]);
    var a = document.createElement("img");
    a.style.display = "none", a.width = "1", a.height = "1", (r.trim().indexOf(".webecast.acteol.com") >= 0) || (r.trim().indexOf(".webecast.atreemo.uk") >= 0) || (r.trim().indexOf(".webecast.acteol.info") >= 0) ? a.src = r.trim() + "/savetracking?CustomerCode=" + n + "&p=" + document.URL + "&UniqueID=" + e + "&Referer=" + o : a.src = r.trim() + "/savetracking.aspx?CustomerCode=" + n + "&p=" + document.URL + "&UniqueID=" + e + "&Referer=" + o, null != i && null != i && i.appendChild(a)
}

function SaveTrackingOld() {
    var e = e = HC_GetCookie("AtreemoUniqueID_cookie"),
        t = HC_GetCookie("AtreemoCookiesToken_cookie"),
        n = TokenInRequest();
    t == n && null != n ? AlreadyTaraccked = !0 : null != t ? n = t : null == n ? null == e && HC_SetCookie("AtreemoUniqueID_cookie", e = GenerateUniqueID()) : HC_SetCookie("AtreemoCookiesToken_cookie", n);
    var r = document.referrer,
        o = document.getElementsByTagName("BODY")[0];
    null != o && null != o || (o = document.getElementsByTagName("body")[0]);
    var i = document.createElement("img");
    i.style.display = "none", i.width = "1", i.height = "1", i.src = null != n ? "https://tracking.atreemo.com/Track/Save?CustomerCode=" + AtreemoTrackingLbr.InitParams(0) + "&Token=" + n + "&p=" + document.URL + "&UniqueID=" + e + "&Referer=" + r : "https://tracking.atreemo.com/Track/Save?CustomerCode=" + AtreemoTrackingLbr.InitParams(0) + "&Token=" + n + "&p=" + document.URL + "&Referer=" + r + "&UniqueID=" + e, null != o && null != o && o.appendChild(i)
}
try {
    var url = null;
    try {
        url = AtreemoTrackingLbr.InitParams(1);
    } catch (e) { }

    if (url == null) {
        var obj = AtreemoTrackingLbr.InitParams(0);
        if (obj.split(",")[1] != null)
            SaveTracking();
        else
            SaveTrackingOld();
    }
    else {
        SaveTracking();
    }
    
    //null != obj.split(",")[1] && null != obj.split(",")[1] ? SaveTracking() : SaveTrackingOld()
} catch (e) {
    SaveTrackingOld()
}