function loadRepos() {
    let user = document.getElementById('username').value
    let url = 'https://api.github.com/users/' + user + '/repos'
    let result = document.getElementById('repos')


    fetch(url)
        .then(response => response.json())
        .then(data => data.map(x =>
            result.innerHTML +=
                `<li><a href="${x.url}" target="_blank">${x.full_name}</a></li>`
        ).join('\n'))

        .catch((error) => {
            console.error('Error:', error)
        })
}