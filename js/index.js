$(function () {

    //首页内容的动态加载
    var json_url;
    var page_url;
    if($("html").attr("date_num")=="1"){
        json_url="blog.json";
        page_url="";
    }
    else{
        json_url="../../blog.json";
        page_url="../../";
    }
    var num=parseInt($("html").attr("date_num"))-1;
    var big_num;
    var page_num;
    var page_flag=1;

    $.getJSON(json_url,function(result){
        $.each(result, function(i, field){
            //首页内容的动态加载
            var content="";
            if(num*5+5 > field.length){
                big_num=field.length;
            }else{
                big_num=num*5+5;
            }
            for(var i=num*5;i<big_num;i++){
                var img_url=page_url+field[i].img;
                var url=page_url+field[i].url;
                var title=field[i].title;
                var tag=field[i].tag;
                var tag_arr=tag.split('-');
                var date=field[i].date;
                var text=field[i].text;
                content += "<article><a href="+url+" class='pic'><img class='lazy' src="+img_url+"></a><div class='text'><a href="+url+" class='title'>"+title+"</a>"
                    + "<div class='date'>"+date+"</div><div class='tag_a'>";
                for(var j=0;j<tag_arr.length;j++){
                    content +="<a class='tag' href='"+classify(tag_arr[j])+"'>"+tag_arr[j]+"</a>"
                }
                content += "</div><div class='mini_text'>"+text+"</div><a href="+url+" class='read_btn'>阅读原文</a>"
                        + "</div></article>";
            }
            $("main").append(content);

            //翻页内容的动态加载
            page_num=Math.ceil(field.length/5);
            if(page_flag==1){
                var nav_content="";
                var now_num=parseInt($("html").attr("date_num"));
                var url;
                if(now_num > 1){
                    if(now_num==2){
                        nav_content+="<span class='page'><a href='../../'>Newer Posts ←</a></span>";
                    }else{
                        url="../"+(now_num-1)+"/";
                        nav_content+="<span class='page'><a href='"+url+"'>Newer Posts ←</a></span>";
                    }
                }
                nav_content+="<span>Page "+now_num+" of "+page_num+"</span>";
                if(page_num > now_num){
                    if(now_num==1){
                        url="page/"+(now_num+1)+"/";
                        nav_content+="<span class='page'><a href='"+url+"'>Older Posts →</a></span>";
                    }else{
                        url="../"+(now_num+1)+"/";
                        nav_content+="<span class='page'><a href='"+url+"'>Older Posts →</a></span>";
                    }
                }
                $("nav span").append(nav_content);
                page_flag=0;
            }
        });
        //不同浏览器的兼容性适配
        if(isIE()){
            $("header").addClass("ie_pic");
        }
        if(isWebkit()){
            $("main > article .mini_text").css("height","38px");
        }
        if(isphone()){
            $("main > article .mini_text").css("font-family","HelveticaNeue-UltraLight,'Helvetica Neue UltraLight'");
        }
        $("img.lazy").lazyload({effect: "fadeIn"});
    });


    //回到顶部功能
    $(".top").click(function () {
        $('html,body').animate({scrollTop:0},500);
        $('.top').animate({bottom:"100vh"},500,function () {
            $(".top").css("bottom","50px");
        });
    })
    window.addEventListener('scroll',scrollHandler);
    function scrollHandler(){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop > 400){
            $(".top").addClass("active");
        }else if(scrollTop < 400){
            $(".top").removeClass("active");
        }
    }

    //翻页按钮按下效果
    $("body").on("mousedown","nav .page",function () {
        $(this).addClass('active');
    })
    $("body").on("mouseup","nav .page",function () {
        $(this).removeClass('active');
    })



    function getAbsoluteUrl(url){
        var a = document.createElement('A');
        a.href = url;  // 设置相对路径给Image, 此时会发送出请求
        url = a.href;  // 此时相对路径已经变成绝对路径
        return url;
    }
    function isIE() {
        if (!!window.ActiveXObject || "ActiveXObject" in window)
            return true;
        else
            return false;
    }
    function isWebkit() {
        var body=document.getElementsByTagName("body")[0];
        if(typeof body.style.WebkitAnimation!="undefined")
            return true;
        else
            return false;
    }
    function isphone() {
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
    function classify(name) {
        var url;
        switch(name) {
            case "CANVAS":url="classify/canvas/";break;
            case "CSS":url="classify/css/";break;
            case "随笔":url="classify/eassay/";break;
            case "JS":url="classify/js/";break;
            case "电影":url="classify/movie/";break;
            case "历程":url="classify/progress/";break;
            case "读书":url="classify/read/";break;
            case "旅行":url="classify/travel/";break;
            case "SVG":url="classify/svg/";break;
            case "HTML":url="classify/html/";break;
        }
        if($("html").attr("date_num")!="1"){
            url="../../"+url;
        }
        return url;
    }
})
window.onload=function () {
    $(".head_gif").show();
}