import{r as a,j as m}from"./react-Cxtxkmud.js";import{W as w,S as f,C as v,P as g,a as h,V as p,M as x}from"./three-CINWNx3o.js";import"./clsx-BWEp7SwF.js";function S(){const t=a.useRef();return a.useEffect(()=>{const d=t.current,e=new w({canvas:d,alpha:!0});e.setSize(window.innerWidth,window.innerHeight);const o=new f,i=new v;i.position.z=1;const l=new g(2,2),n=new h({uniforms:{u_time:{value:0},u_resolution:{value:new p(window.innerWidth,window.innerHeight)}},vertexShader:`
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,fragmentShader:`
        precision highp float;
        uniform float u_time;
        uniform vec2 u_resolution;

        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution;
          vec2 pos = uv - 0.5;
          float dist = length(pos);
          float brightness = smoothstep(0.5, 0.0, dist);
          float stars = step(0.995, random(floor(gl_FragCoord.xy * 0.5)));
          float twinkle = sin(u_time * 5.0 + dist * 50.0) * 0.5 + 0.5;

          vec3 galaxy = vec3(brightness) * mix(vec3(0.1, 0.2, 0.5), vec3(0.6, 0.7, 1.0), dist) * twinkle;
          galaxy += stars;

          gl_FragColor = vec4(galaxy, 1.0);
        }
      `}),c=new x(l,n);o.add(c);const r=()=>{e.setSize(window.innerWidth,window.innerHeight),n.uniforms.u_resolution.value.set(window.innerWidth,window.innerHeight)};window.addEventListener("resize",r);const u=Date.now(),s=()=>{n.uniforms.u_time.value=(Date.now()-u)*.001,e.render(o,i),requestAnimationFrame(s)};return s(),()=>{window.removeEventListener("resize",r),e.dispose()}},[]),m.jsx("canvas",{ref:t,className:"fixed inset-0 -z-20 w-full h-full"})}export{S as default};
