import './3d-force-graph.css';
import ForceGraph3D from './3d-force-graph';
import * as THREE from 'three';
// import { nodes, links } from './nodes';
import { branches } from './tree';

const Graph = (elem, dagMode) => {

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
    return false;
  }

  const nodes = [], links = [];
  const parseBranch = branch => {
    const i = branch.indexOf(',');
    const size = branch.substr(0, i);
    // const size = sz.length > 0 ? Number(sz) : 1;
    const path = branch.substr(i + 1);
    return { size, path };
  }
  branches.forEach( branch => {
    const { size, path } = parseBranch(branch);
    const levels = path.split('/'),
      level = levels.length - 1,
      module = level > 0 ? levels[1] : null,
      leaf = levels.pop(),
      parent = levels.join('/');
    const node = {
      path,
      leaf,
      module,
      size: +size || 20,
      level
    };

    nodes.push(node);
    if (parent) {
      links.push({ source: parent, target: path, targetNode: node });
    }
  })

  const gData = { nodes, links };

// 'td', 'bu', 'lr', 'rl', 'zout', 'zin', 'radialout', 'radialin', null

  const Graph = ForceGraph3D(); // ForceGraph3D({ controlType: 'orbit' });
  Graph(elem)
    .width(elem.clientWidth - 1)
    .height(elem.clientHeight - 1)
    .cameraPosition({ z: 800 })
    .backgroundColor('black')
    .onNodeClick(click)
    .onNavigating(Navi);

  const NODE_REL_SIZE = 1;
  Graph
    .graphData(gData)
    .dagMode('td')
    .dagLevelDistance(150)
    .linkColor(() => 'rgba(255,255,255,0.5)')
    .nodeRelSize(NODE_REL_SIZE)
    .nodeId('path')
    .nodeVal('size')
    .nodeLabel('path')
    .nodeAutoColorBy('module')
    .nodeOpacity(0.9)
    .linkDirectionalParticles(2)
    .linkDirectionalParticleWidth(0.8)
    .linkDirectionalParticleSpeed(0.006)
    .d3Force('collision');

  var texture = new THREE.TextureLoader().load("data/image-5.jpg");
  var backgroundMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 150, 1),
    new THREE.MeshBasicMaterial({
      map: texture
    }));
  backgroundMesh.scale.set(5, 4, 0);
  backgroundMesh.position.set(0, 0, -100);
  backgroundMesh.material.depthTest = false;
  backgroundMesh.material.depthWrite = false;
  Graph.scene().add(backgroundMesh);

  const camera_pivot = new THREE.Object3D()
  const Y_AXIS = new THREE.Vector3(0, 1, 0);
  Graph.scene().add(camera_pivot);
  camera_pivot.add(Graph.camera());
  Graph.camera().lookAt(camera_pivot.position);


  function click(node, event) {
    camera_pivot.rotateOnAxis(Y_AXIS, 0.25);
  }

  function setDagMode(orientation) {
    Graph.dagMode(orientation)
  }

  return setDagMode;

}

export default Graph;
