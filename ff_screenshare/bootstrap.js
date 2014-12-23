var domains = ["l.vidya.io"];
var addon_domains = []; // list of domains the addon added
var PREF = "media.getusermedia.screensharing.allowed_domains";

function startup(data, reason) {
    if (reason === APP_STARTUP) {
        return;
    }
    var prefs = Components.classes["@mozilla.org/preferences-service;1"]
            .getService(Components.interfaces.nsIPrefBranch);
    var values = prefs.getCharPref(PREF).split(',');
    domains.forEach(function (domain) {
        if (values.indexOf(domain) === -1) {
            values.push(domain);
            addon_domains.push(domain);
        }
    });
    prefs.setCharPref(PREF, values.join(','));
}

function shutdown(data, reason) {
    if (reason === APP_SHUTDOWN) {
        return;
    }

    var prefs = Components.classes["@mozilla.org/preferences-service;1"]
            .getService(Components.interfaces.nsIPrefBranch);
    var values = prefs.getCharPref(PREF).split(',');
    values = values.filter(function (value) {
        return addon_domains.indexOf(value) === -1;
    });
    prefs.setCharPref(PREF, values.join(','));
}

function install(data, reason) {}

function uninstall(data, reason) {}
