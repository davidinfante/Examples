/// The Avatar class
/**
 * @author David Infante, Jose Ariza
 * 
 */
 
class TheScene extends Physijs.Scene {
  
  constructor (aCamera) {

    super();
    this.setGravity(new THREE.Vector3 (0, -20, 0));

    // Attributes
    this.ambientLight = null;
    this.spotLight = null;
    this.camera = aCamera;
    this.map = null;
    this.skybox = null;
    this.crosshair = null;
    this.avatar = null;
    this.createLights();
    this.createCrosshair();
    this.model = this.createModel ();
    this.add (this.model);
  }

  createCrosshair () {
    // Create the Crosshair
    var crosshair = new Crosshair();
    this.camera.add( crosshair );

    // Place it in the center
    var crosshairPercentX = 50;
    var crosshairPercentY = 50;
    var crosshairPositionX = (crosshairPercentX / 100) * 2 - 1;
    var crosshairPositionY = (crosshairPercentY / 100) * 2 - 1;
    crosshair.position.set((crosshairPercentX / 100) * 2 - 1, (crosshairPercentY / 100) * 2 - 1, -0.3);
  }

  jump(){
    this.avatar.jump();
  }
  
  /// It creates lights and adds them to the graph
  createLights () {
    // add subtle ambient lighting
    this.ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    this.add (this.ambientLight);
    
    // add spotlight for the shadows
    this.spotLight = new THREE.SpotLight( 0xffffff );
    this.spotLight.position.set( 0, 500, 1000 );
    this.spotLight.intensity = 1;
    this.spotLight.castShadow = true;
    // the shadow resolution
    this.spotLight.shadow.mapSize.width=2048;
    this.spotLight.shadow.mapSize.height=2048;
    this.add (this.spotLight);
  }
  
  /// It creates the geometric model: ground
  /**
   * @return The model
   */
  createModel () {
    var model = new THREE.Object3D();

    this.avatar = new Avatar(this.camera, controls, this);

    this.skybox = new Skybox();
    model.add(this.skybox);

    //Creates the map
    this.map = new Map();
    for (var i = 0; i < this.map.getMapSize(); ++i) {
      this.add(this.map.getMap(i));
    }

    return model;
  }
  
  /// 
  /**
   * @controls - The GUI information
   */
  animate (delta) {
    this.simulate();


    //Controls and Movements update
    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    direction.z = Number( moveForward ) - Number( moveBackward );
    direction.x = Number( moveLeft ) - Number( moveRight );
    direction.normalize();

    if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
    if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

    if (moveForward) this.avatar.moveForward( velocity.x*delta, velocity.z*delta );
    if (moveBackward) this.avatar.moveBackward( -velocity.x*delta, -velocity.z*delta );
    if (moveLeft) this.avatar.moveLeft( velocity.z*delta, -velocity.x*delta );
    if (moveRight) this.avatar.moveRight( velocity.x*delta, velocity.z*delta );

    if (jumping) {
      this.avatar.jump();
    }

    this.avatar.updateControls();
  }

  /// It returns the camera
  /**
   * @return The camera
   */
  getCamera () {
    return this.camera;
  }
  
  /// It returns the camera controls
  /**
   * @return The camera controls
   */
  getCameraControls () {
    return this.controls;
  }
  
  /// It updates the aspect ratio of the camera
  /**
   * @param anAspectRatio - The new aspect ratio for the camera
   */
  setCameraAspect (anAspectRatio) {
    this.camera.aspect = anAspectRatio;
    this.camera.updateProjectionMatrix();
  }
  
}
