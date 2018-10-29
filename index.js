let points = [];
let pointsData;
let connections = [];

function preload() {
  pointsData = loadJSON("points.json");
}

function setup() {
  createCanvas(800, 600);

  for (let i = 0; i < Object.keys(pointsData).length; i++) {
    let index = pointsData[i].index;
    let name = pointsData[i].name;
    let numberOfConnection = pointsData[i].numberOfConnection;
    let connectedPoints = pointsData[i].connectedPoints;
    let x = pointsData[i].x;
    let y = pointsData[i].y;
    let r = pointsData[i].r;
    let newPoint = new Point(
      index,
      name,
      numberOfConnection,
      connectedPoints,
      x,
      y,
      r
    );
    points.push(newPoint);
  }

  connectionSetup();

  newPointsPosition();
  console.log(points);

}

function draw() {
  let x = random(10);
  background(80);

  push();
  for (const line of connections) {
    line.show();
  }
  pop();
  for (const point of points) {
    point.show();
  }
}

function connectionSetup() {
  for (let i = 0; i < points.length; i++) {
    let connectedPointsJson = pointsData[i].connectedPoints;
    let newconnectedPoints = [];
    for (let j = 0; j < connectedPointsJson.length; j++) {
      let point = points.find(point => point.index === connectedPointsJson[j]);
      let newconnection = new Connection(points[i], point);

      if (!connections.find(c => c.isConnected(points[i], point))) {
        connections.push(newconnection);
      }
      newconnectedPoints.push(point);
    }
    points[i].setConnection(newconnectedPoints);
  }

  //   points.sort((a, b) => b.numberOfConnection - a.numberOfConnection);
}
function refresh() {
newPointsPosition()
}

function newPointsPosition() {
  let l = points.length,
    newHeight = height / l,
    newWidth = width / l;
  r = points[0].r;
  // console.log(r*2,width-(r*2));
  let levels = new Array(points.length).fill(points.length);
  //   for (let i = 0; i < points.length; i++) {}

  for (let i = 0; i < points.length; i++) {
    let min = i * newHeight < r * 2 ? r : i * newHeight,
      max = (i + 1) * newHeight >= height ? height - r : (i + 1) * newHeight;
    let newX = random(r, width - r),
      newY = random(min, max);
    //   console.log(newX,width,newY,height);
    // console.log(min, max);

    let v = createVector(newX, newY);
    points[i].changeAxis(v);
  }
}

function savej() {
  saveJSON(points, "points.json");
}
