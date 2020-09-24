require.config({
    baseUrl : "js",
    paths : {
        "jquery":"../plugins/js/jquery",
        "lazyload":"../plugins/js/jquery.lazyload"
    },
    shim: {
        "lazyload": {
            deps: ["jquery"],
            exports: "lazyload"
        },
        //'jquery.colorize': ['jquery'],
    }
})
require([
        "jquery",
        "lazyload",
        "util"
    ],
    function($,lazyload,util){
        if(util.isIE()){
            $("header").addClass("ie_pic");
        }
        if(util.isWebkit()){
            $("main > article .mini_text").css("height","38px");
        }
        if(util.isphone()){
            $("main > article .mini_text").css("font-family","HelveticaNeue-UltraLight,'Helvetica Neue UltraLight'");
        }

    })
