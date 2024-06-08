function ViewportDimensions() {
  var element = document.getElementById('container3D');

  let multiplier = 1.5;
  var width = multiplier * element.parentElement.clientWidth;

  return { width: aspectRatio * width, height: width * (1 / aspectRatio) };
}

let aspectRatio = 4000 / 3000;

import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let object;
let controls;

const loader = new GLTFLoader();

loader.load(
`/assets/images/${document.title}/scene.gltf`,
function (gltf) {
    object = gltf.scene;
    scene.add(object);

    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
            child.material.linewidth = 2;
            child.material.roughness = 0.5; // Adjusted for softer details
            child.material.metalness = 0; // Set to 0 for non-metallic look
            child.material.metalness = 0; // Set to 0 for non-metallic look
        }
    });
},
function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
},
function (error) {
    console.error(error);
}
);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.8; // Adjust exposure to reduce contrast
renderer.outputEncoding = THREE.sRGBEncoding; // Ensure correct color space

document.getElementById("container3D").appendChild(renderer.domElement);
camera.position.z = 210;

// Natural lighting setup
const hemisphereLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 0.6); // Soft sky light
scene.add(hemisphereLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Simulating sunlight
directionalLight.position.set(500, 500, 500);
directionalLight.castShadow = true; // Enable shadows
directionalLight.shadow.mapSize.width = 2048; // Increase shadow resolution
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 1500;
directionalLight.shadow.camera.left = -500;
directionalLight.shadow.camera.right = 500;
directionalLight.shadow.camera.top = 500;
directionalLight.shadow.camera.bottom = -500;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x333333, 0.9); // Increased intensity for softer lighting
scene.add(ambientLight);

controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false; // Disable zooming in OrbitControls

// Add a listener for the mouse wheel event to handle zooming
// document.addEventListener('wheel', function(event) {
//   // Prevent the default behavior of the mouse wheel
//   event.preventDefault();
  
//   // Calculate the new zoom level based on the mouse wheel delta
//   const factor = event.deltaY < 0 ? 1.1 : 0.9; // Increase zoom if scrolling up, decrease otherwise
//   camera.zoom *= factor;
//   camera.updateProjectionMatrix(); // Update the projection matrix after changing the zoom level
// }, { passive: false }); // Use passive: false to prevent the default browser behavior




function animate() {
  requestAnimationFrame(animate);

  if (object) {
      object.rotation.y = -4 + mouseX / window.innerWidth * 6;
      object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
  }

  renderer.render(scene, camera);
}

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

animate();
