import * as BABYLON from "@babylonjs/core";

const canvas = document.getElementById("canvasId");
const engine = new BABYLON.Engine(canvas);

const createScene = function () {
  const scene = new BABYLON.Scene(engine);
  // scene.clearColor = new BABYLON.Color3(0.1, 0.1, 0.1);

  // scene.createDefaultCameraOrLight(true, false, true);

  var camera = new BABYLON.ArcRotateCamera(
    "camera1",
    -1.5,
    1,
    5,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  camera.attachControl(canvas, true);
  camera.inertia = 0.97;

  var light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  light.intensity = 0.7;

  // var sphere = BABYLON.MeshBuilder.CreateSphere(
  //   "sphere",
  //   { diameter: 1, segments: 32 },
  //   scene
  // );
  // sphere.position.y = 0.5;
  // sphere.position.z = -1;

  // var ground = BABYLON.MeshBuilder.CreateGround(
  //   "ground",
  //   { width: 6, height: 6 },
  //   scene
  // );

  // Gaussian Splatting
  var gs = new BABYLON.GaussianSplattingMesh(
    "Halo",
    "./splat_assets/wine_store.splat",
    scene
  );
  // gs.loadFileAsync("./splat_assets/wine_store.splat").then(() => {
  //   gs.position.y = 1.7;
  // });

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
