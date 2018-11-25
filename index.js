let points = [];
let pointsData;
let connections = [];
let dbclick = false;
let less = 40;
let move = [];
let goodlink = true;
let canvas;
let myMap;
let key = ""; //api key for google
let img;

let mappa = new Mappa("Google", key);
const options = {
  lat: 26.3477945,
  lng: 43.7697994,
  zoom: 17
};
// const options = {
//   lat: 26.3477945,
//   lng: 43.7697994,
//   zoom: 16,
//   width: 640,
//   height: 640,
//   scale: 1,
//   format: 'PNG',
//   language: 'en',
//   maptype: 'terrain'
// }
// myMap = mappa.staticMap(options);

function preload() {
  pointsData = loadJSON("./pointsData/QU.json");
  // img = loadImage(myMap.imgUrl);
}

function setup() {
  pointsData = Object.values(pointsData); //to array

  canvas = createCanvas(640, 640);

  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  for (let i = 1; i < pointsData.length; i++) {
    let index = pointsData[i].index;
    let name = pointsData[i].name;
    let numberOfConnection = pointsData[i].numberOfConnection;
    let connectedPoints = pointsData[i].connectedPoints;
    let x = pointsData[i].x;
    let y = pointsData[i].y;
    let r = pointsData[i].r;
    let level = pointsData[i].level;
    let distance = pointsData[i].distance;
    let lat = pointsData[i].lat;
    let lng = pointsData[i].lng;
    let newPoint = new Point(
      index,
      name,
      numberOfConnection,
      connectedPoints,
      x,
      y,
      r,
      level,
      distance,
      lat,
      lng
    );
    points.push(newPoint);
  }

  connectionSetup();
  let c = 0;
  while (points.find(point => point.level === 100 && c < 100)) {
    levelsetup();
    c++;
  }
  console.log(c);

  if (c >= 100) {
    goodlink = false;
    let badlink = [];
    for (const point of points) {
      if (point.level === 100) {
        badlink.push("[" + point.index + "] " + point.name + "\n");
      }
    }
    text("linking problem\n " + badlink, width / 2, height / 2);
    noLoop();
    return;
  }
  // newPosition();
  console.log(points);
  myMap.onChange(draw);
  noLoop();
}
// console.log(myMap);

function windowResized() {
  // resizeCanvas(windowWidth - less, windowHeight - less);
  // newPosition();
}

function draw() {
  // console.log("drawn");

  if (!goodlink) {
    return;
  }
  clear();
  // image(img, 0, 0);

  push();
  for (const line of connections) {
    line.show();
  }
  pop();
  for (const point of points) {
    point.show();
  }
}
function again() {
  for (let i = 0; i < 60; i++) {
    draw();
  }
}

// function mouseMoved() {
//   if (dbclick) {
//     let vector = createVector(mouseX, mouseY);
//     points[0].changeAxis(vector);
//   }
// }

// function doubleClicked() {
//   if (dbclick) {
//     dbclick = false;
//     return;
//   }
//   if (!points[0].clicked(mouseX, mouseY)) {
//     points.sort(point => {
//       if (point.clicked(mouseX, mouseY)) return -1;
//       return 1;
//     });
//   }
//   if (points[0].clicked(mouseX, mouseY)) {
//     dbclick = true;
//   } else {
//     resetColor();
//     dbclick = false;
//   }
// }
// function mouseClicked() {
//   const position = myMap.pixelToLatLng(mouseX, mouseY);
//   console.log(position);

//   if (!points[0].clicked(mouseX, mouseY)) {
//     points.sort(point => {
//       if (point.clicked(mouseX, mouseY)) return -1;
//       return 1;
//     });
//   }
//   if (move.length < 2 && points[0].clicked(mouseX, mouseY) && !dbclick) {
//     move.push(points[0]);
//     points[0].changeColor(0, 255, 0);
//   }
//   if (move.length == 2 && !dbclick) {
//     let connection = connections.find(c => c.isConnected(move[0], move[1]));
//     if (connections.find(c => c.isConnected(move[0], move[1]))) {
//       connection.changeColor(0, 255, 0);
//     } else {
//       move[0].changeColor(0, 0, 0);
//       move[1].changeColor(0, 0, 0);
//     }
//     move = [];
//   }
// }
function connectionSetup() {
  for (let i = 1; i <= points.length; i++) {
    let connectedPointsJson = pointsData[i].connectedPoints
      ? pointsData[i].connectedPoints
      : [];
    let connectedPointsJsonDistance = pointsData[i].distance
      ? pointsData[i].distance
      : [];
    let newconnectedPoints = [];
    for (let j = 0; j < connectedPointsJson.length; j++) {
      let point = points.find(point => point.index === connectedPointsJson[j]);
      let newconnection = new Connection(
        points[i - 1],
        point,
        connectedPointsJsonDistance[j]
      );

      if (!connections.find(c => c.isConnected(points[i - 1], point))) {
        connections.push(newconnection);
      }
      newconnectedPoints.push(point);
    }
    points[i - 1].setConnection(newconnectedPoints);
  }
}
function refresh() {
  newPosition();
}

