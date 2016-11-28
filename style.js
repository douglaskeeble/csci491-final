// JavaScript source code
$(document).ready(function () {
    $(".slider").hide();
    $("#localChoice").hide();
    $("#sandwich").on({
        click: function () {
            $(".slider").toggle(1000);
        },
    });
    $("#local").on({
        click: function () {
            $("#localChoice").toggle(1000);
        },
    });
    $("#streaming").on({
        click: function () {
            $("#streamingChoice").toggle(1000);
        },
    });

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    $("canvas").width($(".canvas.col-12").width());
    $("canvas").height($(".canvas.col-12").height());
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Placeholder", canvas.width / 2, canvas.height / 2);
    
    document.getElementById('file').addEventListener('change', function (event) {
        var file = this.files[0];
        var objectUrl = URL.createObjectURL(file);
        document.getElementById('audio').src = objectUrl;
        $("#songTitle").append(file.URL);
    });

    $(window).resize(function () {
        $("canvas").width($(".canvas.col-12").width());
        $("canvas").height($(".canvas.col-12").height());
    });
});