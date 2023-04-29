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


 
app.get('/todos/:id', async (req, res) => {
    const id = req.params.id;
    const todo = await db.queryById(id);
    res.send(todo);

  });


app.post('/todos', async (req, res) => {
    const todo = req.body;
    const result = await db.insert(todo);
    res.send(result);
  });


app.put('/todos/:id', async (req, res) => {
    const id = req.params.id;
    const todo = req.body;
    const result = await db.update(id, todo);
    res.send(result);
  });

  
  app.delete('/todos/:id', async (req, res) => {
    const id = req.params.id;
    const result = await db.delete(id);
    res.send(result);
  });


initDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        })
    })
