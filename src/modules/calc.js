'use strict';


export class calc {

    constructor(rates) {
        this.bitrates=rates;
        this.camCount = document.getElementById('cam-count');
        this.mp = document.getElementById('mp');
        this.codec = document.getElementById('codec')
        this.days = document.getElementById('days')
        this.fps = document.getElementById('fps')
        this.hours= document.getElementById('hours')
        this.totalVolume = document.getElementById('total-volume')
        this
    }

    calculate() {
        const volume = Math.ceil((((this.bitrates[this.mp.value][this.codec.value] * 3600 * this.hours.value) / 10 / 1024 / 1024 / 1024) *
            this.days.value * this.camCount.value) * (this.fps.value / 25) * 100) / 100 + ' Tb';
            // + ` (битрейт c камеры ${Math.ceil(this.bitrates[this.mp.value][this.codec.value]*(this.fps.value/25)*100)/100}Kbps )`;
        this.totalVolume.textContent = volume;
    }

    initListeners() {
        this.camCount.addEventListener('input', this.calculate.bind(this));
        this.mp.addEventListener('input', this.calculate.bind(this));
        this.codec.addEventListener('input', this.calculate.bind(this));
        this.days.addEventListener('input', this.calculate.bind(this));
        this.fps.addEventListener('input', this.calculate.bind(this));
        this.hours.addEventListener('input', this.calculate.bind(this));

        this.calculate();
    }
}

export default calc;