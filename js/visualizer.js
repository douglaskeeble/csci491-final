var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, $(".canvas.col-12").width() / $(".canvas.col-12").height(), 1, 1000);
var renderer = new THREE.WebGLRenderer();
var controls;

document.getElementById("visuals").appendChild(renderer.domElement);

var WIDTH = $(".canvas.col-12").width();
var HEIGHT = $(".canvas.col-12").height() + 112;

var bars = 32;
var barSpacing = 6;

//Simple Visualizer

var cubes = new Array();
for (var i = 0; i < bars; i++) {
    cubes[i] = new THREE.Mesh(new THREE.CubeGeometry(5, 1, 5), new THREE.MeshNormalMaterial());
    cubes[i].position.y = 0;
    cubes[i].position.x = -1 * bars / 2 * barSpacing + i * barSpacing;
    scene.add(cubes[i]);
}
//Setup the lighting
var light = new THREE.AmbientLight(0x505050);
scene.add(light);

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);


directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(0, -1, -1);
scene.add(directionalLight);

directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(-1, -1, 0);
scene.add(directionalLight);

//Setup the camera 
camera.position.z = 50;
controls = new THREE.OrbitControls(camera);
controls.addEventListener('change', render);

for (var i = 0; i < 7; i++) {
    controls.pan(new THREE.Vector3(1, 0, 0));
    controls.pan(new THREE.Vector3(0, 1, 0));
}

// The audioLevels array will control the visualization animations
function update() {
    requestAnimationFrame(update);
    //Make sure there is some data to animate
    if (typeof audioLevels === 'object' && audioLevels.length > 0) {
        var spacing = audioLevels.length / bars - 3; //Subtract a few off, the higher levels arent very active at all
        for (var i = 0; i < cubes.length; i++) {
            var scale = audioLevels[i * spacing] / 5;
            if (scale > 0) {
                cubes[i].scale.y = scale;
            }
        }
    }
    render();
}

var render = function () {

    controls.update();
    renderer.render(scene, camera);
};

update();
renderer.setSize(WIDTH, HEIGHT);

