function attachEvents() {
    const url = 'https://rest-messanger.firebaseio.com/messanger.json'
    let send = document.getElementById('submit')
    let receive = document.getElementById('refresh')
    let result = ''

    receive.addEventListener('click', () => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                result = Object.values(data).reduce((messages, message) =>
                    (messages += `${message.author}: ${message.content}\n`), ''
                )
                document.getElementById('messages').textContent = result
            })


    })

    send.addEventListener('click', createMessage)

    function createMessage() {
        let name = document.getElementById('author').value
        let message = document.getElementById('content').value
        fetch(url, {
            headers: {},
            method: 'POST',
            body: JSON.stringify({author: name, content: message})
        })
        document.getElementById('author').value = ''
        document.getElementById('content').value = ''

    }


}

attachEvents();