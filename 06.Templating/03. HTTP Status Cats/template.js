const elements = {
    root: () => document.getElementById('allCats')
}

Promise.all([
    getTemplate('template.hbs'),
    getTemplate('cat.hbs')
])
    .then(([templateSrc, catSrc]) => {
        Handlebars.registerPartial('cat', catSrc)
        let template = Handlebars.compile(templateSrc)
        elements.root().innerHTML = template({cats})
        attachEventListener()
    })


function getTemplate(templateLocation) {
    return fetch(templateLocation).then(r => r.text())
}

function attachEventListener() {
    elements.root().addEventListener('click', (e) => {
        const {target} = e

        if (target.nodeName === 'BUTTON' && target.className === 'showBtn') {
            let divStatus = target.parentNode.querySelector('div.status')
            if (divStatus.style.display === 'none') {
                divStatus.style.display = 'block'
            } else {
                divStatus.style.display = 'none'
            }
        }
    })

}