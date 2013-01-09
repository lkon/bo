var jam = {
    "packages": [
        {
            "name": "jquery",
            "location": "vendor/jquery",
            "main": "jquery.js"
        },
        {
            "name": "tagsinput",
            "location": "vendor/jquery-tagsinput",
            "main": "jquery.tagsinput.min.js"
        },
        {
            "name": "tablesorter",
            "location": "vendor/jquery-tablesorter",
            "main": "jquery.tablesorter.min.js"
        },
        {
            "name": "bootstrap",
            "location": "vendor/bootstrap/js",
            "main": "bootstrap.min.js"
        },
        {
            "name": "datepicker",
            "location": "vendor/bootstrap-datepicker/js",
            "main": "bootstrap-datepicker.js"
        }
    ],
    "version": "0.2.11",
    "shim": {}
};

if (typeof require !== "undefined" && require.config) {
    require.config({packages: jam.packages, shim: jam.shim});
}
else {
    var require = {packages: jam.packages, shim: jam.shim};
}

if (typeof exports !== "undefined" && typeof module !== "undefined") {
    module.exports = jam;
}