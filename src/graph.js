import './3d-force-graph.css';
import ForceGraph3D from './3d-force-graph';
import * as THREE from 'three';
// import { nodes, links } from './nodes';

const Graph = (elem) => {
  let Ni = 34;
  const gData = { 
    nodes: [
      // { id: 'summ', value: 'xx1', group: 1, color: 'red', size: 1, x: 120, y: 50, z: 0 },
      // { id: 'mumm',  value: 'yy-2', group: 2, color: 'blue', size: 2, x: -50, y: -40, z: +100 },
      // { id: 'z1', x: -80, y: -50, z: 0, color: 'red' },
      // { id: 'z2', x: -50, y: -50, z: 0, color: 'blue', size: 2 },
      // { id: 'z3', x: 50, y: 50, z: 0, color: 'blue' },
      // { id: 'z4', x: 80, y: 50, z: 0, color: 'blue' },
      { id: 'z1', fx: -80, fy: -50, fz: 0, color: 'lightGrey' },
      { id: 'z2', fx: -50, fy: -50, fz: 0, color: 'blue', size: 2 },
      { id: 'z3', fx: 50, fy: 50, fz: 0, color: 'blue' },
      { id: 'z4', fx: 80, fy: 50, fz: 0, color: 'blue' },
      { id: 'r0', fx: -173.38513589158146, fy: -10.051263570387768, fz: 0, size: 1, color: 'black' },
      // ...nodes
    ],
    links: [
      { source: 'z1', target: 'z2', color: 'white' },
      { source: 'z3', target: 'z4' },
      { source: 'z3', target: 'z2', curvature: -0.3, rotation: 2, value: 5 },
      // ...links
    ] //{ source: 'summ', target: 'mumm', label: 'link-link' }]
  };

  const koeX = - 0.0025, koeY = - 0.0025;
  const maxX = 1.2, maxY = 0.7;

  const getAxis = (curr, step, maxx) => {
    let result = curr + step;
    return Math.max(-maxx, Math.min(maxx, result));
  }

  const Navi = (event) => {
    const axisX = getAxis(camera_pivot.rotation.x, koeX * event.movementY, maxX);
    const axisY = getAxis(camera_pivot.rotation.y, koeY * event.movementX, maxY);
    camera_pivot.rotateX(axisX - camera_pivot.rotation.x);
    camera_pivot.rotateY(axisY - camera_pivot.rotation.y);
    console.log('scene', Graph.scene().rotation);
    console.log('camera', Graph.camera().rotation);
    return false;
  }

  const Graph = ForceGraph3D(); // ForceGraph3D({ controlType: 'orbit' });
  Graph(elem)
    .width(elem.clientWidth)
    .height(elem.clientHeight)
    .cameraPosition({ z: 620 })
    .backgroundColor('black')
    .graphData(gData)
    .nodeLabel('value')
    .linkWidth('width')
    .linkOpacity([0.5])
    .linkCurvature('curv')
    .linkCurveRotation('rotat')
    // .linkDirectionalParticles("value")
    // .linkDirectionalParticleWidth([2])
    // .linkDirectionalParticleSpeed(d => d.value * 0.001)
    .nodeVal('size')
    // .nodeOpacity([1])
    .nodeAutoColorBy('group')
    .onNavigating(Navi)
    // .onNavigatingEnd(NaviEnd)
    .onNodeClick(click); // .nodeRelSize([num]);
  Graph.onNodeDragEnd(node => {
    node.fx = node.x;
    node.fy = node.y;
    node.fz = node.z;

// node.fx = null;
// node.fy = null;

    // const text = `{ id:'r${Ni}', fx:${node.x}, fy:${node.y}, fz:${node.z}, size: 0.03, color: 'lightGrey' }`;
    // console.log(text);
    // navigator.clipboard.writeText(text);
    // Ni++;
    console.log(Graph.camera().position);
    console.log(Graph.camera().rotation);

    // Graph.camera().position.x = 0;
    // Graph.camera().position.y = 0;
    // Graph.camera().position.z = 620;

    // Graph.cameraPosition({ x:0, y:0, z:620 });

    Graph.camera().position.set(0, 0, 620);
    Graph.scene().position.set(0, 0, 0);
    const { x: rx, y: ry, z: rz } = Graph.camera().rotation;
    Graph.scene().rotation.set(rx, ry, rz);
    // Graph.camera().rotation.Vector3 = { x:0, y:0, z:0 };

    // Graph.camera().rotation.x = 0;
    // Graph.camera().rotation.y = 0;
    // Graph.camera().rotation.z = 0;
    // console.log(Graph.camera().rotation);


  }); //.enableNavigationControls(true); // false);

  var texture = new THREE.TextureLoader().load("data/Image-5.jpg");
  var backgroundMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 150, 1),
    new THREE.MeshBasicMaterial({
      map: texture
    }));
  backgroundMesh.scale.set(4, 4, 0);
  backgroundMesh.position.set(0, 0, -50);
  backgroundMesh.material.depthTest = false;
  backgroundMesh.material.depthWrite = false;
  Graph.scene().add(backgroundMesh);

  const camera_pivot = new THREE.Object3D()
  const Y_AXIS = new THREE.Vector3(0, 1, 0);
  Graph.scene().add(camera_pivot);
  camera_pivot.add(Graph.camera());
  Graph.camera().lookAt(camera_pivot.position);


  function click(node, event) {
    // const v = Graph.camera().rotation;
    // Graph.scene().rotation.set(v.x, v.y, v.z);
    // console.log(v);


    // const camera_pivot = new THREE.Object3D()
    // const Y_AXIS = new THREE.Vector3(0, 1, 0);

    // Graph.scene().add(camera_pivot);
    // camera_pivot.add(Graph.camera());
    // // Graph.camera().position.set(0, 0, 620);
    // Graph.camera().lookAt(camera_pivot.position);
    camera_pivot.rotateOnAxis(Y_AXIS, 0.25);
    // camera_pivot.rotateY(0.25);

  }
}

export default Graph;
