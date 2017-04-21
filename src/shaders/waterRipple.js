const vertShader = `
uniform sampler2D uImageMask;
uniform float uTime;

varying vec2 vUV;

void main() {
	vUV = uv;
  vec4 uTexMask = texture2D(uImageMask, vUV);

   vUV.x -= 0.001 * cos(vUV.x * 10.0 + uTime/888.0) * length(uTexMask.rgb);
   vUV.y += .013 * sin(vUV.y * 1000.0 + uTime/1000.0) * length(uTexMask.rgb);
  
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

const waterRipple = {
  uniforms: {
    uTime: { value: null },
    uImage: { value: null },
    uImageMask: { value: null },
  },
  vertexShader: vertShader,
  fragmentShader: fragShader,
};

export default waterRipple;
