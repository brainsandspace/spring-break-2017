const vertShader = `
varying vec2 vUV;
void main() {
	vUV = uv;
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;
}
`;

const fragShader = `
uniform sampler2D uImage1;
uniform sampler2D uImage2;
uniform sampler2D uImage3;
uniform bool uOverlay;
uniform float uTime;
varying vec2 vUV;

void main() {
  
	vec4 uTex1 = texture2D(uImage1, vUV);
  vec4 uTex2 = texture2D(uImage2, vUV);
  vec4 uTex3 = texture2D(uImage3, vUV);
  
  float p = cos(uTime/1000.0)/2.0 + 0.5;
	gl_FragColor.rgb = (uTex1.rgb * (1.0 - p)) + (p * uTex2.rgb);
  gl_FragColor.rgb += uTex3.rgb/3.0;

}
`;

const fx1Shader = {
  uniforms: {
    uOverlay: { value: false },
    uTime: { value: null },
    uImage1: { value: null },
    uImage2: { value: null },
    uImage3: { value: null },
  },
  vertexShader: vertShader,
  fragmentShader: fragShader,
};

export default fx1Shader;
