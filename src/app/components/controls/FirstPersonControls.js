/*
 * @Author: JasonZhang 
 * @Date: 2019-05-10 11:26:15 
 * @Last Modified by: JasonZhang
 * @Last Modified time: 2019-05-12 23:47:17
 */
const THREE = require('three');
// const Physijs = require('physijs');

module.exports = (function () {
  const KEY_W = 87;
  const KEY_S = 83;
  const KEY_A = 65;
  const KEY_D = 68;
  const KEY_SPACE = 32;

  var velocity = new THREE.Vector3();

  function FirstPersonControls(camera, domElement, blocker) {
    this.domElement = domElement || document.body;
    this.isLocked = false;
    this.camera = camera;

    this.blocker = blocker;

    // 初始化camera, 将camera放在pitchObject正中央
    camera.rotation.set(0, 0, 0);
    camera.position.set(0, 0, 0);

    // 将camera添加到pitchObject, 使camera沿水平轴做旋转, 并提升pitchObject的相对高度
    this.pitchObject = new THREE.Object3D();
    this.pitchObject.add(camera);
    this.pitchObject.position.y = 10;

    // 将pitObject添加到yawObject, 使camera沿竖直轴旋转
    this.yawObject = new THREE.Object3D();
    this.yawObject.add(this.pitchObject);

    // 初始化移动状态
    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.canJump = false;
  }

  FirstPersonControls.prototype = {
    constructor: FirstPersonControls,

    onPointerLockChange: function () {
      console.log(this.domElement);
      this.isLocked = document.pointerLockElement === this.domElement;
      if (this.isLocked === true) {
        this.blocker.style.display = 'none';
      }else{
        this.blocker.style.display = 'block';
      }
    },

    onPointerLockError: function () {
      console.error('THREE.PointerLockControls: Unable to use Pointer Lock API');
    },

    onMouseMove: function (event) {
      if (this.isLocked) {
        let movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        let movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        this.yawObject.rotation.y -= movementX * 0.002;
        this.pitchObject.rotation.x -= movementY * 0.002;
        // 这一步的目的是什么
        this.pitchObject.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitchObject.rotation.x));
      }
    },

    onKeyDown: function (event) {
      switch (event.keyCode) {
        case KEY_W:
          this.moveForward = true;
          break;
        case KEY_A:
          this.moveLeft = true;
          break;
        case KEY_S:
          this.moveBackward = true;
          break;
        case KEY_D:
          this.moveRight = true;
          break;
        case KEY_SPACE:
          if (canJump === true)
            velocity.y += 250;
          this.jump = false;
          break;
      }
    },

    onKeyUp: function (event) {
      switch (event.keyCode) {
        case KEY_W:
          this.moveForward = false;
          break;
        case KEY_A:
          this.moveLeft = false;
          break;
        case KEY_S:
          this.moveBackward = false;
          break;
        case KEY_D:
          this.moveRight = false;
          break;
      }
    },

    update: function (delta) {
      if (!this.isLocked)
        return false;
      // 移动速度
      const moveSpeed = 100;

      // 确定移动方向
      let direction = new THREE.Vector3();
      direction.x = Number(this.moveRight) - Number(this.moveLeft);
      direction.z = Number(this.moveBackward) - Number(this.moveForward);
      direction.y = 0;

      // 移动方向向量归一化，使得实际移动的速度大小不受方向影响
      if (direction.x !== 0 || direction.z !== 0) {
        direction.normalize();
      }

      // velocity.x -= velocity.x * 10.0 * delta;
      // velocity.z -= velocity.z * 10.0 * delta;
      velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

      // if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
      // if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

      // 移动距离等于速度乘上间隔时间delta
      let translateZ = moveSpeed * direction.z * delta,
        translateX = moveSpeed * direction.x * delta;
      if (this.moveForward || this.moveBackward) {
        this.yawObject.translateZ(translateZ);
      }
      if (this.moveLeft || this.moveRight) {
        this.yawObject.translateX(translateX);
      }
      this.pitchObject.position.y += (velocity.y * delta);
      if (this.pitchObject.position.y < 10) {
        velocity.y = 0;
        this.pitchObject.position.y = 10;
        canJump = true;
      }
      return Math.abs(translateZ) > 0 || Math.abs(translateX) > 0;
    },

    connect: function () {
      this.blocker.style.display = 'block';
      this.domElement.addEventListener('click', this.domElement.requestPointerLock);
      // 在函数后面添加bind(this)的目的是什么
      document.addEventListener('pointerlockchange', this.onPointerLockChange.bind(this), false);
      document.addEventListener('pointerlockerror', this.onPointerLockError.bind(this), false);
      document.addEventListener('mousemove', this.onMouseMove.bind(this), false);
      document.addEventListener('keydown', this.onKeyDown.bind(this), false);
      document.addEventListener('keyup', this.onKeyUp.bind(this), false);
    }

  };
  return FirstPersonControls
})();
