import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function main() {
    // setting up canvas
    const canvas = document.querySelector('#c');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
    // setting up camera
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
    const controls = new OrbitControls(camera,renderer.domElement);

    // sets up the scene
    const scene = new THREE.Scene();

    // directional light
    {
        const color = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.DirectionalLight( color, intensity );
        light.position.set( - 1, 2, 4 );
        scene.add( light );
    }

    // setting up cube + dimensions
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry( boxWidth, boxHeight, boxDepth );

    // cube material
    const material = new THREE.MeshPhongMaterial( { color: 0x44aa88 } ); // greenish blue
    const cube = new THREE.Mesh( geometry, material );
    // adds cube to scene
    scene.add( cube );

    // renders animation
    function render( time ) {
        time *= 0.001; // convert time to seconds

        cube.rotation.x = time;
        cube.rotation.y = time;

        renderer.render( scene, camera );

        requestAnimationFrame( render );
        controls.update();
    }

    requestAnimationFrame( render );
    controls.update();
}

main();