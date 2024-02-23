import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form")
form.addEventListener("submit", event => {
    event.preventDefault()
    let promise = new Promise((resolve, reject, delay = form.delay.value, stateFulfilled = form.state[0].checked) => {
        form.delay.value = '';
        form.state[0].checked = false;
        form.state[1].checked = false;
        setTimeout(() => {
            if(stateFulfilled){
                resolve(delay);
            }else{
                reject(delay)
            }
        }, delay);
      });

      promise
      .then(value => { 
        iziToast.show({
            message: `✅ Fulfilled promise in ${value}ms`,
            position: 'topRight',
            color: 'green'
        });
      })
      .catch(error => {
        iziToast.show({
            message: `❌ Rejected promise in ${error}ms`,
            position: 'topRight',
            color: 'red'
        });
      });
})