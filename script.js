import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const canvas = document.getElementById('c');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({

	canvas: canvas,
	antialias: 1

});


renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('antiquewhite');

//collsiion box dimension and geometry for visualizing collision boundaries
var collisionBoxWidth = window.innerWidth / 100;
var collisionBoxHeight = window.innerHeight / 140;

const collisionBoxGeometry = new THREE.BoxGeometry(collisionBoxWidth, collisionBoxHeight, 1);
const material = new THREE.MeshBasicMaterial({

	color: 0xffffff,
	wireframe: true

});

// const collisionBox = new THREE.Mesh( collisionBoxGeometry, material );
// scene.add( collisionBox );


/*LIGHTS*/
//Point Light
const light = new THREE.PointLight(0xffffff, 1, 0, 0);
// light.castShadow = true;
light.position.set(5, 5, 5);
scene.add(light);

//Directional Light
// const directionalLight = new THREE.DirectionalLight( 0xffffff , 2);
// directionalLight.position.x = 5;
// directionalLight.position.y = 5;
// directionalLight.position.z = 5;
// directionalLight.castShadow = true;
// scene.add(directionalLight);

//Ambient Light
const alight = new THREE.AmbientLight(0xdddddd, 3); // soft white light
scene.add(alight);





class bouncingObject {

	constructor() { }

	//Default Values
	geometry = new THREE.SphereGeometry(1);
	material = new THREE.MeshBasicMaterial({ color: 0xffffff });
	mesh = new THREE.Mesh(this.geometry, this.material);
	velocity = new THREE.Vector3(0, 0, 0);
	scale = 1;
	xRotation = 0.01;
	yRotation = 0.01;



	//Animation Methods
	move() {
		this.mesh.position.x += this.velocity.x * 0.1;
		this.mesh.position.y += this.velocity.y * 0.1;
	}

	rotate(multiplier){
		this.mesh.rotation.x += this.xRotation * multiplier;
		this.mesh.rotation.y += this.yRotation * multiplier;

		if(rotationAcceleration >= 0.1){
			rotationAcceleration -= 0.002;
		}
	}

	collisionCheck() {
		if (this.mesh.position.x < -1 * collisionBoxWidth / 2) {
			return 1;
		}
		if (this.mesh.position.x > collisionBoxWidth / 2) {
			return 1;
		}
		if (this.mesh.position.y < -1 * collisionBoxHeight / 2) {
			return 2;
		}
		if (this.mesh.position.y > -1 * collisionBoxHeight / 2) {
			return 2;
		}
		else {
			return 0;
		}
	}
}


/*
mug01
color: 0xb6e2d3 (Mint)
velocity: 0.01, 0.007, 0
z-position: 0

mug02
color: 0xef7c8e (IndianRed)
velocity: -0.004 ,0.003, 0
z-position: -5

mug03
color: 0xfae8e0 (LightPink)
velocity: 0.01, 0.007, 0
z-position: 0
*/

const bouncingMugs = [];
for (let i = 0; i < 6; i++) {
	bouncingMugs.push(new bouncingObject());
}

function getRandomNumber(min, max){
	return Math.random() * (max - min) + min;
}

function getRandomXYVector(length){
	const angle = getRandomNumber(0,Math.PI);
	const x = length * Math.cos(angle);
	const y = length * Math.sin(angle);

	return new THREE.Vector3(x, y, 0);
}

const MUG_SPAWN_X = window.innerWidth * 0.004;
const MUG_SPAWN_Y = window.innerHeight * 0.004;
const MUG_VELOCITY = 0.005;

const mugSpawnX = [
	window.innerWidth * 0.004 * 0.3,
	window.innerWidth * 0.004 * 0.4,
	window.innerWidth * 0.004 * 0.6
];

const mugSpawnY = [
	window.innerHeight * 0.004 * -0.4,
	window.innerHeight * 0.004 * 0.3,
	window.innerHeight * 0.004 * 0.8
];

bouncingMugs[0].material.color = new THREE.Color(0xb6e2d3);
// bouncingMugs[0].mesh.position.x = getRandomNumber(MUG_SPAWN_X, MUG_SPAWN_X * -1);
// bouncingMugs[0].mesh.position.y = getRandomNumber(MUG_SPAWN_Y, MUG_SPAWN_Y * -1);
bouncingMugs[0].mesh.position.x = mugSpawnX[0];
bouncingMugs[0].mesh.position.y = mugSpawnY[0];
bouncingMugs[0].mesh.position.z = 0;
bouncingMugs[0].mesh.rotation.x = 20;
bouncingMugs[0].mesh.rotation.y = 120;
bouncingMugs[0].velocity = getRandomXYVector(0.005);
//0.2
bouncingMugs[0].scale = 0.2;
bouncingMugs[0].xRotation = 0.005;
bouncingMugs[0].yRotation = 0.001;

