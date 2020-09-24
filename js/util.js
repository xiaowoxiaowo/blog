define([], function() {
        return {
            getAbsoluteUrl:function (url){
                var a = document.createElement('A');
                a.href = url;  // 设置相对路径给Image, 此时会发送出请求
                url = a.href;  // 此时相对路径已经变成绝对路径
                return url;
            },
            isIE:function() {
                if (!!window.ActiveXObject || "ActiveXObject" in window)
                    return true;
                else
                    return false;
            },
            isWebkit:function () {
                var body=document.getElementsByTagName("body")[0];
                if(typeof body.style.WebkitAnimation!="undefined")
                    return true;
                else
                    return false;
            },
            isphone:function () {
                    var sUserAgent = navigator.userAgent.toLowerCase();
                    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
                    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
                    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
                    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
                    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
                    var bIsAndroid = sUserAgent.match(/android/i) == "android";
                    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
                    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
                    var bisWX = sUserAgent.match(/MicroMessenger/i)=="micromessenger";
                    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM || bisWX) {
                        return true;
                    } else {
                        return false;
                    }

            }



        }
    }
);
