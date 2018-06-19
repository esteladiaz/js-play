// require express in file
// store it in variable for later use
const express = require('express');

// create new instance of express, initialize
// store in new var
const app = express();

// configure app to use twig as view engine
app.set('views', __dirname + '/src/views');
app.set('view engine', 'twig');

// create navigation dataset
const navigation = [
    {
        text: 'Home',
        type: 'link',
        url: '/'
    }, {
        text: 'Threads',
        type: 'link',
        url: '/threads'
    }, {
        text: 'New Thread',
        type: 'link',
        url: '/new-thread'
    }
]

// write buildContext helper method
function buildContext(ctx) {
    let defaultContext = {
        navigation: navigation
    };
    if (!ctx) {
        return defaultContext;
    }
    // merge defaultContext and ctx into empty obj, then return
    return Object.assign({}, defaultContext, ctx);
}

// add support for mongoDB route
app.get('/api/database', (request, response) => {
    const MongoDB = require('./app/util/MongoDB');
    const db = new MongoDB();

    db.connect()
        .then((db) => {
            response.send('Connected!');
        })
        .catch((err) => {
            response.status(500).send(err.message);
        })
});

// for all routes not currently passing context to response.render()
app.get('/', (request, response) => {
    const context = buildContext();
    response.render('pages/home', context);
})

// adding route for new page
app.get('/new-thread', (request, response) => {
    const context = buildContext();
    response.render('pages/new-thread', context);
});

// adding route for new page
app.get('/threads', (request, response) => {
    const context = buildContext();
    response.render('pages/threads', context);
});

// adding path parameter
app.get('/threads/:id', (request, response) => {
    const id = request.params.id;
    const context = buildContext({ id: id });

    response.render('pages/thread-detail', context);
});

// enable static assets
app.use('/assets', express.static('src'));

// tell our app what port to listen for requests on
app.listen(3000, () => {
    console.log('App is listening on localhost:3000')
});