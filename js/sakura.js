// ===== 🌸 樱花飘落特效 =====
(function() {
  const canvas = document.createElement('canvas')
  canvas.id = 'sakuraCanvas'
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
  `
  document.body.appendChild(canvas)
  
  const ctx = canvas.getContext('2d')
  let width = window.innerWidth
  let height = window.innerHeight
  canvas.width = width
  canvas.height = height
  
  // 花瓣数组
  let petals = []
  const PETAL_COUNT = 25 // 花瓣数量
  
  // 花瓣类
  class Petal {
    constructor() {
      this.reset()
    }
    reset() {
      this.x = Math.random() * width
      this.y = Math.random() * height - height
      this.size = 8 + Math.random() * 12  // 花瓣大小
      this.speed = 1.5 + Math.random() * 2   // 下落速度
      this.swing = Math.random() * 2        // 摇摆幅度
      this.swingSpeed = 0.01 + Math.random() * 0.02  // 摇摆频率
      this.angle = Math.random() * Math.PI * 2
      this.opacity = 0.6 + Math.random() * 0.6
      this.rotation = Math.random() * Math.PI * 2
      this.rotationSpeed = (Math.random() - 0.5) * 0.02
    }
    update() {
      this.y += this.speed
      this.angle += this.swingSpeed
      this.x += Math.sin(this.angle) * this.swing
      this.rotation += this.rotationSpeed
      
      // 飘到屏幕外就重置
      if (this.y > height + 20) {
        this.reset()
        this.y = -20
      }
      if (this.x < -20) this.x = width + 20
      if (this.x > width + 20) this.x = -20
    }
    draw() {
      ctx.save()
      ctx.translate(this.x, this.y)
      ctx.rotate(this.rotation)
      ctx.globalAlpha = this.opacity
      
      // 画花瓣（五个圆形组成花瓣形状）
      const s = this.size
      ctx.fillStyle = '#ffb7c5'  // 樱花粉
      ctx.shadowColor = 'rgba(255, 183, 197, 0.5)'
      ctx.shadowBlur = 5
      
      ctx.beginPath()
      // 画一个花瓣形状
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2
        const px = Math.cos(angle) * s * 0.4
        const py = Math.sin(angle) * s * 0.4
        if (i === 0) {
          ctx.moveTo(px, py)
        } else {
          ctx.lineTo(px, py)
        }
      }
      ctx.closePath()
      ctx.fill()
      
      // 花蕊小点
      ctx.fillStyle = '#ff8fa3'
      ctx.shadowBlur = 0
      ctx.beginPath()
      ctx.arc(0, 0, s * 0.1, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.restore()
    }
  }
  
  // 初始化花瓣
  for (let i = 0; i < PETAL_COUNT; i++) {
    const petal = new Petal()
    petal.y = Math.random() * height  // 初始随机分布
    petals.push(petal)
  }
  
  // 动画循环
  function animate() {
    ctx.clearRect(0, 0, width, height)
    petals.forEach(petal => {
      petal.update()
      petal.draw()
    })
    requestAnimationFrame(animate)
  }
  
  animate()
  
  // 窗口大小变化时自适应
  window.addEventListener('resize', () => {
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = width
    canvas.height = height
  })
})()