import '../styles/popup.scss';
import {getStorageData, setStorageData} from './storage'


const getColor = document.getElementById('color-picker') as HTMLInputElement

document.getElementById('save-color-button').addEventListener('click', () => {
  setStorageData({highlightColor: getColor.value});
});

const loadColor = async () => {
  const { highlightColor } : any = await getStorageData();  
  getColor.value = highlightColor;
}

loadColor();