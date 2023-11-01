import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const canvas = document.getElementById('c');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
	
	canvas: canvas,
	antialias: 1

});


renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor('antiquewhite');

//collsiion box dimension and geometry for visualizing collision boundaries
var collisionBoxWidth = window.innerWidth / 100;
var collisionBoxHeight = window.innerHeight / 140;

const collisionBoxGeometry = new THREE.BoxGeometry( collisionBoxWidth, collisionBoxHeight, 1 );
const material = new THREE.MeshBasicMaterial( {

	color: 0xffffff,
	wireframe: true

} );

// const collisionBox = new THREE.Mesh( collisionBoxGeometry, material );
// scene.add( collisionBox );


/*LIGHTS*/
//Point Light
const light = new THREE.PointLight( 0xffffff, 100, 100 );
light.position.set( 5, 5, 5 );
scene.add( light );

//Ambient Light
const alight = new THREE.AmbientLight( 0xdddddd , 1.8); // soft white light
scene.add( alight );





class bouncingObject {
	
	constructor(){}

	//Default Values
	geometry = new THREE.SphereGeometry(1);
	material = new THREE.MeshToonMaterial({color: 0xffffff});
	mesh = new THREE.Mesh(this.geometry, this.material);
	velocity = new THREE.Vector3(0,0,0);
	scale = 1;
	xRotation = 0.01;
	yRotation = 0.01;



	//Animation Methods
	move(){
		this.mesh.position.x += this.velocity.x;
		this.mesh.position.y += this.velocity.y;	
	}

	collisionCheck(){
		if(this.mesh.position.x < -1 * collisionBoxWidth/2){
			return 1;
		}
		if(this.mesh.position.x > collisionBoxWidth/2){
			return 1;
		}
		if(this.mesh.position.y < -1 * collisionBoxHeight/2){
			return 2;
		}
		if(this.mesh.position.y > -1 * collisionBoxHeight/2){
			return 2;
		}
		else{
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
for(let i = 0; i < 3; i++){
	bouncingMugs.push(new bouncingObject());
}

bouncingMugs[0].material.color = new THREE.Color( 0xb6e2d3 );
bouncingMugs[0].mesh.position.x = 2;
bouncingMugs[0].mesh.position.y = 1;
bouncingMugs[0].mesh.position.z = 0;
bouncingMugs[0].velocity = new THREE.Vector3(-0.004,0.003,0);
bouncingMugs[0].scale = 0.1;
bouncingMugs[0].xRotation = 0.01;
bouncingMugs[0].yRotation = 0.01;

bouncingMugs[1].material.color = new THREE.Color( 0xef7c8e );
bouncingMugs[1].mesh.position.x = -1;
bouncingMugs[1].mesh.position.y = -1.5;
bouncingMugs[1].mesh.position.z = -10;
bouncingMugs[1].velocity = new THREE.Vector3(-0.004,0.003,0);
bouncingMugs[1].scale = 0.2;
bouncingMugs[1].xRotation = 0.003;
bouncingMugs[1].yRotation = 0.002;

bouncingMugs[2].material.color = new THREE.Color( 0xffc0cb );
bouncingMugs[2].mesh.position.x = -0.5;
bouncingMugs[2].mesh.position.y = 3;
bouncingMugs[2].mesh.position.z = -5;
bouncingMugs[2].velocity = new THREE.Vector3(0.003,-0.005,0);
bouncingMugs[2].scale = 0.1;
bouncingMugs[2].xRotation = 0.0025;
bouncingMugs[2].yRotation = 0.01;




// instantiate a loader
const loader = new OBJLoader();

// load a resource
loader.load(
	// resource URL
	'mug.obj',
	// called when resource is loaded
	function ( object ) {

		for(let i = 0; i < bouncingMugs.length; i++){
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
function onWindowResize(){
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

function animate() {

	//Request a new frame
	requestAnimationFrame( animate );

	//Mug motion and collision detection
	for(let i = 0; i < bouncingMugs.length; i++){

		//Move
		bouncingMugs[i].move();

		//Collision Check
		if(bouncingMugs[i].collisionCheck() == 1){
			bouncingMugs[i].velocity.x *= -1;
		} else if(bouncingMugs[i].collisionCheck() == 2){
			bouncingMugs[i].velocity.y *= -1;
		}

		//Rotate
		bouncingMugs[i].mesh.rotation.x += bouncingMugs[i].xRotation;
		bouncingMugs[i].mesh.rotation.y += bouncingMugs[i].yRotation;
		

	}

	//Render Scene
	renderer.render( scene, camera );
}

animate();
