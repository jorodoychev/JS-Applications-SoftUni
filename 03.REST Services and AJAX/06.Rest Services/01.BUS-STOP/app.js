function getInfo() {
    let stopId = document.getElementById('stopId').value
    let validId = ['1287', '1308', '1327', '2334']
    let stopName = document.getElementById('stopName')
    let url = `https://judgetests.firebaseio.com/businfo/${stopId}.json`
    let busesList = document.getElementById('buses')

    if (!validId.includes(stopId)) {
        stopName.textContent = 'Error'
    } else {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                stopName.textContent = data.name
                Object.keys(data.buses).forEach(key => {
                    let li = document.createElement('li')
                    li.textContent = `Bus ${key} arrives in ${data.buses[key]} minutes`
                    busesList.appendChild(li)

                })
            })
            .catch((error) => {
                console.error('Error:', error)
            })
        stopId.value = ''
    }

}





