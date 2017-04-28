const vertShader = `
// uniform sampler2D uImageMask;
uniform float uTime;

varying vec2 vUVc;
varying vec2 vUVd;

void main() {
  vUVc = uv * uTime/1000.0;
  vUVd = uv;
  
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;
}
`;

const fragShader = `
uniform sampler2D uImageC;
uniform sampler2D uImageD;
uniform float uTime;

varying vec2 vUVc;
varying vec2 vUVd;

void main() {
  vec4 uTexC = texture2D(uImageC, vUVc);
  vec4 uTexD = texture2D(uImageD, vUVd);

  gl_FragColor = uTexC * uTexD;  
  // gl_FragColor = uTexD;  

  if (uTime < 5000.0) {
    gl_FragColor *= uTime * 0.0002; 
  }

}
`;

const aboutFace = {
  uniforms: {
    uTime: { value: null },
    uImageC: { value: null },
    uImageD: { value: null },
  },
  vertexShader: vertShader,
  fragmentShader: fragShader,
};

export default aboutFace;
