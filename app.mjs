import express from 'express'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { MongoClient , ServerApiVersion} from 'mongodb';

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uri = process.env.MONGO_URI;
const myVar = 'injeceted from server';


app.use(express.json()); 

// middlewares aka endpoints aka 'get to slash' {http verb} to slash {your name your endpoint}
app.get('/', (req, res) => {
  //res.send('Hello World');// string 
  //res.sendFile('index.html'); // doesn't work without import
  res.sendFile(join(__dirname, 'public', 'index.html'))
})

app.get('/api/json', (req, res) =>{
  const myVar = 'Hello from server!';
  res.json({ myVar });
})

app.get('/api/body', (req, res) => {
  console.log("client request with body", req.body);
  console.log("client request with body:", req.body.name); 
  res.json({"name": req.body.name});
});



--
 
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
serverApi: {
version: ServerApiVersion.v1,
strict: true,
deprecationErrors: true,
}
});
 
async function run() {
try {
// Connect the client to the server	(optional starting in v4.7)
await client.connect();
// Send a ping to confirm a successful connection
await client.db("admin").command({ ping: 1 });
console.log("Pinged your deployment. You successfully connected to MongoDB!");
} finally {
// Ensures that the client will close when you finish/error
await client.close();
}
}
run().catch(console.dir);



// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})