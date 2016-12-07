// JavaScript source code
$(document).ready(function () {

    var text2 = "";
    var song1 = "data\song1.mp3";
    var song2 = "data\song2.mp3";

    $(".slider").hide();
    $("#localChoice").hide();
    $("#streamingChoice").hide();

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

    $("#pause").on({
        click: function () {
            alert(text2);
        },
    });

    $("#song1").on({
        click: function () {
            bufferSong('data/song1.mp3');
        },
    });

    $("#song2").on({
        click: function () {
            bufferSong('data/song2.mp3');
        },
    });

    document.getElementById('file').addEventListener('change', function (event) {
        var file = this.files[0];
        var objectUrl = URL.createObjectURL(file);

        bufferSong(objectUrl);
        //alert(song);
        //song.start(0);
    });

    $(window).resize(function () {
        $("canvas").width($(".canvas.col-12").width());
        $("canvas").height($(".canvas.col-12").height() + 112);
    });
});