bouncingMugs[1].material.color = new THREE.Color(0xef7c8e);
// bouncingMugs[1].mesh.position.x = getRandomNumber(MUG_SPAWN_X + 10, MUG_SPAWN_X * -1 - 10);
// bouncingMugs[1].mesh.position.y = getRandomNumber(MUG_SPAWN_Y, MUG_SPAWN_Y * -1);
bouncingMugs[1].mesh.position.x = mugSpawnX[1] - 10;
bouncingMugs[1].mesh.position.y = mugSpawnY[1];
bouncingMugs[1].mesh.position.z = -25;
bouncingMugs[1].mesh.rotation.x = 80;
bouncingMugs[1].mesh.rotation.y = 10;
bouncingMugs[1].velocity = getRandomXYVector(0.005);
bouncingMugs[1].scale = 0.6;
bouncingMugs[1].xRotation = 0.003;
bouncingMugs[1].yRotation = 0.002;

bouncingMugs[2].material.color = new THREE.Color(0xf89880);
// bouncingMugs[2].mesh.position.x = getRandomNumber(MUG_SPAWN_X, MUG_SPAWN_X * -1);
// bouncingMugs[2].mesh.position.y = getRandomNumber(MUG_SPAWN_Y, MUG_SPAWN_Y * -1);
bouncingMugs[2].mesh.position.x = mugSpawnX[2];
bouncingMugs[2].mesh.position.y = mugSpawnY[2];
bouncingMugs[2].mesh.position.z = -10;
bouncingMugs[2].mesh.rotation.x = 180;
bouncingMugs[2].mesh.rotation.y = 10;
bouncingMugs[2].velocity = getRandomXYVector(0.005);
bouncingMugs[2].scale = 0.25;
bouncingMugs[2].xRotation = 0.0025;
bouncingMugs[2].yRotation = 0.01;

bouncingMugs[3].material.color = new THREE.Color(0xD8A7B1);
bouncingMugs[3].mesh.position.x = getRandomNumber(MUG_SPAWN_X + 5, MUG_SPAWN_X * -1 - 5);
bouncingMugs[3].mesh.position.y = getRandomNumber(MUG_SPAWN_Y - 20, MUG_SPAWN_Y * -1 - 20);
bouncingMugs[3].mesh.position.z = 50;
bouncingMugs[3].velocity = getRandomXYVector(0.005);
bouncingMugs[3].scale = 0.8;
bouncingMugs[3].xRotation = 0.00025;
bouncingMugs[3].yRotation = 0.0001;

bouncingMugs[4].material.color = new THREE.Color(0xf89880);
bouncingMugs[4].mesh.position.x = getRandomNumber(MUG_SPAWN_X, MUG_SPAWN_X * -1);
bouncingMugs[4].mesh.position.y = getRandomNumber(MUG_SPAWN_Y - 15, MUG_SPAWN_Y * -1 - 15);
bouncingMugs[4].mesh.position.z = 0;
bouncingMugs[4].velocity = getRandomXYVector(0.005);
bouncingMugs[4].scale = 0.2;
bouncingMugs[4].xRotation = 0.00025;
bouncingMugs[4].yRotation = 0.0001;

bouncingMugs[5].material.color = new THREE.Color(0xcccccc);
bouncingMugs[5].mesh.position.x = getRandomNumber(MUG_SPAWN_X, MUG_SPAWN_X * -1);
bouncingMugs[5].mesh.position.y = getRandomNumber(MUG_SPAWN_Y + 15, MUG_SPAWN_Y * -1 + 15);
bouncingMugs[5].mesh.position.z = 50;
bouncingMugs[5].velocity = getRandomXYVector(0.005);
bouncingMugs[5].scale = 1;
bouncingMugs[5].xRotation = getRandomNumber(0.0001,0.001);
bouncingMugs[5].yRotation = getRandomNumber(0.0001,0.001);




// instantiate a loader
const loader = new OBJLoader();

// load a resource
loader.load(
	// resource URL
	'mug.obj',
	// called when resource is loaded
	function (object) {

		for (let i = 0; i < bouncingMugs.length; i++) {
			bouncingMugs[i].mesh.geometry = object.children[0].geometry.clone();
			bouncingMugs[i].mesh.scale.multiplyScalar(bouncingMugs[i].scale);
			scene.add(bouncingMugs[i].mesh);
		}

	}
)


const object1 = new bouncingObject();
// scene.add(object1.mesh);

camera.position.z = 20;

// Function to handle window resizing
function onWindowResize() {
	const newWidth = window.innerWidth;
	const newHeight = window.innerHeight;

	// Update the camera aspect ratio and size
	camera.aspect = newWidth / newHeight;
	camera.updateProjectionMatrix();

	// Update collision box dimensions with window size
	collisionBoxWidth = window.innerWidth / 100;
	collisionBoxHeight = window.innerHeight / 140;

	// Update the renderer size to match the new window size
	renderer.setSize(newWidth, newHeight);
}

// Listen for the window resize event and call the onWindowResize function
window.addEventListener('resize', onWindowResize, false);
let lastKnownScrollPosition = window.scrollY;
let rotationAcceleration = 0.1;

