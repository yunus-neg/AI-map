class Point {
  constructor(
    index,
    name,
    numberOfConnection,
    connectedPoints,
    x,
    y,
    r,
    level,
    distance
  ) {
    this.index = index;
    this.name = name ? name : "Unknown";
    this.r = r ? r : 75;
    this.x = x ? x : random(this.r * 2, width - this.r * 2);
    this.y = y ? y : random(this.r * 2, height - this.r * 2);
    this.connectedPoints = connectedPoints ? connectedPoints : [];
    this.distance = distance ? distance : [];
    this.numberOfConnection = numberOfConnection
      ? numberOfConnection
      : this.connectedPoints.length;
    this.level = level ? level : 100;
    this.Cr = 0;
    this.Cg = 0;
    this.Cb = 0;
  }
  show() {
    this.numberOfConnection = this.connectedPoints.length;
    push();
    stroke(this.Cr, this.Cg, this.Cb);
    strokeWeight(1.75);

    ellipse(this.x, this.y, this.r, this.r);
    pop();
    textSize(this.name.length>10?11:15)

    let XY = "\n" + this.x + " | " + this.y;
    // textSize(14);
    let textString = "[" + this.index + "] " + this.name.substring(0, 100);
    textAlign(CENTER, CENTER);

    text(textString, this.x, this.y);
  }
  getAxis() {
    return createVector(this.x, this.y);
  }
  changeAxis(New) {
    this.x = New.x;
    this.y = New.y;
  }
  getConnected() {
    return this.connectedPoints;
  }
  setConnection(connection) {
    this.connectedPoints = connection;
    this.numberOfConnection = this.connectedPoints.length;
  }
  clicked(x, y) {
    let d = dist(this.x, this.y, x, y);
    if (d < this.r / 2) return true;
    return false;
  }
  changeColor(r, g, b) {
    this.Cr = r ? r : 0;
    this.Cg = g ? g : 0;
    this.Cb = b ? b : 0;
  }
}
