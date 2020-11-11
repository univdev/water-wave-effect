class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'canvas');
    this.ctx = this.canvas.getContext('2d');
    document.body.prepend(this.canvas); // 캔버스 배치
    this.resize();

    window.addEventListener('resize', () => {
      this.resize();
    });

    // window.setInterval(() => {
    //   this.clear();
    //   this.draw();
    // }, 10);
  }

  resize() {
    this.screenWidth = window.document.documentElement.clientWidth;
    this.screenHeight = window.document.documentElement.clientHeight;
    this.canvas.setAttribute('width', this.screenWidth * 2);
    this.canvas.setAttribute('height', this.screenHeight * 2);
    this.ctx.scale(2, 2);
    this.clear();
    this.draw();
  }
  
  clear() {
    this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
  }

  draw() {
    const startX = 0;
    const endX = this.screenWidth;
    const centerY = this.screenHeight / 2;
    const points = new Points(startX, endX, centerY, 5);
    for (let i = 0; i < points.length; i += 1) {
      const point = points.items[i];
      this.ctx.beginPath();
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(point.x, point.y, 5, 5);
      this.ctx.closePath();
    }
  }
}

class Point {
  constructor(fixedX, fixedY, distance, speed, currentDirection) {
    // fixedX: 이 점이 가질 고정 x
    // fixedY: 이 점이 가질 고정 y
    // distance: 고정 높이로부터 움직일 수 있는 거리의 상한선
    // speed: 거리의 상한선 내에서 거리가 조정되는 속도
    // currentDirection: 포인터가 움직이는 방향을 1(아래)이나 -1(위)로 나타냄.
    this.fixedX = fixedX;
    this.fixedY = fixedY;
    this.x = fixedX;
    this.y = fixedY;
    this.distance = distance;
    this.speed = speed;
    this.currentDirection = currentDirection;
    this.animate();
  }
  animate() {
    const destination = this.fixedY + (this.distance * this.currentDirection);
    console.log(destination);
  }
}

class Points {
  constructor(startX, endX, centerY, count) {
    this.items = [];
    const distance = Math.abs(endX - startX);
    const pointDistance = distance / count;
    for (let i = 0; i < count; i += 1) {
      const x = pointDistance * (i + 1);
      const y = centerY;
      const centerIndex = count / 2;
      const direction = (centerIndex <= i) ? -1 : 1;
      this.items.push(new Point(x, y, 500, 1, direction));
    }
    this.items.unshift(new Point(0, centerY, 0, 0, 0));
    this.length = this.items.length;
  }
}

const app = new App();
