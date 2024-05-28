function ViewportDimensions() {
var element = document.getElementById('container3D');

let multiplier = 1.5

var width = multiplier * element.parentElement.clientWidth;
// var height = multiplier * element.parentElement.clientHeight;

return {width: aspectRatio * width, height: width * (1 / aspectRatio)};
}


let aspectRatio = 4000/3000;


//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

//Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
let controls;

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

//Load the file
loader.load(
  `/assets/images/${document.title}/scene.gltf`,
  function (gltf) {
      //If the file is loaded, add it to the scene
      object = gltf.scene;
      scene.add(object);

    // Assuming the model contains materials that can be modified
    gltf.scene.traverse(function (child) {
      if (child.isMesh) {
        child.material.linewidth = 2; // Adjust the linewidth here
        child.material.roughness = 1; // Increase roughness for more pronounced details
      }
    });

  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);



//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({

  alpha: true,

  antialias: true

}); //Alpha: true allows for the transparent background  ==  { alpha: true }
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = 210;

//Add lights to the scene, so we can actually see the 3D model
const sphereLight = new THREE.HemisphereLight(0xffffff, 0xFCF6F5FF, .5); // (color, intensity)

scene.add(sphereLight);

const topLight = new THREE.DirectionalLight(0xffffff, .4); // (color, intensity)
topLight.position.set(500, 500, 500) //top-left-ish
// topLight.castShadow = true;

scene.add(topLight);

// Increase shadow map resolution
topLight.shadow.mapSize.width = 1024;
topLight.shadow.mapSize.height = 1024;


const ambientLight = new THREE.AmbientLight(0x333333, .8);
scene.add(ambientLight);

//This adds controls to the camera, so we can rotate / zoom it with the mouse
// if (objToRender === "boat") {
//   controls = new OrbitControls(camera, renderer.domElement);
// }

///////\\\\\\\\\
// Zoom logic
///////\\\\\\\\\
// Add a listener for the mouse wheel event to handle zooming
// document.addEventListener('wheel', function(event) {
//     // Prevent the default behavior of the mouse wheel
//     event.preventDefault();
    
//     // Calculate the new zoom level based on the mouse wheel delta
//     const factor = event.deltaY < 0? 1.1 : 0.9; // Increase zoom if scrolling up, decrease otherwise
//     camera.zoom *= factor;
//     camera.updateProjectionMatrix(); // Update the projection matrix after changing the zoom level
// }, { passive: false }); // Use passive: false to prevent the default browser behavior
///////\\\\\\\\\
// End Zoom logic
///////\\\\\\\\\

// Modify the animate function to include zooming based on the mouse wheel event
function animate() {
  requestAnimationFrame(animate);

  // Zooming logic remains outside the animate function since it doesn't depend on frame updates

  // Make the eye move
  if (object) {
    object.rotation.y = -4 + mouseX / window.innerWidth * 6;
    object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
  }

  renderer.render(scene, camera);
}

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, this.window.innerHeight);
});

//add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

//Start the 3D rendering
animate();


