const mouse = new THREE.Vector2();

const vertex = `        uniform float time;
uniform vec2 resolution;
void main()	{
    gl_Position = vec4( position, 1.0 );
}`;

const fragment = `uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform vec4 resolution;
uniform vec2 vUv;
uniform vec4 vPosition;

void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}`;

var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

controls = new THREE.TrackballControls(camera, renderer.domElement);

controls.rotateSpeed = 5.0;
controls.zoomSpeed = 5;
controls.panSpeed = 2;

controls.noZoom = false;
controls.noPan = false;

controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;
var light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

var light1 = new THREE.PointLight(0xff0000, 1, 100);
light1.position.set(0, 0, 0);
scene.add(light1);

var geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
// var texture = new THREE.TextureLoader().load("./undoing.svg");

var material = new THREE.ShaderMaterial({
  extensions: {
    derivatives: "#extension GL_OES_standard_derivatives : enable",
  },
  side: THREE.DoubleSide,
  uniforms: {
    time: { type: "f", value: 0 },
    resolution: { type: "v4", value: new THREE.Vector4() },
    uvRate1: {
      value: new THREE.Vector2(1, 1),
    },
    vertexShader: vertex,
    fragmentShaer: fragment,
  },
});
// // immediately use the texture for material creation
// var planematerial = new THREE.MeshBasicMaterial({ map: planetexture });
// planematerial.transparent = true;
var plane = new THREE.Mesh(geometry, material);
// plane.rotation.y = Math.PI / 8;
plane.position.set(0, 0, 0);
scene.add(plane);
camera.position.set(0, 0, 5);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var raycaster = new THREE.Raycaster();
var INTERSECTED = null;

function raycast() {
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    console.log(intersects[0]);
  } else {
    if (INTERSECTED)
      // INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      INTERSECTED = null;
  }
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  // plane.rotation.y += 0.01;

  renderer.render(scene, camera);
  //   raycast();
}

const addEventListeners = () => {
  // window.addEventListener("resize", onResizeHandler);
  // window.addEventListener("mousemove", onMouseMove);
};

const removeEventListeners = () => {
  window.removeEventListener("resize", onResizeHandler);
  window.removeEventListener("mousemove", onMouseMove);
};

addEventListeners();

animate();
