import * as THREE from 'three';
import { Rhino3dmLoader } from 'three/addons/loaders/3DMLoader.js';

const canvas = document.getElementById('c');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
	
	canvas: canvas,
	antialias: 1

});


renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor('antiquewhite');

const collisionBoxGeometry = new THREE.BoxGeometry( 4, 6, 1 );
const material = new THREE.MeshBasicMaterial( {

	color: 0xffffff,
	wireframe: true

} );


const collisionBox = new THREE.Mesh( collisionBoxGeometry, material );
scene.add( collisionBox );

class bouncingObject {
	constructor(){
		this.geometry = new THREE.SphereGeometry(1);
		this.material = new THREE.MeshBasicMaterial({color: 0xffa500});
		this.mesh = new THREE.Mesh(this.geometry, this.material);

		this.velocity = new THREE.Vector3(0.01,0.007,0);
	}

	move(){
		this.mesh.position.x += this.velocity.x;
		this.mesh.position.y += this.velocity.y;	
	}

	collisionCheck(){
		if(this.mesh.position.x < -2){
			return 1;
		}
		if(this.mesh.position.x > 2){
			return 1;
		}
		if(this.mesh.position.y < -3){
			return 2;
		}
		if(this.mesh.position.y > 3){
			return 2;
		}
		else{
			return 0;
		}
	}
}

const bouncingMug = new bouncingObject();
var mug;

// Instantiate a loader
const loader = new Rhino3dmLoader();
	
// Specify path to a folder containing WASM/JS libraries or a CDN.
// For example, /jsm/libs/rhino3dm/ is the location of the library inside the three.js repository
// loader.setLibraryPath( '/path_to_library/rhino3dm/' );
loader.setLibraryPath( 'https://unpkg.com/rhino3dm@8.0.0-beta2/' );
	
// Load a 3DM file
loader.load(
	// resource URL
	'mug.3dm',
	// called when the resource is loaded
	function ( object ) {
		object.scale.multiplyScalar(0.1);
		mug = object.clone();
		// scene.add( object );
		scene.add(mug);
	}
);

const object1 = new bouncingObject();
scene.add(object1.mesh);

camera.position.z = 20;

function animate() {
	requestAnimationFrame( animate );

	object1.move();
	if(object1.collisionCheck() == 1){
		object1.velocity.x *= -1;
	} else if(object1.collisionCheck() == 2){
		object1.velocity.y *= -1;
	} else {
	}

	mug.rotation.x += 0.01;
	mug.rotation.y += 0.01;


	renderer.render( scene, camera );
}

animate();