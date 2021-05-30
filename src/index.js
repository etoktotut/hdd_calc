import calc from './modules/calc';
import bitrates from './modules/bitrates';
import './css/style.css';

const calcFirst=new calc(bitrates);
calcFirst.initListeners();
calcFirst.addEntryListener();
calcFirst.calcAll();