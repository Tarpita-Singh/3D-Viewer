import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

const canvas = document.getElementById("canvasRobo1");
const engine = new BABYLON.Engine(canvas);

const createScene = function () {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(
    0.6313725490196078,
    0.7647058823529411,
    0.8196078431372549
  );

  const camera = new BABYLON.ArcRotateCamera(
    "camera1",
    -1.3,
    1.5,
    10,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  camera.attachControl(canvas, true);
  camera.lowerRadiusLimit = 10;
  camera.upperRadiusLimit = 10;

  var light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  BABYLON.SceneLoader.ImportMesh(
    "",
    "./gltf_files/animated_humanoid_robot/",
    "scene.gltf",
    scene,
    function (meshes, particleSystems, sleketons, animationGroups) {
      const model = meshes[0];
      model.scaling = new BABYLON.Vector3(0.45, 0.45, 0.45);
      model.position.y = -3;

      // change axis of rotation

      //   var CoR_At = new BABYLON.Vector3(0, 0, 0);
      //   var axis = new BABYLON.Vector3(3, 0, 0);
      //   var pilotStart = new BABYLON.Vector3(0, -3, 0);
      //   model.position = pilotStart;
    }
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
