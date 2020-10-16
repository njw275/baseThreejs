var myShader = {
  uniforms: {
    tDiffuse: { type: "t", value: null },
    color: { type: "c", value: new THREE.Color(0xffffff) },
  },

  vertexShader: [
    "uniform float time;",
    "uniform vec2 resolution;",
    "void main()	{",
    "    gl_Position = vec4( position, 1.0 );",
    "}",
  ].join("\n"),

  fragmentShader: [
    "uniform float time;",
    "uniform float progress;",
    "uniform sampler2D texture1;",
    "uniform sampler2D texture2;",
    "uniform vec4 resolution;",
    "uniform vec2 vUv;",
    "uniform vec4 vPosition;",

    "void main() {",
    "    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);",
    "}",
  ].join("\n"),
};
