import fx1Shader from './shaders/fx1.js';

(function() {
  // set the scene size
  const container = document.querySelector('.container');
  let width = window.innerWidth, height = width * 0.563;

  // set some camera attributes
  const VIEW_ANGLE = 45, NEAR = 0.1, FAR = 10000;
  let aspect = width / height;

  // get the DOM element

  // create WebGL renderer, camera, and a scene
  const renderer = new THREE.WebGLRenderer();
  let camera = new THREE.OrthographicCamera(-0.5, 0.5, -0.5, 0.5, 1, 1000);
  const scene = new THREE.Scene();
  window.scene = scene;

  const materials = [];
  // create gui

  // add camera to scene
  scene.add(camera);

  // camera starts at 0,0,0, so pull it back
  camera.position.z = 1;

  // start the renderer
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);
  // set up plane dimensions
  const w = 1.28, l = 0.72;

  const planeMaterial = new THREE.ShaderMaterial(fx1Shader);
  materials.push(planeMaterial);

  const boatGreenTextures = [];

  [1, 2, 3].forEach(num => {
    boatGreenTextures.push(
      new THREE.TextureLoader().load(`img/boat-green${num}.jpg`)
    );
    planeMaterial.uniforms[`uImage${num}`].value = boatGreenTextures[num - 1];
  });

  // create mesh with plane geometry
  let plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1),
    planeMaterial
  );
  plane.name = 'plane';
  plane.rotation.x = Math.PI;

  scene.add(plane);
  update();

  function update(t) {
    window.requestAnimationFrame(update, t);

    materials.forEach(material => {
      if (material.uniforms.uTime) {
        material.uniforms.uTime.value = t;
      }
    });
    render();
  }

  function render() {
    renderer.render(scene, camera);
  }

  // create the video textures
  /*
const strugglinTex = new THREE.VideoTexture(document.querySelector('video#struggle'));
const drankinCreepinTex = new THREE.VideoTexture(document.querySelector('video#drank-creep'));
strugglinTex.minFilter = THREE.LinearFilter;
drankinCreepinTex.minFilter = THREE.LinearFilter;
let planeMaterial = new THREE.ShaderMaterial(videoFXShader);
planeMaterial.uniforms.uVidStruggle.value = strugglinTex;
planeMaterial.uniforms.uVidDrankCreep.value = drankinCreepinTex;

// create mesh with plane geometry
let plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1, 1), 
  planeMaterial
);
plane.name = 'plane';
plane.rotation.x = Math.PI;

scene.add(plane);
showOverlay();
update();

function update() {
  window.requestAnimationFrame(update);
  render();
}

function render() {
  renderer.render(scene, camera);
}

function showOverlay() {
  setTimeout(() => {
    planeMaterial.uniforms.uOverlay.value = true;
    setTimeout(() => { 
      showOverlay();
      planeMaterial.uniforms.uOverlay.value = false;
     }, 100);
  }, Math.random()*2000 + 500)
}*/

  // window.addEventListener('resize', () => {
  //  width = window.innerWidth;
  //  height = window.innerHeight;
  // camera.aspect = width/height;
  // camera.updateProjectionMatrix();
  // renderer.setSize(width, height);
  // })
})();
