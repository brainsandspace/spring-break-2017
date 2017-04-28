const vertShader = `
uniform sampler2D uImageMask;
uniform float uTime;

varying vec2 vUV;

void main() {
  vUV = uv;
	vUV.x  = fract(uv.x + 0.001 * sin(0.00005 * uTime));
	vUV.y  = fract(uv.y + 0.001 * cos(0.0005 * uTime*3.141));

  vec4 uTexMask = texture2D(uImageMask, vUV);

   vUV.x -= 0.005 * cos(vUV.x * 10.0 + uTime/888.0) * (1.8 - length(uTexMask.rgb));
   vUV.y += .006 * sin(vUV.y * 10.0 + uTime/1000.0) * (1.8 - length(uTexMask.rgb));
  
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;
}
`;

const fragShader = `
uniform sampler2D uImage;
uniform float uTime;

varying vec2 vUV;

void main() {
  vec4 uTex = texture2D(uImage, vUV);

  if (uTime < 5000.0) {
    gl_FragColor = uTex * uTime * 0.0002; 
  } else {
    gl_FragColor = uTex;
  }

}
`;

const bridge = {
  uniforms: {
    uTime: { value: null },
    uImage: { value: null },
    uImageMask: { value: null },
  },
  vertexShader: vertShader,
  fragmentShader: fragShader,
};

export default bridge;
