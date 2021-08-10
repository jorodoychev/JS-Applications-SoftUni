function solve() {
    let baseUrl = `https://judgetests.firebaseio.com/schedule/`
    let stopId = 'depot'
    let info = document.getElementById('info')
    const arriveDis = document.getElementById('arrive')
    const departDis = document.getElementById('depart')
    let stopName

    function changeButton() {
        if (departDis.disabled) {
            departDis.disabled = false
            arriveDis.disabled = true
        } else {
            departDis.disabled = true
            arriveDis.disabled = false
        }
    }

    function depart() {
        const url = `${baseUrl}${stopId}.json`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                info.textContent = `Next stop ${data.name}`
                stopId = data.next
                stopName = data.name
            })
            .catch(() => {
                info.textContent = 'Error'
                arriveDis.disabled = true
                departDis.disabled = true
            })
        changeButton()

    }

    function arrive() {
        info.textContent = `Arriving at ${stopName}`
        changeButton()
    }

    return {
        depart,
        arrive
    };
}

let result = solve();