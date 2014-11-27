$(function(){            
    var lock = false;                     
    var PICNUM = 7; //7张图
    var DELAY = 300;
    var imgStyle = [
        {"width":"122px","height":"105px"},
        {"width":"209px","height":"179px"},
        {"width":"358px","height":"255px"},
        {"width":"481px","height":"320px"},
        {"width":"358px","height":"255px"},
        {"width":"209px","height":"179px"},
        {"width":"122px","height":"105px"}
   ];
    var listStyle = [
        {"left":"0","top":"90px"},
        {"left":"40px","top":"60px"},
        {"left":"100px","top":"30px"},
        {"left":"180px","top":"0"},
        {"left":"380px","top":"30px"},
        {"left":"580px","top":"60px"},
        {"left":"710px","top":"90px"}
    ];

    $("#btn_left").click(function() {
        if(lock == true){return false;}
        lock = true;
        setTimeout(function(){lock = false},500);

        $(".slider li").each(function() {
            var listClass = $(this).attr("class");
            var listIndex = parseInt(listClass.charAt(1)) - 1;
            listIndex == 0 && (listIndex = PICNUM);
            if(listIndex != PICNUM){
                $(this).addClass("p" + listIndex).removeClass(listClass);
            }
            
            $(this).animate({
                "left" : listStyle[listIndex-1].left,
                "top" : listStyle[listIndex-1].top
            }, DELAY, function() {
                if(listIndex == PICNUM){
                    $(this).removeClass(listClass).addClass("p" + listIndex);
                }
            });
            $(this).find("img").animate({
                "width" : imgStyle[listIndex-1].width,
                "height" : imgStyle[listIndex-1].height
            }, DELAY); 
        });
    });

    $("#btn_right").click(function() {
        if(lock == true){return false;}
        lock = true;
        setTimeout(function(){lock = false},500);

        $(".slider li").each(function() {
            var listClass = $(this).attr("class");
            var listIndex = parseInt(listClass.charAt(1)) + 1;
            listIndex > PICNUM && (listIndex = 1);
            $(this).removeClass(listClass).addClass("p" + listIndex);
            $(this).animate({
                "left" : listStyle[listIndex-1].left,
                "top" : listStyle[listIndex-1].top
            }, DELAY);
            $(this).find("img").animate({
                "width" : imgStyle[listIndex-1].width,
                "height" : imgStyle[listIndex-1].height
            }, DELAY);

        });
    });
    $(".slider ul>li.p1,.slider ul>li.p2,.slider ul>li.p3").live("click",function(){
        $("#btn_right").click();
    }),
    $(".slider ul>li.p5,.slider ul>li.p6,.slider ul>li.p7").live("click",function(){
        $("#btn_left").click();
    });
     
});

