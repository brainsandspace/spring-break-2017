import React, { Component } from 'react';

import leftoversShader from 'shaders/leftovers.js';
import glamorous from 'glamorous';

const Div = glamorous.div({
  width: '100%',
  '& canvas': {
    width: '100%'
  }
});

class Leftovers extends Component {
  // set the scene size
  componentDidMount() {
    let width = this.canvas.parentElement.clientWidth, height = this.canvas.parentElement.clientHeight;

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

    const planeMaterial = new THREE.ShaderMaterial(leftoversShader);
    materials.push(planeMaterial);

    const foregroundTextures = [];
    const maskTextures = [];
    const backgroundTextures = [];

    // [1, 2, 3].forEach(num => {
      foregroundTextures.push(
        new THREE.TextureLoader().load(`img/leftovers-park.jpg`)
      );
      maskTextures.push(
        new THREE.TextureLoader().load(`img/leftovers-park-mask.png`)
      );
      backgroundTextures.push(
        new THREE.TextureLoader().load(`img/leftovers-park-bg.jpg`)
      );
    // });
    planeMaterial.uniforms.uImage.value = foregroundTextures[0];
    planeMaterial.uniforms.uImageMask.value = maskTextures[0];
    planeMaterial.uniforms.uImageBG.value = backgroundTextures[0];

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
    // this.canvas.addEventListener('click', evt => {
    //   index++;
    //   planeMaterial.uniforms.uImage.value = foregroundTextures[index % 3];
    //   planeMaterial.uniforms.uImageMask.value = maskTextures[index % 3];
    // });

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

export default Leftovers;
