/* global document localStorage prompt */
import Converter from './converter';

function requestSize (callback) {
  if (!localStorage.getItem('deviceSize')) {
    let deviceSize = prompt('Please enter the device size in "(inch): ');

    if (deviceSize) {
      localStorage.setItem('deviceSize', deviceSize);
      callback(new Converter(deviceSize));
    } else {
      const input = document.createElement('div');
      input.id = 'swip-device-size-modal';

      input.style.marginTop = '0.5em';
      input.style.marginBottom = '0.5em';
      input.style.width = '100%';
      input.style.textAlign = 'center';
      input.style.fontFamily = 'Arial';

      input.innerHTML = `
             <label for="swip-device-size">Please input the device size in "(inch):</label>
            <input type="text" id="swip-device-size">
            <button id="swip-confirm-size">Confirm</button>
            `;
      document.body.insertBefore(input, document.body.firstChild);

      document.getElementById('swip-confirm-size').addEventListener('click', () => {
        deviceSize = document.getElementById('swip-device-size').value;
        document.body.removeChild(input);
        localStorage.setItem('deviceSize', deviceSize);

        callback(new Converter(deviceSize));
      });
    }
  } else {
    callback(new Converter(localStorage.getItem('deviceSize')));
  }
}

export default {
  requestSize,
};
