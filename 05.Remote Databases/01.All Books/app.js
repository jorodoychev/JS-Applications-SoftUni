function testCrud() {
    let listBooks = document.getElementById('books')
    let bookAuthor = document.getElementById('author')
    let bookTitle = document.getElementById('title')
    let getBtn = document.getElementById('get')
    let postBtn = document.getElementById('post')

    let baseURL = 'https://testapp-17544-default-rtdb.firebaseio.com/books.json'

    let obj = JSON.stringify({
        'author': bookAuthor.value,
        'title': bookTitle.value
    })

    getBtn.addEventListener('click', () => {

        if (listBooks.childNodes.length === 0) {
            fetch(baseURL)
                .then(res => res.json())
                .then(data => {
                    Object.keys(data).forEach(key => appendData(key, data))
                })
        } else {
            listBooks.innerHTML = ''
            fetch(baseURL)
                .then(res => res.json())
                .then(data => {
                    Object.keys(data).forEach(key => appendData(key, data))
                })
        }

    })

    function appendData(key, data) {
        let books = data[key]
        listBooks.innerHTML += `<li>${books.author} - ${books.title}</li>`


    }

    postBtn.addEventListener('click', () => {
        fetch(baseURL, {
            method: 'POST',
            body: obj
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })


    })

}

testCrud()

