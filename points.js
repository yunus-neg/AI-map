class Point {
  constructor(index,name, numberOfConnection, connectedPoints, x, y, r,level) {
    this.index = index || index == 0 ? index : -1;
    this.name = name ? name : "Unknown";
    this.r = r ? r : 75;
    this.x = x ? x : random(this.r * 2, width - this.r * 2);
    this.y = y ? y : random(this.r * 2, height - this.r * 2);
    this.connectedPoints = connectedPoints ? connectedPoints : [];
    this.numberOfConnection = numberOfConnection ? numberOfConnection : this.connectedPoints.length;
    this.level=level?level:100;
  }
  show() {
    textAlign(CENTER, CENTER);
    ellipse(this.x, this.y, this.r, this.r);
    // textSize(this.name.length>10?10:15)
    // console.log(this.name.length);

    text("["+this.index+"] "+this.name.substring(0,9), this.x, this.y);
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
  setConnection(connection){
    this.connectedPoints=connection;
    this.numberOfConnection =this.connectedPoints.length
  }
}
