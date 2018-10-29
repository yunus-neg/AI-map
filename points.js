class Point {
  constructor(index,numberOfConnection,connectedPoints, x, y, r) {
    this.r = r ? r : 50;
    this.x = x ? x : random(this.r * 2, width - this.r * 2);
    this.y = y ? y : random(this.r * 2, height - this.r * 2);
    this.index = index || index == 0 ? index : -1;
    this.numberOfConnection=numberOfConnection?numberOfConnection:0;
    this.connectedPoints=connectedPoints?connectedPoints:[];
  }
  show() {
    textAlign(CENTER,CENTER);
    ellipse(this.x, this.y, this.r, this.r);
    text(this.index, this.x, this.y);
  }
  getAxis(){
      return createVector(this.x, this.y)
  }
  changeAxis(New){
    this.x=New.x
    this.y=New.y
  }
  getConnected(){
      return this.connectedPoints;
  }
}
