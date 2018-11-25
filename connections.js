class Connection {
  constructor(p1, p2, distance, Cr, Cg, Cb) {
    this.indexes = [p1.index, p2.index];
    this.p1 = p1;
    this.p2 = p2;
    this.p1x = p1.getAxis().x;
    this.p1y = p1.getAxis().y;
    this.p2x = p2.getAxis().x;
    this.p2y = p2.getAxis().y;
    this.distance = distance ? distance : floor(random(5, 20));
    this.Cr = Cr ? Cr : 0;
    this.Cg = Cg ? Cg : 0;
    this.Cb = Cb ? Cb : 0;
  }
  show() {
    this.updateAxis();
    let c = color(this.Cr, this.Cg, this.Cb);
    if(this.p1.lat!==-1&&this.p1.lng!==-1&&this.p2.lat!==-1&&this.p2.lng!==-1){

    push();
    stroke(c);
    line(this.p1x, this.p1y, this.p2x, this.p2y);
    pop();

    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(15);
    text(this.distance, (this.p1x + this.p2x) / 2, (this.p1y + this.p2y) / 2);
    pop();
    }
  }

  isConnected(p1, p2) {
    this.updateAxis();
    let x1 = p1.getAxis().x,
      y1 = p1.getAxis().y,
      x2 = p2.getAxis().x,
      y2 = p2.getAxis().y;
    // console.log(x1, this.p1x, y1, this.p1y, x2, this.p2x, y2, this.p2y);

    if (
      x1 === this.p1x &&
      y1 === this.p1y &&
      x2 === this.p2x &&
      y2 === this.p2y
    ) {
      return true;
    }
    if (
      x1 === this.p2x &&
      y1 === this.p2y &&
      x2 === this.p1x &&
      y2 === this.p1y
    ) {
      return true;
    }
    return false;
  }
  updateAxis() {
    this.p1x = this.p1.getAxis().x;
    this.p1y = this.p1.getAxis().y;
    this.p2x = this.p2.getAxis().x;
    this.p2y = this.p2.getAxis().y;
  }
  changeColor(r, g, b) {
    this.Cr = r ? r : 0;
    this.Cg = g ? g : 0;
    this.Cb = b ? b : 0;
  }
}
