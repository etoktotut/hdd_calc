'use strict';

export class calc {

    constructor(rates) {
        this.bitrates=rates;
        this.ulEntries=document.querySelector('ul');
        this.addButton=document.querySelector('.add-button');
        this.resetButton=document.querySelector('.reset-button');
        this.totalVolume = document.getElementById('total-volume');
        this.days=document.getElementById('days');
    }

    calculate_short(mpVal,codVal,hourVal,daysVal,camVal,fpsVal) {
        return (((this.bitrates[mpVal][codVal] * 3600 * hourVal) / 10 / 1024 / 1024 / 1024) *
            daysVal * camVal) * (fpsVal / 25);       
    }

    calcAll(){
        const allLiEntries=this.ulEntries.querySelectorAll('li');
        let calc_volume=0;
            allLiEntries.forEach( li=>{
             const mpVal=li.querySelector('#mp').value;
            const camVal = li.querySelector('#cam-count').value;
            const codVal = li.querySelector('#codec').value;
            const fpsVal = li.querySelector('#fps').value;
            const hourVal= li.querySelector('#hours').value;
            const daysVal = this.days.value;
            calc_volume+=this.calculate_short(mpVal,codVal,hourVal,daysVal,camVal,fpsVal);
        });
        this.totalVolume.textContent=(Math.ceil(calc_volume*100))/100 +' Tb';
    }

    initListeners() {
        const allLiEntries=this.ulEntries.querySelectorAll('li');
        allLiEntries.forEach(li=>this.addLiListener(li));
        this.days.addEventListener('change', this.calcAll.bind(this));
        this.resetButton.addEventListener('click',this.reset.bind(this));

    }

    addEntry(){
        const newEntry=document.createElement('li');
        newEntry.className='entry_row';
        newEntry.innerHTML=`
        <div class="form-group row"> 
            <div class="cam">
            <label for="cam-count">Камер</label>
            <input name="cam-count" id="cam-count" type="number" min=1 class="cam-count  inp-end sense" style="width: 50px" value=1>
        <label for="mp">Разрешение</label>
            <select name="mp" id="mp" class="sense">
                <option value="2" selected>2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="12">12</option>
            </select>
            <span class="inp-end">Мп</span>
                   <label for="fps">Частота кадров</label>
                <input name="fps" id="fps" type="number" min=1 max=50 step=1 class="fps sense" style="width: 50px" value=25>
                <span class="inp-end">fps</span>
                <label for="codec">Кодек</label>
                <select name="codec" class="inp-end sense" id="codec" >
                    <option value="H.264">H.264</option>
                    <option value="H.264+">H.264+</option>
                    <option value="H.265" selected>H.265</option>
                    <option value="H.265+">H.265+</option>
                </select>

                <label for="hours">Часов в день </label>
                <input name="hours" id="hours" type="number" min=4 max=24 step=4 class="hours sense" style="width: 50px" value=24>
                <span class="inp-end"> ч.</span>
                <button class="btn btn-outline-danger shadow"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 2 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg></button>
              </div>
             </div>      
         `;
   
        this.addLiListener(newEntry);
        newEntry.querySelector('button').addEventListener('click', e=>this.removeEntry(e));
        this.ulEntries.insertAdjacentElement('beforeend', newEntry );
        this.calcAll();
        this.addButtonToggle();
    }

    removeEntry(e){
        e.target.closest('li').remove();
            this.calcAll();
            this.addButtonToggle();
    }

    addButtonToggle(){
        const allLiEntries=this.ulEntries.querySelectorAll('li');
        if(allLiEntries.length >= 5){
            this.addButton.classList.remove('active');
        } else {
            this.addButton.classList.add('active');
        }
    }
   
    addLiListener(li){
        const allLiInputs=li.querySelectorAll('.sense');
        allLiInputs.forEach(inp=>inp.addEventListener('change',this.calcAll.bind(this)));
    }

    reset(){
// удаление всех вариантов кроме первого
        const allLiEntries=this.ulEntries.querySelectorAll('li');
        for(let i=allLiEntries.length-1; i>0; i--){
            allLiEntries[i].remove();
        }
//сброс значений в первой строке и к-во дней 
        allLiEntries[0].querySelector('#mp').value=2;
        allLiEntries[0].querySelector('#cam-count').value=1;
        allLiEntries[0].querySelector('#codec').value="H.265";
        allLiEntries[0].querySelector('#fps').value=25;
        allLiEntries[0].querySelector('#hours').value=24;
        this.days.value=7;

        this.calcAll();
        this.addButtonToggle();
    }

    addEntryListener(){
       this.addButton.addEventListener('click',this.addEntry.bind(this));
    }

}

export default calc;

{/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-dash-circle" viewBox="0 2 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
</svg> */}