function newPosition() {
  let maxlevel = 0.0;
  let levels = new Array(points.length).fill(0);
  for (const point of points) {
    maxlevel = Math.max(maxlevel, point.level);
    levels[point.level]++;
  }
  let drawnLevel = new Array(points.length).fill(0);
  let drawn = [];
  if (!pointsData[1].x && !pointsData[1].y) {
    points[0].changeAxis(createVector(width / 2, points[0].r / 2 + 5));
  }
  for (let i = 0; i < points.length; i++) {
    let connectedPoints = points[i].connectedPoints;
    let currentLevel = points[i].level + 1;
    let countconnected = levels[currentLevel] ? levels[currentLevel] : 1;
    let newX, newY;
    let newWidth = width / countconnected;
    for (let j = 0; j < connectedPoints.length; j++) {
      let XYexists = pointsData.find(
        point => point.index === connectedPoints[j].index
      );
      if (XYexists.x && XYexists.y) {
        break;
      }

      let newHeight = height / maxlevel;

      newX =
        (newWidth * (drawnLevel[currentLevel] + 1) +
          newWidth * drawnLevel[currentLevel]) /
        2;

      newY = newHeight * connectedPoints[j].level - connectedPoints[j].r;
      let vector = createVector(newX, newY);
      let np = points.find(point => point.index === connectedPoints[j].index);

      if (!drawn.includes(np) && np.level === currentLevel) {
        drawnLevel[currentLevel]++;
        drawn.push(np);
        np.changeAxis(vector);
      }
    }
  }
  console.log(drawnLevel, drawn);
}

function newPositionV2() {
  let maxlevel = 0.0;
  let levels = new Array(points.length).fill(0);
  for (const point of points) {
    maxlevel = Math.max(maxlevel, point.level);
    levels[point.level]++;
  }
  let newHeight = height / maxlevel;

  for (let i = 1; i <= maxlevel; i++) {
    let numberOfpoints = levels[i];
    let newWidth = width / numberOfpoints;
    let levelPoints = [];
    for (const point of points) {
      if (point.level == i) {
        levelPoints.push(point);
      }
      if (levelPoints.length === numberOfpoints) {
        break;
      }
    }
    for (let j = 0; j < levelPoints.length; j++) {
      let newX = (newWidth * (j + 1) + newWidth * j) / 2;
      let newY = (newHeight * i + newHeight * (i - 1)) / 2;
      // if(i==1){
      //   newY-=levelPoints[j].r/2
      // }
      let vector = createVector(newX, newY);
      levelPoints[j].changeAxis(vector);
    }
  }
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

function isOverlap(x, y) {
  for (const point of points) {
    let d = dist(point.x, point.y, x, y);
    if (d < point.r) {
      return true;
    }
  }

  return false;
}

function resetColor() {
  connections.map(connection => connection.changeColor());
  points.map(point => point.changeColor());
}

function savej() {
  resetColor();
  let newpointjson = iterationCopy(points);

  newpointjson.unshift({});
  let c = -1;
  for (let i = 1; i < newpointjson.length; i++) {
    let newconnection = [];
    for (const link of newpointjson[i].connectedPoints) {
      newconnection.push(link.index);
    }
    newpointjson[i].connectedPoints = newconnection;
  }

  saveJSON(newpointjson, "points.json");
}
function iterationCopy(src) {
  let target = {};
  for (let prop in src) {
    if (src.hasOwnProperty(prop)) {
      target[prop] = src[prop];
    }
  }

  return Object.values(target);
}
// savej()
