const elements = {
    input: () => document.getElementById('towns'),
    button: () => document.getElementById('btnLoadTowns'),
    root: () => document.getElementById('root')
}

elements.button().addEventListener('click', getInputInformation)

function getInputInformation(e) {
    e.preventDefault()

    const { value } = elements.input()
    const towns = value.split(', ').map((t) => {
        return {name: t}
    })

    appendTowns(towns)
}

function appendTowns(towns) {
    getTemplate()
        .then((res) => {
            const template = Handlebars.compile(res)
            elements.root().innerHTML = template({towns})
        })
}

function getTemplate() {
    return fetch('template.hbs').then(res => res.text())
}





