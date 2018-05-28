/// The Map class
/**
 * @author David Infante, Jose Ariza
 * 
 */

class Map {

  constructor () {

    this.map_size = 0;
    this.map = [];

    var loader = new THREE.TextureLoader();
    var texturaMetal = loader.load ("imgs/metal.jpg");

    var mat = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: texturaMetal}),0,0);
    
    var start1 = new Physijs.BoxMesh (new THREE.BoxGeometry (1000, 0.0, 1000, 1, 1, 1), mat, 0);
    start1.applyMatrix (new THREE.Matrix4().makeTranslation (0, 0, 0));
    start1.rotation.z = 0.2;
    start1.__dirtyRotation = true;
    start1.receiveShadow = true;
    start1.autoUpdateMatrix = false;
    this.map.push(start1);
    ++this.map_size;

    return this;
  }

  getMap(i) {
    return this.map[i];
  }

  getMapSize() {
    return this.map_size;
  }
}
