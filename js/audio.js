var context;
var source, sourceJs;
var analyser;
var url = 'data/mcplus.mp3';
var audioLevels = new Array();
var boost = 0;

try {
    if (typeof webkitAudioContext === 'function' || 'webkitAudioContext' in window) {
        context = new webkitAudioContext();
    }
    else {
        context = new AudioContext();
    }
}
catch (e) {
    $('#info').text('Web Audio API is not supported in this browser');
}

function bufferSong(file) {

    var request = new XMLHttpRequest();
    request.open("GET", file, true);
    request.responseType = "arraybuffer";

    request.onload = function () {
        context.decodeAudioData(
            request.response,
            function (buffer) {
                if (!buffer) {
                    $('#info').text('Error decoding file data');
                    return;
                }
                sourceJs = context.createScriptProcessor(2048, 1, 1);
                sourceJs.buffer = buffer;
                sourceJs.connect(context.destination);
                analyser = context.createAnalyser();
                analyser.smoothingTimeConstant = 0.6;
                analyser.fftSize = 512;

                source = context.createBufferSource();
                source.buffer = buffer;
                source.loop = false;

                source.connect(analyser);
                analyser.connect(sourceJs);
                source.connect(context.destination);

                sourceJs.onaudioprocess = function (e) {
                    audioLevels = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(audioLevels);
                    boost = 0;
                    for (var i = 0; i < audioLevels.length; i++) {
                        boost += audioLevels[i];
                    }
                    boost = boost / audioLevels.length;
                };
                
                	source.start(0);
            },
            function (error) {
                $('#info').text('Decoding error:' + error);
            }
        );

    };

    request.onerror = function () {
        $('#info').text('buffer: XHR error');
    };

    request.send();

};