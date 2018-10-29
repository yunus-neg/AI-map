let points = [];
let connections = [];

function setup() {
  createCanvas(800, 700);

  for (let i = 0; i < 12; i++) {
    points.push(new Point(i));
  }
  connectionSetup();
  setConnectedPoints()
  //   console.log(points);
  newPoints();

}

function draw() {
  let x = random(10);
  background(80);
  // color(gray, [alpha])
  // fill(250)

  // eclipse()
  push();
  for (const line of connections) {
    line.show();
  }
  pop();
  for (const point of points) {
    point.show();
  }
}
function setConnection(){
    connections.push(new Connection(points[0], points[1])); //     G[0][1]=G[1][0]=true;
    connections.push(new Connection(points[0], points[8])); //  G[0][8]=G[8][0]=true;
    connections.push(new Connection(points[0], points[4])); //  G[0][4]=G[4][0]=true;
    connections.push(new Connection(points[1], points[2])); //  G[1][2]=G[2][1]=true;
    connections.push(new Connection(points[1], points[3])); //  G[1][3]=G[3][1]=true;
    connections.push(new Connection(points[2], points[6])); //  G[2][6]=G[6][2]=true;
    connections.push(new Connection(points[3], points[4])); //  G[3][4]=G[4][3]=true;
    connections.push(new Connection(points[3], points[5])); //  G[3][5]=G[5][3]=true;
    connections.push(new Connection(points[6], points[7])); //  G[6][7]=G[7][6]=true;
    connections.push(new Connection(points[8], points[9])); //  G[8][9]=G[9][8]=true;
    connections.push(new Connection(points[9], points[10])); //  G[9][10]=G[10][9]=true;
    connections.push(new Connection(points[10], points[11])); //  G[10][11]=G[11][10]=true;
}
function connectionSetup() {
    setConnection()





  for (let i = 0; i < points.length; i++) {
    let realConnection = 0;
    for (let j = 0; j < points.length; j++) {
      for (const c of connections) {
        if (c.isConnected(points[i], points[j])) {
          realConnection++;
        }
      }
    }
    points[i].numberOfConnection = realConnection;
  }
  points.sort((a, b) => b.numberOfConnection - a.numberOfConnection);

}
function refresh() {
  for (let i = points.length; i >= 0; i--) {
    points.pop();
  }
  for (let i = connections.length; i >= 0; i--) {
    connections.pop();
  }
  for (let i = 0; i < 12; i++) {
    points.push(new Point(i));
  }
  connectionSetup();
}

function newPoints() {
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

function setConnectedPoints() {
  for (let i = 0; i < points.length; i++) {
    let connected = [];
    for (let j = 0; j < points.length; j++) {
        for (const c of connections) {
            if (c.isConnected(points[i], points[j])&&!connected.includes(j)) {
                connected.push(j);
            }
          }
    }
    points[i].connectedPoints=connected
  }
  for (const point of points) {
    console.log(point.index,point.connectedPoints);

  }
console.log(points);

}
