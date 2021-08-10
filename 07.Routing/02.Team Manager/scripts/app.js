const userModel = firebase.auth()
const db = firebase.firestore()


const app = Sammy('#main', function () {

    this.use('Handlebars', 'hbs')  // IMPORTANT!

    // GET
    this.get('#/home', function (context) {

        const userInfo = localStorage.getItem('userInfo')

        if (userInfo) {
            const {uid, email} = JSON.parse(userInfo)
            context.loggedIn = true
            context.email = email
            context.uid = uid
        }

        db.collection('teams')
            .get()
            .then((response) => {
                response.forEach((team) => {
                    let {creator} = team.data()
                    if (creator.uid === context.uid) {
                        context.hasTeam = true
                        context.teamId = team.id
                    }

                })
                this.loadPartials({
                    'header': './templates/common/header.hbs',
                    'footer': './templates/common/footer.hbs'
                }).then(function () {
                    this.partial('./templates/home/home.hbs')
                })
            })
    })

    this.get('#/about', function (context) {
        const userInfo = localStorage.getItem('userInfo')

        if (userInfo) {
            const {email} = JSON.parse(userInfo)
            context.loggedIn = true
            context.email = email
        }

        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/about/about.hbs')
        })
    })

    this.get('#/catalog', function (context) {
        context.teams = []

        const userInfo = localStorage.getItem('userInfo')

        if (userInfo) {
            const {email} = JSON.parse(userInfo)
            context.loggedIn = true
            context.email = email
        }

        db.collection('teams')
            .get()
            .then((response) => {
                response.forEach((doc) => {

                    let {teamName, description} = doc.data()
                    let team = {
                        teamId: doc.id,
                        name: teamName,
                        comment: description
                    }
                    context.teams.push(team)
                })

                this.loadPartials({
                    'header': './templates/common/header.hbs',
                    'footer': './templates/common/footer.hbs',
                    'teamControls': './templates/catalog/teamControls.hbs',
                    'teamMember': './templates/catalog/teamMember.hbs',
                    'team': './templates/catalog/team.hbs'
                }).then(function () {
                    this.partial('./templates/catalog/teamCatalog.hbs')
                })
            })
    })

    this.get('#/catalog/:teamId', function (context) {
        context.members = []

        const userInfo = localStorage.getItem('userInfo')

        if (userInfo) {
            const {uid, email} = JSON.parse(userInfo)
            context.loggedIn = true
            context.email = email
            context.uid = uid
        }

        db.collection('teams')
            .get()
            .then((response) => {
                response.forEach((doc) => {

                    //todo not ForEach only one team iD

                    const {creator, teamName, description, membersEmail} = doc.data()

                    if (creator.uid === context.uid) {
                        context.isAuthor = true
                        context.isOnTeam = true

                        const team = {
                            teamId: doc.id,
                            name: teamName,
                            comment: description
                        }

                        context.name = team.name
                        context.comment = team.comment
                        context.teamId = doc.id

                        console.log(context.uid)

                    }



                    const memberInfo = {
                        email: membersEmail
                    }


                    context.members.push(memberInfo)

                })

                this.loadPartials({
                    'header': './templates/common/header.hbs',
                    'footer': './templates/common/footer.hbs',
                    'teamControls': './templates/catalog/teamControls.hbs',
                    'teamMember': './templates/catalog/teamMember.hbs'
                }).then(function () {
                    this.partial('./templates/catalog/details.hbs')
                })
            })
    })

    this.get('#/join/:teamId', function (context) {

    })

    this.get('#/create', function (context) {
        const userInfo = localStorage.getItem('userInfo')

        if (userInfo) {
            const {email} = JSON.parse(userInfo)
            context.loggedIn = true
            context.email = email
        }

        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
            'createForm': './templates/create/createForm.hbs'
        }).then(function () {
            this.partial('./templates/create/createPage.hbs')
        })

    })

    this.get('#/login', function () {
        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
            'loginForm': './templates/login/loginForm.hbs'
        }).then(function () {
            this.partial('./templates/login/loginPage.hbs')
        })
    })

    this.get('#/register', function () {

        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
            'registerForm': './templates/register/registerForm.hbs'
        }).then(function () {
            this.partial('./templates/register/registerPage.hbs')
        })
    })

    this.get('#/logout', function (context) {
        userModel.signOut()
            .then(() => {
                localStorage.removeItem('userInfo')
                context.redirect('#/home')
            })
            .catch((e) => console.log(e))
    })


    //POST
    this.post('#/register', function (context) {
        const {email, password, repeatPassword} = context.params

        if (password !== repeatPassword) {
            let err = document.querySelector('#errorBox')
            err.textContent = 'Passwords should match each other'
            err.style.display = 'block'
            return
        }

        userModel.createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.redirect('#/login')
            })
            .catch((e) => console.log(e))
    })

    this.post('#/login', function (context) {

        const {email, password} = context.params

        userModel.signInWithEmailAndPassword(email, password)
            .then(({user: {uid, email}}) => {
                localStorage.setItem('userInfo', JSON.stringify({uid, email}))
                context.redirect('#/home')
                document.querySelector('#errorBox').style.display = 'none'
            })
            .catch((e) => {
                let err = document.querySelector('#errorBox')
                err.textContent = e.message
                err.style.display = 'block'
            })
    })

    this.post('#/create', function (context) {

        const {name, description} = context.params

        if (name && description) {
            db.collection('teams').add({
                teamName: name,
                description,
                creator: getUserData(),
            })
                .then(() => {
                    context.redirect('#/home')
                })
                .catch((error) => {
                    console.error('Error adding document: ', error)
                })
        }
    })

    this.post('#/join:teamId', function (context) {

    })

})

app.run('#/home')

function getUserData() {
    const user = localStorage.getItem('userInfo');
    return user ? JSON.parse(user) : null;
}




