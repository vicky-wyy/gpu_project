/**
 * 图片预加载
 * @param arr
 * @constructor
 */
 export function preloadingImages(arr) {
  arr.forEach(item=>{
    const img = new Image()
    img.src = item
  })
}
/**
 * 节流函数
 * @param {*} func 
 * @param {*} interval 
 */
 export function throttle(func, interval = 100) {
  let timeout;
  let startTime = new Date();
  return function (event) {
      event.persist && event.persist()   //保留对事件的引用
      clearTimeout(timeout);
      let curTime = new Date();
      if (curTime - startTime <= interval) {
          //小于规定时间间隔时，用setTimeout在指定时间后再执行
          timeout = setTimeout(() => {
              func(event);
          }, interval)
      } else {
          //重新计时并执行函数
          startTime = curTime;
          func(event)
      }
  }
}