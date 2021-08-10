function attachEvents() {
    const url = 'https://phonebook-nakov.firebaseio.com/phonebook.json'
    let btnLoad = document.getElementById('btnLoad')
    let btnCreate = document.getElementById('btnCreate')
    let ul = document.getElementById('phonebook')

    btnLoad.addEventListener('click', () => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                Object.keys(data).forEach((key) => {
                    let li = document.createElement('li')
                    li.textContent = `${data[key].person}: ${data[key].phone}`
                    let deleteBtn = document.createElement('button')
                    let deleteUrl = `https://phonebook-nakov.firebaseio.com/phonebook${key}.json`
                    deleteBtn.textContent = 'DELETE'
                    deleteBtn.addEventListener('click', () => {
                        fetch(deleteUrl, {method: 'DELETE'})
                    })
                    li.appendChild(deleteBtn)
                    ul.appendChild(li)
                })

            })
    })


    btnCreate.addEventListener('click', create)

    function create() {
        let person = document.getElementById('person')
        let phone = document.getElementById('phone')
        let obj = {person: person.value, phone: phone.value}

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(obj)
        })

    }

}

attachEvents()