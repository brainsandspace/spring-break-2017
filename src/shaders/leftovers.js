const vertShader = `
uniform sampler2D uImageMask;
uniform float uTime;

varying vec2 vUV;
varying vec2 vUVmoving;

void main() {
  vUV = uv;

  vec4 uTexMask = texture2D(uImageMask, vUV);

  vUVmoving.x =  fract(vUV.x + uTime/1000000.0);
  vUVmoving.y =  vUV.y  + 0.2;
  
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;
}
`;

const fragShader = `
uniform sampler2D uImageMask;
uniform sampler2D uImage;
uniform sampler2D uImageBG;
uniform float uTime;

varying vec2 vUV;
varying vec2 vUVmoving;

void main() {
  vec4 uTex = texture2D(uImage, vUV);
  vec4 uTexMask = texture2D(uImageMask, vUV);
  vec4 uTexBG = texture2D(uImageBG, vUVmoving);

  gl_FragColor = uTex *uTexMask;

  if (length(uTexMask.rgb) < 1.0) {
    gl_FragColor = mix(uTexBG, uTex, length(uTexMask.rgb));
  }

  if (uTime < 5000.0) {
    gl_FragColor *= uTime * 0.0002; 
  }

}
`;

const leftovers = {
  uniforms: {
    uTime: { value: null },
    uImage: { value: null },
    uImageBG: { value: null },
    uImageMask: { value: null },
  },
  vertexShader: vertShader,
  fragmentShader: fragShader,
};

export default leftovers;
