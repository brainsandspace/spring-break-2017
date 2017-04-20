const vertShader = `
uniform sampler2D uImageMask;
uniform float uTime;

varying vec2 vUV;

void main() {
	vUV = uv;
  vec4 uTexMask = texture2D(uImageMask, vUV);
  vUV.x -= .01 * cos(vUV.x * 10.0 + uTime/1000.0) * length(uTexMask.rgb);
  vUV.y += .013 * sin(vUV.y * 1000.0 + uTime/1000.0) * length(uTexMask.rgb);
  
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;
}
`;

const fragShader = `
uniform sampler2D uImage;
uniform float uTime;
uniform vec2 uCursor;

varying vec2 vUV;

void main() {
  vec4 uTex = texture2D(uImage, vUV);
  
  float p = uCursor.x; 
  // gl_FragColor.rgb += uTex3.rgb/3.0;
  // gl_FragColor =  uTex1 - (p * normalize(gl_FragColor))/2.;

  gl_FragColor = uTex;
}
`;

const fx1Shader = {
  uniforms: {
    uCursor: { value: new THREE.Vector2(0.5, 0.5) },
    uTime: { value: null },
    uImage: { value: null },
    uImageMask: { value: null },
  },
  vertexShader: vertShader,
  fragmentShader: fragShader,
};

export default fx1Shader;
