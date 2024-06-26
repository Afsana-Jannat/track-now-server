const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('service is running')
})


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nbzul73.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    const serviceCollection = client.db("serviceDb").collection("services")

    // get all service
    app.get("/services", async (req, res) => {
        try {
            const services = await serviceCollection.find().toArray();

            res.send({
                acknoledgement: true,
                data: services,
            })
        } catch (error) {
            res.status(500).send({
                message: "There is a server side error"
            })
        }
    })
}

run().catch(console.dir);




app.listen(port, () => {
    console.log(`Track now server is running on port ${port}`)
})