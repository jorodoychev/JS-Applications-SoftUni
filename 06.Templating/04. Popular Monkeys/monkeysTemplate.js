import monkeys from './monkeys.js'

const htmlElements = {
    allMonkeys: () => document.querySelector('div.monkeys')
}

Promise.all([
    getTemplate('template.hbs'),
    getTemplate('monkey.hbs')
])
    .then(([templateSrc, monkeySrc]) => {
        Handlebars.registerPartial('monkey', monkeySrc)
        const template = Handlebars.compile(templateSrc)
        htmlElements.allMonkeys().innerHTML = template({monkeys})
        attachEventListener()
    })
    .catch((e) => console.error(e))

function getTemplate(templateLocation) {
    return fetch(templateLocation).then(r => r.text())
}

function attachEventListener() {
    htmlElements.allMonkeys().addEventListener('click', (e) => {
        const {target} = e

        if (target.nodeName !== 'BUTTON' || target.textContent !== 'Info') {
            return
        }

        const p = target.parentNode.querySelector('p')

        if (p.style.display === 'none' || !p.style.display) {
            p.style.display = 'block'
        } else {
            p.style.display = 'none'
        }
    })
}