import axios from 'axios'
import Noty from 'noty'
import moment from 'moment'
//import { initAdmin } from './admin'
import initAdmin from './admin'

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


// Change task status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let task = hiddenInput ? hiddenInput.value : null
task = JSON.parse(task)
let time = document.createElement('small')


function updateStatus(task) {
    statuses.forEach( (status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let setpCompleted = true;
    statuses.forEach( (status) => {
        let dataProp = status.dataset.status
        if(setpCompleted) {
            status.classList.add('step-completed')
        }
        if(dataProp === task.status) {
            setpCompleted = false
            time.innerText = moment(task.updatedAt).format('hh:mm A')
            status.appendChild(time)
            if(status.nextElementSibling) {
                status.nextElementSibling.classList.add('current')
            }
            
        }
    })
}

updateStatus(task);

// Socket
let socket = io()

initAdmin(socket)

// Join
if(task) {
    socket.emit('join', `task_${task._id}`)
}

let adminAreaPath = window.location.pathname
console.log(adminAreaPath)
if(adminAreaPath.includes('admin')) {
    socket.emit('join', 'adminRoom')
}

socket.io('taskUpdated', (data) => {
    const updatedTask = { ...task }
    updatedTask.updatedAt = moment().format()
    updatedTask.status = data.status
    updateStatus(updatedTask)
    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Task updated',
        progressBar: false,
        layout: 'topLeft'
    }).show();
})