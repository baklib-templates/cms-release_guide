import { Controller } from "@hotwired/stimulus"

function string2month(string, options = {}) {
  if (!string || typeof string !== 'string') {
    return null;
  }

  try {
    const date = new Date(string.trim());

    if (isNaN(date.getTime())) {
      return null;
    }

    const {
      locale = navigator.language || 'en-US',
      format = 'long' // 'long', 'short', 'narrow'
    } = options;

    const currentYear = new Date().getFullYear();
    const dateYear = date.getFullYear();

    // 如果是今年，只显示月份
    if (dateYear === currentYear) {
      const formatter = new Intl.DateTimeFormat(locale, {
        month: format
      });
      return formatter.format(date);
    } else {
      // 如果不是今年，显示 YYYY-MM 格式
      const year = dateYear;
      const month = String(date.getMonth() + 1).padStart(2, '0');
      return `${year}-${month}`;
    }
  } catch (error) {
    return null;
  }
}

export default class extends Controller {
  static targets = ["time"]
  static classes = ["shown", "hidden"]

  timeTargetConnected(element) {
    console.log('target connected')
    this.#update();
  }

  #showTime(element){
    element.classList.remove(...this.hiddenClasses)
    element.classList.add(...this.shownClasses)
  }

  #hideTime(element){
    element.classList.add(...this.hiddenClasses)
    element.classList.remove(...this.shownClasses)
  }

  #update(){
    let lastMonth = ""
    this.timeTargets.forEach(element => {
      const month = string2month(element.getAttribute(`data-${this.identifier}-value`))
      if(month != lastMonth){
        element.innerText = month
        lastMonth = month
        this.#showTime(element)
      }else{
        this.#hideTime(element)
      }
    })
  }

}
