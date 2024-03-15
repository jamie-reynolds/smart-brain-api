import express from 'express';

const app = express();

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date() 
        }
    ]
};

// middleware that will parse request bodies
app.use(express.json())

app.get('/', (req, res) => {
    res.json(database.users);
})

app.post('/signin', (req, res) => {
    // the request body is going to be with json, because it's not a html form
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        res.json('success')
    } else {
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {
    const { email, password, name } = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length -1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach((user) => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(404).json('not found');
    }
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    console.log('id is', id);
    let found = false;
    database.users.forEach((user) => {
        console.log('userid', user.id)
        if (user.id === id) {
            console.log('found');
            found = true;
            user.entries ++;
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(404).json('not found');
    }
})

app.listen(3000, () => {
    console.log('app is running on port 3000');
});

/*
API plan:

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user

*/

