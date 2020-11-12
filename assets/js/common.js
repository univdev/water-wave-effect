class App {
  constructor() {    
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'canvas');
    this.ctx = this.canvas.getContext('2d');
    this.color = { r: 0, g: 0, b: 255 };
    this.waves = [];
    this.resize();

    const startX = 0;
    const endX = this.screenWidth;
    const centerY = this.screenCenterY;
    for (let i = 0; i < 5; i += 1) this.waves.push(new Points(startX, endX, centerY, 5));
    this.fps = 60;

    document.body.prepend(this.canvas); // 캔버스 배치

    window.setInterval(() => {
      this.draw();
    }, 1000 / this.fps);
  }

  resize() {
    this.screenWidth = window.document.documentElement.clientWidth;
    this.screenHeight = window.document.documentElement.clientHeight;
    this.screenCenterX = this.screenWidth / 2;
    this.screenCenterY = this.screenHeight / 2;
    this.canvas.setAttribute('width', this.screenWidth * 2);
    this.canvas.setAttribute('height', this.screenHeight * 2);
    this.ctx.scale(2, 2);
  }
  
  clear() {
    this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
  }

  draw() {
    this.clear();
    for (let i = 0; i < this.waves.length; i += 1) {
      const wave = this.waves[i];
      const firstPoint = wave.items[0];
      const opacityDistance = 0.8 / this.waves.length;
      const opacity = 0.8 - opacityDistance * i;
      let prevX = firstPoint.x;
      let prevY = firstPoint.y;
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${opacity})`;
      this.ctx.moveTo(prevX, prevY);
      for (let j = 1; j < wave.length - 1; j += 1) {
        wave.items[j].animate();
      }
      for (let j = 1; j < wave.length; j += 1) {
        const point = wave.items[j];
        this.ctx.quadraticCurveTo(prevX, prevY, point.x, point.y);
        prevX = point.x;
        prevY = point.y;
      }
      this.ctx.lineTo(this.screenWidth, this.screenHeight);
      this.ctx.lineTo(firstPoint.x, this.screenHeight);
      this.ctx.fill();
      this.ctx.closePath();
    }
  }
}

class Point {
  constructor(fixedX, fixedY) {
    // fixedX: 이 점이 가질 고정 x
    // fixedY: 이 점이 가질 고정 y
    // maxDistance: 고정 높이로부터 움직일 수 있는 거리의 상한선
    // speed: 거리의 상한선 내에서 거리가 조정되는 속도
    this.fixedX = fixedX;
    this.fixedY = fixedY;
    this.x = fixedX;
    this.y = fixedY;
    this.maxDistance = Math.random() * 100 + 300;
    this.cur = 0;
    this.speed = 0.1;
  }
  animate() {
    this.cur += this.speed;
    this.y = this.fixedY + (Math.sin(this.cur) * this.maxDistance);
  }
}

class Points {
  constructor(startX, endX, centerY, count) {
    this.items = [];
    const distance = Math.abs(endX - startX);
    const pointDistance = distance / count;
    for (let i = 0; i < (count - 1); i += 1) {
      const x = pointDistance * (i + 1);
      const y = centerY;
      const centerIndex = count / 2;
      const direction = (centerIndex <= i) ? -1 : 1;
      this.items.push(new Point(x, y, 500, 1, direction));
    }
    this.items.unshift(new Point(0, centerY));
    this.items.push(new Point(endX, centerY));
    this.length = this.items.length;
  }
}

const app = new App();
