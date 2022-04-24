const SET_TIMEOUT_INTERVAL_MS = 10;


const actionBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');
const time = document.querySelector('.time');

class Stopwatch {
    constructor() {
        this.init();
        this.timeoutId = 0;
        
        actionBtn.addEventListener('click', () => {

            let currentClass = actionBtn.className; 
            let newClass = (currentClass == 'start' ? 'stop' : 'start');

            this._toggleClass(actionBtn, currentClass, newClass);
            this._changeText(actionBtn, newClass);
            this[currentClass]();

        });
        resetBtn.addEventListener('click', this.init.bind(this));
    }

    init() {
        this._clearTimeout();

        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;

        this._toggleClass(actionBtn, 'stop', 'start');

        this._changeText(actionBtn, 'start');
        this._changeText(time, this._getTime());
    }

    start() {
        this._clearTimeout();
        let startTime = Date.now();

        this.timeoutId = setTimeout(() => {
            let timeEllapsed = Date.now() - startTime;
            this._calcTime(timeEllapsed);
            this._changeText(time, this._getTime());
            this.start();
        }, SET_TIMEOUT_INTERVAL_MS);
        
    }

    stop() {
        this._clearTimeout();
    }

    _calcTime(ms) {
        this.milliseconds += ms;
        if(this.milliseconds >= 1000) {
            this.seconds++;
            this.milliseconds = 0
        }
        if(this.seconds == 60) {
            this.minutes++;
            this.seconds = 0;
        }
        if(this.minutes == 60) {
            this.hours++;
            this.minutes = 0;
        }
    }

    _getTime() {
        return `${String(this.hours).padStart(2, '0')}:`+
               `${String(this.minutes).padStart(2, '0')}:`+
               `${String(this.seconds).padStart(2, '0')}.`+
               `${String(this.milliseconds).padStart(3, '0')}`;
    }

    _toggleClass(element, currentClass, newClass) {
        element.classList.remove(currentClass);
        element.classList.add(newClass);
    }

    _clearTimeout() {
        clearTimeout(this.timeoutId);
    }

    _changeText(element, text) {
        element.innerHTML = text;
    }
}

const stopwatch = new Stopwatch();
export default stopwatch;