function attachEvents() {
    let loadBtn = document.getElementsByClassName('load')[0]
    let addBtn = document.getElementsByClassName('add')[0]
    let catchesDiv = document.getElementById('catches')


    const baseURL = 'https://fisher-game.firebaseio.com/catches.json'
    const deleteBaseURL = 'https://fisher-game.firebaseio.com/catches/'


    loadBtn.addEventListener('click', () => {

        fetch(baseURL)
            .then(res => res.json())
            .then(data => {
                Object.keys(data).forEach(key => appendCatch(key, data))
            })

    })

    function appendCatch(key, data) {
        let {angler, weight, species, location, bait, captureTime} = data[key]

        let catchDiv = createElement('div', 'catch', '')
        catchDiv.setAttribute('data-id', key)

        let anglerLabel = createElement('label', '', 'Angler')
        let anglerInput = createElement('input', 'angler', angler, 'text')

        let weightLabel = createElement('label', '', 'Weight')
        let weightInput = createElement('input', 'weight', weight, 'number')

        let speciesLabel = createElement('label', '', 'Species')
        let speciesInput = createElement('input', 'species', species, 'text')

        let locationLabel = createElement('label', '', 'Location')
        let locationInput = createElement('input', 'location', location, 'text')

        let baitLabel = createElement('label', '', 'Bait')
        let baitInput = createElement('input', 'bait', bait, 'text')

        let captureTimeLabel = createElement('label', '', 'Capture Time')
        let captureTimeInput = createElement('input', 'captureTime', captureTime, 'number')

        let updateButton = createElement('button', 'update', 'Update')
        let deleteButton = createElement('button', 'delete', 'Delete')

        deleteButton.addEventListener('click', () => {
            let deleteURL = deleteBaseURL + key + '.json'

            fetch(deleteURL, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => console.log(data))

        })

        updateButton.addEventListener('click', () => {

            let obj = JSON.stringify({
                    'angler': anglerInput.value,
                    'weight': weightInput.value,
                    'species': speciesInput.value,
                    'location': locationInput.value,
                    'bait': baitInput.value,
                    'captureTime': captureTimeInput.value

                }
            )
            let updateURL = deleteBaseURL + key + '.json'

            fetch(updateURL, {
                method: 'PUT',
                body: obj
            })

                .then(res => res.json())
                .then(data => console.log(data))

        })

        catchDiv.appendChild(anglerLabel)
        catchDiv.appendChild(anglerInput)
        catchDiv.appendChild(document.createElement('hr'))
        catchDiv.appendChild(weightLabel)
        catchDiv.appendChild(weightInput)
        catchDiv.appendChild(document.createElement('hr'))
        catchDiv.appendChild(speciesLabel)
        catchDiv.appendChild(speciesInput)
        catchDiv.appendChild(document.createElement('hr'))
        catchDiv.appendChild(locationLabel)
        catchDiv.appendChild(locationInput)
        catchDiv.appendChild(document.createElement('hr'))
        catchDiv.appendChild(baitLabel)
        catchDiv.appendChild(baitInput)
        catchDiv.appendChild(document.createElement('hr'))
        catchDiv.appendChild(captureTimeLabel)
        catchDiv.appendChild(captureTimeInput)

        catchDiv.appendChild(updateButton)
        catchDiv.appendChild(deleteButton)
        catchesDiv.appendChild(catchDiv)
    }

    addBtn.addEventListener('click', () => {

        let angler = document.querySelector('aside input.angler')
        let weight = document.querySelector('aside input.weight')
        let species = document.querySelector('aside input.species')
        let location = document.querySelector('aside input.location')
        let bait = document.querySelector('aside input.bait')
        let captureTime = document.querySelector('aside input.captureTime')

        let obj = JSON.stringify({
                'angler': angler.value,
                'weight': weight.value,
                'species': species.value,
                'location': location.value,
                'bait': bait.value,
                'captureTime': captureTime.value

            }
        )

        fetch(baseURL, {
            method: 'POST',
            body: obj
        })
            .then(res => res.json())
            .then(data => console.log(data))

    })

    function createElement(el, classes, content, type) {
        let element = document.createElement(el)
        if (el === 'input') {
            element.type = type
            element.value = content
        } else {
            element.innerHTML = content
        }
        element.className = classes
        return element
    }

}

attachEvents();

