import express from 'express';
import DB from './db.js'

const PORT = process.env.PORT || 3000;

/** Zentrales Objekt für unsere Express-Applikation */
const app = express();
app.use(express.json());


/** global instance of our database */
let db = new DB();

/** Initialize database connection */
async function initDB() {
    await db.connect();
    console.log("Connected to database");
}

// implement API routes

/** Return all todos. 
 *  Be aware that the db methods return promises, so we need to use either `await` or `then` here! 
 */
app.get('/', (request, response) => response.redirect('/todos'));

app.get('/todos', async (req, res) => {
    let todos = await db.queryAll();
    res.send(todos);
});

//


 
app.get('/todos/:id', (req, res) => {  
    const id = parseInt(req.params['id'])  
    for (let i=0; i<TODOS.length; i++) { 
        if (TODOS[i].id === id){
            res.send(TODOS[i])
            break;         
        }
        }       
    res.send(id + " ist nicht vorhanden")    
})


app.post('/todos', (req, res) => {
    const input = req.body;
    if (!input.id) {
        res.status(400).send('Todo muss eine ID haben');
        return;
    }
    for (let i=0; i<TODOS.length; i++) { 
        if (TODOS[i].id === input.id){
            res.status(409).send("Anlegen nicht möglich. ID schon vorhanden");
            return;
        }
    }
    TODOS.push(input);
    res.send(TODOS);
});

app.put("/todos/:id", (req, res) => {
    const id = parseInt(req.params['id'])
    const input = req.body;
    for (let i=0; i<TODOS.length; i++) { 
        if (TODOS[i].id === id){
            TODOS[i].title = input.title;
            TODOS[i].due = input.due;
            TODOS[i].status = input.status;
            res.send(id + " wurde erfolgreich geändert") 
        }
        }       
    res.send(id + " ist nicht vorhanden") 
});

app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params['id'])      
    for (let i=0; i<TODOS.length; i++) { 
        if (TODOS[i].id === id){
            TODOS.splice(i, 1);
            res.send(id + " wurde erfolgreich gelöscht")        
        }
        }       
    res.send(id + " ist nicht vorhanden") 
})


initDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        })
    })

 app.listen(1337, () => {
        console.log('Server is listening to https://dobo91-automatic-chainsaw-q44gw6rgw96c67-1337.preview.app.github.dev/');
    }); 
    
app.listen(1234, () => {
        console.log('Server is listening to https://dobo91-automatic-chainsaw-q44gw6rgw96c67-1337.preview.app.github.dev/');
    }); 