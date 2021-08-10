function loadCommits() {
    // Try it with Fetch API
    let username = document.getElementById('username').value
    let repository = document.getElementById('repo').value
    let ul = document.getElementById('commits')
    let url = `https://api.github.com/repos/${username}/${repository}/commits`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            data.map(x =>
                ul.innerHTML += `<li>${x.commit.author.name}: ${x.commit.message}</li>`)
        })
        .catch(error => {
            ul.innerHTML = `<li>Error: ${error.status} (${error.statusText})</li>`
        })

}