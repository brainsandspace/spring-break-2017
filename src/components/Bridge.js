import React, { Component } from 'react';

import bridgeShader from 'shaders/bridge.js';
import glamorous from 'glamorous';

const Div = glamorous.div({
  cursor: 'pointer',
});

class Bridge extends Component {
  // set the scene size
  componentDidMount() {
    let width = window.innerWidth, height = width * 0.563;

    // set some camera attributes
    const VIEW_ANGLE = 45, NEAR = 0.1, FAR = 10000;
    let aspect = width / height;

    // get the DOM element

    // create WebGL renderer, camera, and a scene
    const renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
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
    // set up plane dimensions
    const w = 1.28, l = 0.72;

    const planeMaterial = new THREE.ShaderMaterial(bridgeShader);
    materials.push(planeMaterial);

    const boatGreenTextures = [];
    const boatGreenMasks = [];

    // [1, 2, 3].forEach(num => {
      boatGreenTextures.push(
        new THREE.TextureLoader().load(`img/bridge.jpg`)
      );
      boatGreenMasks.push(
        new THREE.TextureLoader().load(`img/bridge-mask.jpg`)
      );
    // });
    planeMaterial.uniforms.uImage.value = boatGreenTextures[0];
    planeMaterial.uniforms.uImageMask.value = boatGreenMasks[0];

    // create mesh with plane geometry
    let plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(1, 1, 200, 200),
      planeMaterial
    );
    plane.name = 'plane';
    plane.rotation.x = Math.PI;

    scene.add(plane);
    update();

    // this.canvas.addEventListener('mousemove', evt => {});
    let index = 1;
    this.canvas.addEventListener('click', evt => {
      index++;
      planeMaterial.uniforms.uImage.value = boatGreenTextures[index % 3];
      planeMaterial.uniforms.uImageMask.value = boatGreenMasks[index % 3];
    });

    function update(t, dt) {
      window.requestAnimationFrame(update, t, dt);
      // console.log(dt);

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

    const DELTA_T = 8;
  }

  render() {
    return <Div><canvas ref={ref => this.canvas = ref} /></Div>;
  }
}

export default Bridge;
