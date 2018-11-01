let points = [];
let pointsData;
let connections = [];

function preload() {
  pointsData = loadJSON("points.json");
}

function setup() {
  let less = 45;
  createCanvas(windowWidth - less, windowHeight - less);

  for (let i = 0; i < Object.keys(pointsData).length; i++) {
    let index = pointsData[i].index;
    let name = pointsData[i].name;
    let numberOfConnection = pointsData[i].numberOfConnection;
    let connectedPoints = pointsData[i].connectedPoints;
    let x = pointsData[i].x;
    let y = pointsData[i].y;
    let r = pointsData[i].r;
    let level = pointsData[i].level;
    let newPoint = new Point(
      index,
      name,
      numberOfConnection,
      connectedPoints,
      x,
      y,
      r,
      level
    );
    points.push(newPoint);
  }

  connectionSetup();
  levelsetup();
  //   newPointsPosition();
  newPositionv2();
  console.log(points);

}

function draw() {
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

  // points.sort((a, b) => b.numberOfConnection - a.numberOfConnection);
}
function refresh() {
  newPosition();
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

function newPosition() {
  let maxlevel = 0;
  for (const point of points) {
    maxlevel = Math.max(maxlevel, point.level);
  }
  let newHeight = height / maxlevel;
  console.log(newHeight);

  for (const point of points) {
    let min = (point.level - 1) * newHeight;

    let max = point.level * newHeight;
    console.log(min, max, point.index);

    let newX = random(point.r, width - point.r);
    let newY = (min + max) / 2;
    let vector = createVector(newX, newY);
    // console.log(vector,point.index);

    point.changeAxis(vector);
  }
}

function newPositionv2() {
  let maxlevel = 0;
  let levels=new Array(points.length).fill(0)
  for (const point of points) {
    maxlevel = Math.max(maxlevel, point.level);
    levels[point.level]++
  }
  points[0].changeAxis(createVector(width/2,points[0].r/2))
  let newHeight = height / maxlevel;
  console.log(newHeight);

  for (let i=0;i<points.length;i++) {
    let connectedPoints=points[i].connectedPoints
    let countconnected=levels[points[i].level]
    let newWidth=width/countconnected
    for(let j=0;j<connectedPoints.length;j++){
       newWidth=width/countconnected

      let newX=newWidth*(j+1)
      let newY=points[i].y+50;
      let vector=createVector(newX,newY)
      console.log(connectedPoints[j]);

      let np=points.find(point => point.index === connectedPoints[j].index)
      np.changeAxis(vector)
    }
  }

  // for (const point of points) {
  //   let min = (point.level - 1) * newHeight;

  //   let max = point.level * newHeight;
  //   console.log(min, max, point.index);

  //   let newX = random(point.r, width - point.r);
  //   let newY = (min + max) / 2;
  //   let vector = createVector(newX, newY);
  //   // console.log(vector,point.index);

  //   point.changeAxis(vector);
  // }
}

function levelsetup() {
  points[0].level = 1;
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points[i].connectedPoints.length; j++) {
      let pointIndex = points[i].connectedPoints[j].index;
      let connectedPoint = points.find(point => point.index === pointIndex);
      connectedPoint.level =
        points[i].level + 1 < connectedPoint.level
          ? points[i].level + 1
          : connectedPoint.level;
    }
  }

  points.sort((a, b) => a.level - b.level);
}
function savej() {
  let newpointjson = points;
  for (const point of newpointjson) {
    let newconnection = [];
    for (const link of point.connectedPoints) {
      newconnection.push(link.index);
    }
    point.connectedPoints = newconnection;
  }
  saveJSON(newpointjson, "points.json");
}
