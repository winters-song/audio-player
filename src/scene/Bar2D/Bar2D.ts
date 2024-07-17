import BaseScene from "../Base/BaseScene"



export default class Bar2D extends BaseScene {

  frameTimer = 0

  dataLength = 50

  floats: any = [];
  // 高度
  FLOAT_HEIGHT = 4;
  // 下落高度
  DROP_DISTANCE = 1;
  // Bar 的 border 宽度
  BAR_GAP = 2;


  init() {
    if(!this.el) return
    if(this.inited){
      return;
    }
    this.inited = true
    
    const resizeHandler = () => {
      if (!this.el) {
        return;
      }
      var width = window.innerWidth;
      var height = window.innerHeight;
      this.el.width = width;
      this.el.height = height;
      console.log('do resize')
    };

    window.addEventListener('resize', resizeHandler);

    this.removeResizeEvent = () => {
      window.removeEventListener('resize', resizeHandler);
    }
  }

  stopVisualize() {
    if (this.frameTimer) {
      window.cancelAnimationFrame(this.frameTimer);
      this.frameTimer = 0
      this.resetCanvas();
    }
  }

  resetCanvas() {
    if (this.el) {
      const emptyDataArray = (new Uint8Array(this.dataLength)).map(() => 0);
      this.clearFloats();
      this.clearCanvas();
      this.drawFloats(emptyDataArray);
    }
  }

  drawEachFrame(dataArray: Uint8Array) {
    // 递归调用
    this.frameTimer = requestAnimationFrame(() => {
      this.stats.begin();

      this.drawEachFrame(dataArray)

      this.stats.end();
    });

    if (this.analyser) {
      // 读取数据
      this.analyser.getByteFrequencyData(dataArray);
      // 更新长度
      const bars = dataArray.slice(0, Math.min(this.dataLength, dataArray.length));
      // console.log(bars)
      // 画图
      this.clearCanvas();
      this.drawFloats(bars);
      this.drawBars(bars);
    }
  }

  clearFloats() {
    this.floats = [];
  }

  clearCanvas() {
    if (!this.el) {
      return
    }
    const canvasWidth = this.el.width;
    const canvasHeight = this.el.height;
    const canvasCtx = this.el.getContext("2d");
    if (!canvasCtx) {
      return
    }
    // 绘制图形
    canvasCtx.fillStyle = '#222222';
    canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  drawFloats(dataArray: Uint8Array) {
    if (!this.el) {
      return
    }
    const canvasWidth = this.el.width;
    const canvasHeight = this.el.height;
    const canvasCtx = this.el.getContext("2d");

    if (!canvasCtx) {
      return;
    }

    // 找到最大值，以及初始化高度
    dataArray.forEach((item, index) => {
      // 默认值
      this.floats[index] = this.floats[index] || this.FLOAT_HEIGHT;
      // 处理当前值
      const pushHeight = item + this.FLOAT_HEIGHT;
      const dropHeight = this.floats[index] - this.DROP_DISTANCE;
      // 取最大值
      this.floats[index] = Math.max(dropHeight, pushHeight);
    })

    const barWidth = canvasWidth / dataArray.length - this.BAR_GAP;
    let x = 0;

    this.floats.forEach((floatItem: number) => {
      const floatHeight = floatItem / 128 * canvasHeight / 2;

      canvasCtx.fillStyle = '#bbb';
      canvasCtx.fillRect(x, canvasHeight - floatHeight, barWidth, this.FLOAT_HEIGHT);

      x += barWidth + this.BAR_GAP;
    })
  }

  drawBars(dataArray: Uint8Array) {
    if (!this.el) {
      return
    }
    const canvasWidth = this.el.width;
    const canvasHeight = this.el.height;
    const canvasCtx = this.el.getContext("2d");

    if (!canvasCtx) {
      return;
    }
    const barWidth = canvasWidth / dataArray.length - this.BAR_GAP
    let x = 0;

    dataArray.forEach((dataItem) => {
      const barHeight = dataItem / 128 * canvasHeight / 2;

      // 添加渐变色
      const gradient = canvasCtx.createLinearGradient(canvasWidth / 2, 0, canvasWidth / 2, canvasHeight);
      // gradient.addColorStop(0, '#68b3ec');
      // gradient.addColorStop(0.5, '#4b5fc9');
      // gradient.addColorStop(1, '#68b3ec');
      gradient.addColorStop(0, 'red');
      gradient.addColorStop(0.5, 'yellow');
      gradient.addColorStop(1, 'green');

      // 画 bar
      canvasCtx.fillStyle = gradient;
      canvasCtx.fillRect(x, canvasHeight - barHeight, barWidth, barHeight);

      x += barWidth + this.BAR_GAP;
    })
  }
}