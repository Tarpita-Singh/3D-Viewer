// import * as BABYLON from "@babylonjs/core";

const canvas = document.getElementById("canvasId");
const engine = new BABYLON.Engine(canvas);

const createScene = function () {
  const scene = new BABYLON.Scene(engine);
  // scene.clearColor = new BABYLON.Color3(0.1, 0.1, 0.1);

  // scene.createDefaultCameraOrLight(true, false, true);

  var camera = new BABYLON.ArcRotateCamera(
    "camera1",
    -0.1,
    1.7,
    3,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  camera.attachControl(canvas, true);
  camera.inertia = 0.97;
  //   camera.position.x = 3;

  var light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  light.intensity = 0.7;

  var gs = new BABYLON.GaussianSplattingMesh(
    "Halo",
    "./splat_assets/military_museum.splat",
    scene
  );

  return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
  scene.render();
});

//make it responsive
window.addEventListener("resize", function () {
  engine.resize();
});
