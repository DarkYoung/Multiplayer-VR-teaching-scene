/*
 * @Author: JasonZhang 
 * @Date: 2019-05-10 11:27:15 
 * @Last Modified by: JasonZhang
 * @Last Modified time: 2019-05-22 23:51:23
 */
// 导入css
require('@/css/lib/reset.css');
require('@/css/common/global.less');
require('@/css/page/game.less');
const THREE = require('three');
const GLTFLoader = require('three-gltf-loader');
const JSONLoader = require('three-json-loader');
const io = require('socket.io-client');
const FirstPersonControls = require('@/app/components/controls/FirstPersonControls');
const Model = require('@/app/components/model/Model');
const model = new Model();
const scene = new THREE.Scene();
const SCREEN_WIDTH = window.innerWidth,
  SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45,
  ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
  NEAR = 0.3,
  FAR = 10000;
const host = '47.102.98.109',
  port = 3000;
let clock = new THREE.Clock(),
  playerMap = new Map();
let camera, renderer, light, fpc, socket, duck, steve;
let hasMoved = false;

function init() {
  initView();
  initListener();
}

function initView() {
  initCamera(); // 初始化照相机
  scene.add(camera); // 添加照相机
  initRenderer(); // 初始化渲染器
  document.body.appendChild(renderer.domElement); // 绑定渲染器
  initLight(); // 初始化灯光
  scene.add(light); // 添加灯光
  // 创建天空盒子并添加到场景
  scene.add(model.getSkyBox());
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(model.getModelPath('floor'), function (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(40, 40);
    const floorMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide
    });
    const floorGeometry = new THREE.PlaneGeometry(10000, 10000, 5, 5);
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = 0;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);
  });
  fpc = new FirstPersonControls(camera, document.body, document.getElementById('blocker'));
  scene.add(fpc.yawObject);
  socket = io(host + ':' + port);
  duck = model.getModelPath('duck');
  steve = model.getModelPath('steve');
}

// 监听事件
function initListener() {
  window.addEventListener("resize", onWindowResize);
  fpc.connect(); // 绑定第一人称事件
  socket.on('player', data => {
    if (playerMap.has(data.socketid)) {
      let model = playerMap.get(data.socketid);
      model.position.set(data.position.x, data.position.y, data.position.z);
      model.rotation.set(data.rotation._x, data.rotation._y + Math.PI / 2, data.rotation._z);
    } else {
      const loader = new GLTFLoader();
      loader.load(duck, (mesh) => {
        mesh.scene.scale.set(10, 10, 10);
        scene.add(mesh.scene);
        playerMap.set(data.socketid, mesh.scene);
      });
      emit();
    }
  });
  socket.on('offline', data => {
    if (playerMap.has(data.socketid)) {
      scene.remove(playerMap.get(data.socketid));
      playerMap.delete(data.socketid)
    }
  });
}

// 初始化照相机
function initCamera() {
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 20, 50);
  camera.lookAt(new THREE.Vector3(0, 15, 0));
}

// 初始化渲染器
function initRenderer() {
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
}

// 初始化光源
function initLight() {
  light = new THREE.AmbientLight(0xaaaaaa);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
  hasMoved = fpc.update(clock.getDelta());
  requestAnimationFrame(render);
  if (hasMoved) {
    console.log("move");
    emit()
  }
  renderer.render(scene, camera);
}

function emit() {
  socket.emit('player', {
    position: fpc.yawObject.position,
    rotation: fpc.yawObject.rotation
  });
}

// $(document).ready(() => {
init();
render();
emit();
// });
