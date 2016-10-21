// JavaScript source code
$(document).ready(function(){
    $(".slider").hide();
    $("#sandwich").on({
        click: function () {
            $(".slider").toggle(1000);
        },
    });
});