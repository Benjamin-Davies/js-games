// RENDERER
var lefthud = document.getElementById("lefthud");
var renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("gameCanvas"),
  antialias: true
});
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// CAMERA
var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 3000);
camera.position.set(0, 10, 10);
camera.rotation.set(Math.PI * -0.2, 0, 0);

// SCENE
var scene = new THREE.Scene();

// LIGHTS
var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
var light1 = new THREE.PointLight(0xffffff, 0.5);
light1.position.set(0, 5, 1);
scene.add(light1);

// MESHES
var avatarGeometry = new THREE.SphereGeometry(1.5);
var avatarMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
var avatar = new THREE.Mesh(avatarGeometry, avatarMaterial);
scene.add(avatar);

var floorGeometry = new THREE.PlaneGeometry(15, 500);
var floorMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff });
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.set(0, -1.5, -70);
floor.rotation.set(-Math.PI / 2, 0, 0);
scene.add(floor);

var obstacleGeometry = new THREE.CubeGeometry(3, 3, 3);
var obstacleMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
var obstacles, numberOfObstacles = 20;
function initObstacles() {
  var newArray = false;
  if (!obstacles || obstacles.length < numberOfObstacles) {
    obstacles = [];
    newArray = true;
  }
  for (var i = 0; i < numberOfObstacles; i++) {
    if (newArray) {
      obstacles[i] = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
      scene.add(obstacles[i]);
    }
    obstacles[i].lane = Math.floor(Math.random() * 3);
    obstacles[i].position.set(obstacles[i].lane * 5 - 5, 0, i * -10 - 50);
  }
}
initObstacles();

// RENDER LOOP
var lane = 1, paused = false,
  jumpVel = 1, gravity = -0.1, yPos = 0, yVel = 0,
  startSpeed = 0.4, speed = startSpeed, distance = 0, best = 0;
requestAnimationFrame(render);
function render() {
  if (!paused) {
    yVel += gravity;
    yPos += yVel;

    for (var i = 0; i < numberOfObstacles; i++) {
      obstacles[i].position.z += speed;
      if (obstacles[i].position.z >= 20) {
        obstacles[i].lane = Math.floor(Math.random() * 3);
        obstacles[i].position.set(obstacles[i].lane * 5 - 5, 0, numberOfObstacles * -10 + 20);
      }

      // collision detection
      if (lane == obstacles[i].lane && Math.abs(obstacles[i].position.z) < 3 && avatar.position.y < 3) {
        initObstacles();
        lane = 1;
        best = Math.max(distance, best);
        distance = 0;
        speed = startSpeed;
      }
    }

    var cx = avatar.position.x;
    var tx = (lane - 1) * 5;
    avatar.position.x = cx + (tx - cx) / 5;
    avatar.position.y = Math.max(0, yPos);
    avatar.rotation.x -= 0.05;
    
    distance += speed / 10;
    speed += 0.0005;
    lefthud.innerText = "Distance: " + Math.floor(distance) + "m\nBest: " + Math.floor(best) + "m";

    renderer.render(scene, camera);
  }
  requestAnimationFrame(render);
}

// EVENTS
window.addEventListener("keydown", function(event) {
  if (event.key == "Escape") {
    paused = !paused;
    document.getElementById("over").style.height = paused ? "100%" : "0";
  } else if (paused) return;
  else if (event.key == "w") {
    yPos = 0;
    yVel = jumpVel;
  } else if (event.key == "a" && lane > 0) {
    lane--;
  } else if (event.key == "d" && lane < 2) {
    lane++;
  }
});

window.addEventListener("resize", function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});
