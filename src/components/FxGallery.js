import React, { Component } from 'react';

import fx1Shader from 'shaders/fx1.js';
import glamorous from 'glamorous';

const Div = glamorous.div({
  cursor: 'pointer',
});

class FxGallery extends Component {
  // set the scene size
  componentDidMount() {
    let width = window.innerWidth, height = width * 0.563;

    // set some camera attributes
    const VIEW_ANGLE = 45, NEAR = 0.1, FAR = 10000;
    let aspect = width / height;

    // get the DOM element

    // create WebGL renderer, camera, and a scene
    const renderer = new THREE.WebGLRenderer({ canvas: this.refs.canvas });
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

    const planeMaterial = new THREE.ShaderMaterial(fx1Shader);
    materials.push(planeMaterial);

    const boatGreenTextures = [];
    const boatGreenMasks = [];

    [1, 2, 3].forEach(num => {
      boatGreenTextures.push(
        new THREE.TextureLoader().load(`img/boat-green${num}.jpg`)
      );
      boatGreenMasks.push(
        new THREE.TextureLoader().load(`img/boat-green${num}-mask.png`)
      );
    });
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

    this.refs.canvas.addEventListener('mousemove', evt => {
      materials.forEach(material => {
        if (material.uniforms.uCursor) {
          material.uniforms.uCursor.value = new THREE.Vector2(
            evt.clientX / window.innerWidth,
            evt.clientY / window.innerHeight
          );
        }
      });
    });

    let index = 1;
    this.refs.canvas.addEventListener('click', evt => {
      index++;
      materials.forEach(material => {
        if (material.uniforms.uCursor) {
          [1, 2, 3].forEach(num => {
            planeMaterial.uniforms.uImage.value = boatGreenTextures[
              (num - 1 + index) % 3
            ];
            planeMaterial.uniforms.uImageMask.value = boatGreenMasks[
              (num - 1 + index) % 3
            ];
          });
        }
      });
    });

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
  }

  render() {
    return <Div><canvas ref={'canvas'} /></Div>;
  }
}

export default FxGallery;
