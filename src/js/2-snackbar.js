import iziToast from "izitoast";

const form = document.querySelector(".form");

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const delay = Number(formData.get('delay'));
    const state = formData.get('state');

    createPromise(delay, state)
    .then((message) => {
        iziToast.success({
            title: '✅ Success',
            message,
            position: 'topRight',
            timeout:'4000',
        });
    })
    .catch((message) => {
        iziToast.error({
          title:  '❌ Error',
          message,
          position: 'topRight',
          timeout:4000,
        });   
    });
});



function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve (`✅ Fulfilled promise in ${delay}ms`);
            } else if (state === 'rejected') {
                reject (`❌ Rejected promise in ${delay}ms`);
            }
        }, delay);
    });
};