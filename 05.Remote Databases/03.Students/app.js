const htmlSelectors = {
    createStudentId: () => document.getElementById('studentId'),
    createFirstName: () => document.getElementById('firstName'),
    createLastName: () => document.getElementById('lastName'),
    createFacultyNumber: () => document.getElementById('facultyNumber'),
    createGrade: () => document.getElementById('grade'),
    createStudent: () => document.querySelector('button'),
    loadStudents: () => document.getElementById('loadStudents'),
    studentsContainer: () => document.querySelector('table > tbody'),
    editForm: () => document.getElementById('edit-form'),
    editStudentId: () => document.getElementById('edit-id'),
    editFirstName: () => document.getElementById('edit-first-name'),
    editLastName: () => document.getElementById('edit-last-name'),
    editFacultyNumber: () => document.getElementById('edit-faculty-number'),
    editGrade: () => document.getElementById('edit-grade'),
    editBtn: () => document.getElementById('edit-btn'),
    deleteForm: () => document.getElementById('delete-form'),
    deleteStudentId: () => document.getElementById('delete-id'),
    deleteFirstName: () => document.getElementById('delete-first-name'),
    deleteLastName: () => document.getElementById('delete-last-name'),
    deleteFacultyNumber: () => document.getElementById('delete-faculty-number'),
    deleteGrade: () => document.getElementById('delete-grade'),
    deleteBtn: () => document.getElementById('delete-btn')
}

htmlSelectors.loadStudents().addEventListener('click', fetchAllStudents)
htmlSelectors.createStudent().addEventListener('click', createStudent)
htmlSelectors.editBtn().addEventListener('click', editStudent)
htmlSelectors.deleteBtn().addEventListener('click', deleteStudent)

function fetchAllStudents() {
    fetch(`https://students-aaa7f-default-rtdb.firebaseio.com/.json`)
        .then(res => res.json())
        .then(renderStudents)
        .catch(handleError)
}

function renderStudents(studentsData) {
    const studentsContainer = htmlSelectors.studentsContainer()

    if (studentsContainer.innerHTML !== '') studentsContainer.innerHTML = ''

    Object.keys(studentsData).forEach(studentId => {
        const {id, firstName, lastName, facultyNumber, grade} = studentsData[studentId]

        const tableRow = createDOMElement('tr', '', {}, {},
            createDOMElement('td', id, {}, {}),
            createDOMElement('td', firstName, {}, {}),
            createDOMElement('td', lastName, {}, {}),
            createDOMElement('td', facultyNumber, {}, {}),
            createDOMElement('td', grade, {}, {}),
            createDOMElement('td', '', {}, {},
                createDOMElement('button', 'Edit', {'data-key': studentId}, {click: loadEditForm}),
                createDOMElement('button', 'Delete', {'data-key': studentId}, {click: loadDeleteForm})))
        studentsContainer.appendChild(tableRow)
    })

}

function createStudent(e) {
    e.preventDefault()

    const studentId = htmlSelectors.createStudentId()
    const firstName = htmlSelectors.createFirstName()
    const lastName = htmlSelectors.createLastName()
    const facultyNumber = htmlSelectors.createFacultyNumber()
    const grade = htmlSelectors.createGrade()

    if (studentId.value !== '' && firstName.value !== '' && lastName.value !== '' && facultyNumber.value !== '' && grade.value !== '') {
        const initObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: studentId.value,
                firstName: firstName.value,
                lastName: lastName.value,
                facultyNumber: facultyNumber.value,
                grade: grade.value
            })
        }
        fetch(`https://students-aaa7f-default-rtdb.firebaseio.com/.json`, initObj)
            .then(fetchAllStudents)
            .catch(handleError)

        studentId.value = ''
        firstName.value = ''
        lastName.value = ''
        facultyNumber.value = ''
        grade.value = ''

    } else {
        const error = {message: ''}

        if (studentId.value === '') error.message += 'Student input must not be empty\n '
        if (firstName.value === '') error.message += 'First name input must not be empty\n '
        if (lastName.value === '') error.message += 'Last name input must not be empty\n'
        if (facultyNumber.value === '') error.message += 'Faculty number input must not be empty\n'
        if (grade.value === '') error.message += 'Grade input must not be empty'

        handleError(error)
    }
}

