import axios from 'axios'
import Noty from 'noty'
import { initAdmin } from './admin'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(service) {
    axios.post('/update-cart', service).then(res => {
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Service added to cart.',
            progressBar: false,
            layout: 'topLeft'
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong',
            progressBar: false,
            layout: 'topLeft'
        }).show();
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let service = JSON.parse(btn.dataset.service)
        updateCart(service)
    })
})

// Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() =>{
        alertMsg.remove()
    }, 2000)
}
initAdmin()