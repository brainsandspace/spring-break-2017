import React, { Component } from 'react';

import aboutFaceShader from 'shaders/aboutFace.js';
import glamorous from 'glamorous';

const Div = glamorous.div({
  cursor: 'pointer',
});

class AboutFace2 extends Component {
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

    const planeMaterial = new THREE.ShaderMaterial(aboutFaceShader);
    materials.push(planeMaterial);

    const cTextures = [];
    const dTextures = [];

    // [1, 2, 3].forEach(num => {
      cTextures.push(
        new THREE.TextureLoader().load(`img/about-face-2-c.jpg`)
      );
      dTextures.push(
        new THREE.TextureLoader().load(`img/about-face-2-d.jpg`)
      );
    // });
    planeMaterial.uniforms.uImageC.value = cTextures[0];
    planeMaterial.uniforms.uImageD.value = dTextures[0];

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
      console.log(evt.clientX/window.innerWidth)
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

export default AboutFace2;
