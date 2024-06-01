<div id="export" style="display:none;">
<?php

// function debug_to_console($data) {
//   $output = $data;
//   if (is_array($output))
//       $output = implode(',', $output);

//   echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
// }

$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check if file already exists
if (file_exists($target_file)) {
  echo "Sorry, file already exists.";
  $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
  if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
    echo "The file ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " has been uploaded.";
  } else {
    echo "Sorry, there was an error uploading your file.";
  }
}
// if($uploadOk == 1) {
//   header('Location: upload.html');
//   exit;
//  }

$asset_name = basename( $_FILES["fileToUpload"]["name"]);
// debug_to_console($asset_name);
// echo json_encode($asset_name);
echo $asset_name;
echo htmlspecialchars($asset_name);
// echo "<script src='./upload.js'>var name = '$asset_name';</script>";


?>
</div>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./style2.css" />
    <script src="https://cdn.babylonjs.com/babylon.js" defer></script>
    <script src="https://cdn.babylonjs.com/loaders/babylonjs.loaders.min.js" defer></script>
    <title>Uploaded File</title>
  </head>
  <body>
    <canvas id="canvasId"></canvas>
    <script src="https://unpkg.com/earcut@2.2.4/dist/earcut.min.js"></script>
    
    <script type="module">
      // import * as BABYLON from "https://cdn.babylonjs.com/babylon.js";
      // document.addEventListener('DOMContentLoaded', (event) => {

      const canvas = document.getElementById("canvasId");
      const engine = new BABYLON.Engine(canvas);

      const createScene = function () {
        const scene = new BABYLON.Scene(engine);

        var camera = new BABYLON.ArcRotateCamera(
          "camera1",
          -1,
          1,
          10,
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


        var file_name = "<?php echo $asset_name?>";
        console.log(file_name);
        if (file_name) {
          var gs = new BABYLON.GaussianSplattingMesh(
            "Halo",
            "./uploads/" + file_name,
            scene
          );
        }

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
    // });
    </script>
  </body>
</html>