function animate() {

	//Request a new frame
	requestAnimationFrame(animate);

	//Mug motion and collision detection
	for (let i = 0; i < bouncingMugs.length; i++) {

		//Move
		bouncingMugs[i].move();

		//Collision Check
		if (bouncingMugs[i].collisionCheck() == 1) {
			bouncingMugs[i].velocity.x *= -1;
		} else if (bouncingMugs[i].collisionCheck() == 2) {
			bouncingMugs[i].velocity.y *= -1;
		}

		//Rotate
		bouncingMugs[i].rotate(rotationAcceleration);

	}

	if(lastKnownScrollPosition != window.scrollY){
		console.log(window.scrollY - lastKnownScrollPosition);

		if(rotationAcceleration < 1){
			rotationAcceleration += 0.1;
		}


		lastKnownScrollPosition = window.scrollY;
	}

	camera.position.y = -1 * window.scrollY / 500;

	//Render Scene
	renderer.render(scene, camera);
}

animate();

const slider = document.querySelector('#dessert-sandwich-slider');
console.log(slider);


let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
	isDown = true;
	slider.classList.add('active');
	startX = e.pageX - slider.offsetLeft;
	scrollLeft = slider.scrollLeft;

	slider.style.scrollSnapType = "none";
});

slider.addEventListener('mouseleave', () => {
	isDown = false;
	slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
	isDown = false;
	slider.classList.remove('active');

	const moveTo = findMiddleCard(slider);
	console.log(moveTo);
	// slider.scrollTo({
	// 	left: moveTo,
	// 	behavior: 'smooth'
	// });
	gsap.to(slider, {
		duration: 0.3, 
		scrollLeft: moveTo
		// onComplete: setScrollSnap
	});

});

function setScrollSnap(){
	slider.style.scrollSnapType = "x proximity"
}

slider.addEventListener('mousemove', (e) => {
	if (!isDown) return;
	e.preventDefault();
	const x = e.pageX - slider.offsetLeft;
	const walk = (x - startX) * 2; //scroll-fast
	slider.scrollLeft = scrollLeft - walk;
	// console.log(walk);
	// console.log(slider.scrollLeft);
});

window.ondragstart = function () { return false }

function findMiddleCard(sliderContainer){

	let cardCenterPositions = [];
	let cardOffsetCenterPositions = [];
	const cardWidth = sliderContainer.children[0].offsetWidth;
	const halfWindowWidth = window.innerWidth / 2;

	for (let i = 0 ; i < sliderContainer.children.length ; i++) {
		cardCenterPositions.push(
			sliderContainer.children[i].offsetLeft + (sliderContainer.children[i].offsetWidth / 2)
			);
	}

	for (const i in cardCenterPositions){
		cardOffsetCenterPositions.push(
			cardCenterPositions[i] - sliderContainer.scrollLeft
		);
	}

	const moveToIndex = cardOffsetCenterPositions.reduce(
		(a, b) => {
			return Math.abs(b - halfWindowWidth) < Math.abs(a - halfWindowWidth) ? b : a;
		}
	);

	const moveTo = cardCenterPositions[cardOffsetCenterPositions.indexOf(moveToIndex)] - halfWindowWidth;
	
	if (moveTo < cardWidth){
		return 0;
	} else {
		return moveTo;
	}

}

console.log(window.innerWidth / 2);



gsap.registerPlugin(ScrollToPlugin);

// Detect if a link's href goes to the current page
function getSamePageAnchor (link) {
	if (
	  link.protocol !== window.location.protocol ||
	  link.host !== window.location.host ||
	  link.pathname !== window.location.pathname ||
	  link.search !== window.location.search
	) {
	  return false;
	}
  
	return link.hash;
  }
  
  // Scroll to a given hash, preventing the event given if there is one
  function scrollToHash(hash, e) {
	const elem = hash ? document.querySelector(hash) : false;
	if(elem) {
	  if(e) e.preventDefault();
	  gsap.to(window, {scrollTo: elem});
	}
  }
  
  // If a link's href is within the current page, scroll to it instead
  document.querySelectorAll('a[href]').forEach(a => {
	a.addEventListener('click', e => {
	  scrollToHash(getSamePageAnchor(a), e);
	});
  });
  
  // Scroll to the element in the URL's hash on load
  scrollToHash(window.location.hash);
  

const images = [];
images.push(document.querySelector('#image-01'));
images.push(document.querySelector('#image-02'));
images.push(document.querySelector('#image-03'));
images.push(document.querySelector('#image-04'));
images.push(document.querySelector('#image-05'));
images.push(document.querySelector('#image-06'));

images[0].style.marginTop = "3rem";

let middleImageIndex;

function findCenterImage(){

}

// document.addEventListener("scrollend", (event) => {
// 	console.log("scroll ended!");
// 	console.log(document.elementFromPoint( window.innerWidth / 2, window.innerHeight / 2 ));
//   });