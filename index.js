const express = require("express");
const app = express();
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qzwvv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const todoListCollection = client.db('todoApplication').collection('todoList');

        app.post('/todoList', async (req, res) => {
            const todoList = req.body;
            const result = await todoListCollection.insertOne(todoList);
            res.send(result);
        });
    }
    finally {

    }
}


app.get('/', async (req, res) => {
    res.send("HelloW");
});

app.listen(port, () => {
    console.log(`Listening On ${port}`);
});
