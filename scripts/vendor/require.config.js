var jam = {
    "packages": [
        {
            "name": "text",
            "location": "vendor/text",
            "main": "text.js"
        },
        {
            "name": "console-log",
            "location": "vendor/console-log"
        },
        {
            "name": "datepicker-amd",
            "location": "vendor/datepicker-amd",
            "main": "datepicker.js"
        },
        {
            "name": "add-active",
            "location": "vendor/add-active"
        },
        {
            "name": "jquery-ui-amd",
            "location": "vendor/jquery-ui-amd"
        },
        {
            "name": "jquery",
            "location": "vendor/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "toggle-block",
            "location": "vendor/toggle-block"
        },
        {
            "name": "Socialite",
            "location": "vendor/Socialite",
            "main": "socialite.js"
        },
        {
            "name": "waitforimages",
            "location": "vendor/waitforimages",
            "main": "jquery.waitforimages.js"
        },
        {
            "name": "respond",
            "location": "vendor/respond",
            "main": "respond.min.js"
        },
        {
            "name": "js-error-log",
            "location": "vendor/js-error-log"
        },
        {
            "name": "underscore",
            "location": "vendor/underscore",
            "main": "underscore.js"
        },
        {
            "name": "jquery-cookie-amd",
            "location": "vendor/jquery-cookie-amd",
            "main": "jquery.cookie.js"
        },
        {
            "name": "tabs",
            "location": "vendor/tabs"
        },
        {
            "name": "equal-height",
            "location": "vendor/equal-height"
        },
        {
            "name": "Modernizr",
            "location": "vendor/Modernizr"
        },
        {
            "name": "colorbox",
            "location": "vendor/colorbox"
        },
        {
            "name": "fileuploader",
            "location": "vendor/file-uploader",
            "main": "fileuploader.js"
        },
        {
            "name": "jquery.tinymce",
            "location": "vendor/tiny_mce",
            "main": "jquery.tinymce.js"
        }
    ],
    "version": "0.2.11",
    "shim": {
        "underscore": {
            "exports": "_"
        }
    }
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