function editStudent(e) {
    e.preventDefault()

    const studentId = htmlSelectors.editStudentId()
    const firstName = htmlSelectors.editFirstName()
    const lastName = htmlSelectors.editLastName()
    const facultyNumber = htmlSelectors.editFacultyNumber()
    const grade = htmlSelectors.editGrade()
    const baseId = this.getAttribute('data-key')

    if (studentId.value !== '' && firstName.value !== '' && lastName.value !== '' && facultyNumber.value !== '' && grade.value !== '') {
        const initObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: studentId.value,
                firstName: firstName.value,
                lastName: lastName.value,
                facultyNumber: facultyNumber.value,
                grade: grade.value
            })
        }
        fetch(`https://students-aaa7f-default-rtdb.firebaseio.com/${baseId}/.json`, initObj)
            .then(fetchAllStudents)
            .catch(handleError)

        studentId.value = ''
        firstName.value = ''
        lastName.value = ''
        facultyNumber.value = ''
        grade.value = ''

    } else {
        const error = {message: ''}

        if (studentId.value === '') error.message += 'Student input must not be empty\n '
        if (firstName.value === '') error.message += 'First name input must not be empty\n '
        if (lastName.value === '') error.message += 'Last name input must not be empty\n'
        if (facultyNumber.value === '') error.message += 'Faculty number input must not be empty\n'
        if (grade.value === '') error.message += 'Grade input must not be empty'

        handleError(error)
    }

}

function deleteStudent(e) {
    e.preventDefault()

    const baseId = this.getAttribute('data-key')

    const initObj = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }

    htmlSelectors.deleteForm().style.display = 'block'
    fetch(`https://students-aaa7f-default-rtdb.firebaseio.com/${baseId}/.json`, initObj)
        .then(fetchAllStudents)
        .catch(handleError)
}


function loadEditForm() {
    const baseId = this.getAttribute('data-key')

    fetch(`https://students-aaa7f-default-rtdb.firebaseio.com/${baseId}/.json`)
        .then(res => res.json())
        .then(({id, firstName, lastName, facultyNumber, grade}) => {
            htmlSelectors.editStudentId().value = id
            htmlSelectors.editFirstName().value = firstName
            htmlSelectors.editLastName().value = lastName
            htmlSelectors.editFacultyNumber().value = facultyNumber
            htmlSelectors.editGrade().value = grade
            htmlSelectors.editForm().style.display = 'block'
            htmlSelectors.editBtn().setAttribute('data-key', baseId)
        })
        .catch(handleError)

}

function loadDeleteForm() {
    const baseId = this.getAttribute('data-key')

    fetch(`https://students-aaa7f-default-rtdb.firebaseio.com/${baseId}/.json`)
        .then(res => res.json())
        .then(({id, firstName, lastName, facultyNumber, grade}) => {
            htmlSelectors.deleteStudentId().value = id
            htmlSelectors.deleteFirstName().value = firstName
            htmlSelectors.deleteLastName().value = lastName
            htmlSelectors.deleteFacultyNumber().value = facultyNumber
            htmlSelectors.deleteGrade().value = grade
            htmlSelectors.deleteForm().style.display = 'block'
            htmlSelectors.deleteBtn().setAttribute('data-key', baseId)
        })
        .catch(handleError)

}

function createDOMElement(type, text, attributes, events, ...children) {
    const domElement = document.createElement(type)

    if (text !== '') {
        domElement.textContent = text
    }

    Object.entries(attributes).forEach(([attrKey, attrValue]) => {
        domElement.setAttribute(attrKey, attrValue)
    })

    Object.entries(events).forEach(([eventName, eventHandler]) => {
        domElement.addEventListener(eventName, eventHandler)
    })

    domElement.append(...children)

    return domElement
}

function handleError(err) {
    alert(err.message)
}

