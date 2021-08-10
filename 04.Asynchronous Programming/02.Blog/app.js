function attachEvents() {
    const baseUrl = 'https://blog-apps-c12bf.firebaseio.com/'
    let btnLoad = document.getElementById('btnLoadPosts')
    let btnView = document.getElementById('btnViewPost')
    let select = document.getElementById('posts')
    let title = document.getElementById('post-title')
    let body = document.getElementById('post-body')
    let comments = document.getElementById('post-comments')
    let postId = ''

    select.addEventListener('change', (ev => {
        postId = ev.currentTarget.value
    }))


    btnLoad.addEventListener('click', loadPosts)

    function loadPosts() {
        fetch(`${baseUrl}posts/.json`)
            .then(res => res.json())
            .then(data => {
                select.innerHTML = Object.keys(data).map(key =>
                    `<option value="${key}">${data[key].title}</option>`).join('')
            })

    }


    btnView.addEventListener('click', viewPosts)

    function viewPosts() {
        let id = ''
        fetch(`${baseUrl}posts/${postId}.json`)
            .then(res => res.json())
            .then(data => {
                title.textContent = data.title
                body.textContent = data.body
                id = data.id
            })
        fetch(`${baseUrl}comments/.json`)
            .then(res => res.json())
            .then(data => {
                Object.keys(data).map(key => {
                    if (data[key].postId === id) {
                        comments.innerHTML += `<li>${data[key].text}</li>`
                    }
                })
            })
        comments.innerHTML = ''
    }
}

attachEvents()