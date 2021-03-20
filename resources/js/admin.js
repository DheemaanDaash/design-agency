import axios from 'axios'
import moment from 'moment'
import Noty from 'noty'

function initAdmin(socket) {
    const taskTableBody = document.querySelector('#taskTableBody')
    let tasks = []
    let markup 

    axios.get('/admin/tasks', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res => {
        tasks = res.data
        markup = generateMarkup(tasks)
        taskTableBody.innerHTML = markup
    }).catch(err => {
        console.log(err)
    })

    function renderItems(items) {
        let parsedItems =Object.values(items)
        return parsedItems.map((menuItem) => {
            return `
                <p>${ menuItem.item.name } - ${ menuItem.qty } ver</p>
            `
        }).join('')
    }

    function generateMarkup(tasks) {
        return tasks.map(task => {
            return `
                <tr>
                <td class="border px-4 py-2 text-green-900">
                    <p>${ task._id }</p>
                    <div>${ renderItems(task.items) }</div>
                </td>
                <td class="border px-4 py-2">${ task.customerId.name }</td>
                <td class="border px-4 py-2">${ task.address }</td>
                <td class="border px-4 py-2">
                    <div class="inline-block relative w-64">
                        <form action="/admin/task/status" method="POST">
                            <input type="hidden" name="taskId" value="${ task._id }">
                            <select name="status" onchange="this.form.submit()"
                                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                <option value="task_placed"
                                    ${ task.status === 'task_placed' ? 'selected' : '' }>
                                    Placed</option>
                                <option value="confirmed" ${ task.status === 'confirmed' ? 'selected' : '' }>
                                    Confirmed</option>
                                <option value="prepared" ${ task.status === 'prepared' ? 'selected' : '' }>
                                    Prepared</option>
                                <option value="delivered" ${ task.status === 'delivered' ? 'selected' : '' }>
                                    Delivered
                                </option>
                                <option value="completed" ${ task.status === 'completed' ? 'selected' : '' }>
                                    Completed
                                </option>
                            </select>
                        </form>
                        <div
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20">
                                <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </td>
                <td class="border px-4 py-2">
                    ${ moment(task.createdAt).format('hh:mm A') }
                </td>
                <td class="border px-4 py-2">
                    ${ task.paymentStatus ? 'paid' : 'Not paid' }
                </td>
            </tr>
        `
        }).join('')
    }
    // Socket

    socket.on('taskPlaced', (task) => {
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'New task',
            progressBar: false,
            layout: 'topLeft'
        }).show();
        tasks.unshift(task)
        taskTableBody.innerHTML = ''
        taskTableBody.innerHTML = generateMarkup(tasks)
    })
}

export default initAdmin