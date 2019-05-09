const THREE = require('three');
const red = new THREE.Color(0xff0000);
const green = new THREE.Color(0x00ff00);
const blue = new THREE.Color(0x0000ff);
const px = require('../../../assets/textures/skybox/px.jpg');
const nx = require('../../../assets/textures/skybox/nx.jpg');
const py = require('../../../assets/textures/skybox/py.jpg');
const ny = require('../../../assets/textures/skybox/ny.jpg');
const pz = require('../../../assets/textures/skybox/pz.jpg');
const nz = require('../../../assets/textures/skybox/nz.jpg');
const modelGlbMap = {
  'duck': require('../../../assets/models/duck.glb'),
  'floor': require('../../../assets/textures/floor/FloorsCheckerboard_S_Diffuse.jpg')
};
const textureLoader = new THREE.TextureLoader();

module.exports = (function () {
  function Model() {

  }
  Model.prototype = {
    constructor: Model,
    getModelPath: function (name) {
      return modelGlbMap[name];
    },
    getBigBall: function () {
      const material = new THREE.MeshPhongMaterial({
        color: 0x80FC66,
        specular: 0xFFFFFF,
        shininess: 100,
        opacity: 0.5,
        transparent: true
      });
      return new THREE.Mesh(new THREE.SphereGeometry(15, 16, 16), material);
    },
    getSmallBall: function () {
      const geometry = new THREE.Geometry();
      geometry.vertices.push(new THREE.Vector3(0, 0, 0));
      geometry.vertices.push(new THREE.Vector3(1, 0, 0));
      geometry.vertices.push(new THREE.Vector3(0, 2, 0));
      geometry.faces.push(new THREE.Face3(0, 1, 2));

      geometry.faces[0].vertexColors = [red, green, blue];
      const material = new THREE.MeshLambertMaterial({
        color: 0xB3B3B3,
        transparent: false
      });
      const ka = 0.4;
      material.color.setRGB(material.color.r * ka, material.color.g * ka, material.color.b * ka);
      return new THREE.Mesh(new THREE.SphereGeometry(10, 16, 16), material);
    },
    getSkyBox: function () {
      const skyBoxGeometry = new THREE.BoxGeometry(500, 500, 500);
      // 接下来创建材质并映射到指定图片，设定为只渲染背面（对立方体来说，从外面看到的是正面，从内部看到的是背面）
      const skyBoxMaterial = [
        new THREE.MeshBasicMaterial({
          map: textureLoader.load(px),
          side: THREE.BackSide
        }), // right
        new THREE.MeshBasicMaterial({
          map: textureLoader.load(nx),
          side: THREE.BackSide
        }), // left
        new THREE.MeshBasicMaterial({
          map: textureLoader.load(py),
          side: THREE.BackSide
        }), // top
        new THREE.MeshBasicMaterial({
          map: textureLoader.load(ny),
          side: THREE.BackSide
        }), // bottom
        new THREE.MeshBasicMaterial({
          map: textureLoader.load(pz),
          side: THREE.BackSide
        }), // back
        new THREE.MeshBasicMaterial({
          map: textureLoader.load(nz),
          side: THREE.BackSide
        }) // front
      ];

      // 创建天空盒子
      return new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    }
  };
  return Model;
})();
