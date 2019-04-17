import express from 'express'
import bodyParser from 'body-parser'
// import querystring from 'querystring'

const app = express()

//db connection
import mongoose from 'mongoose'
import fs from 'fs'
const config = JSON.parse(fs.readFileSync('config.json', 'UTF-8'))
mongoose.connect(config.db_url)
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});

//Schema of data to be stored
let tweetSchema = mongoose.Schema({
    tweet: String,
    author: String,
    reporter: String
})

//I can add a function
// bind schema to the mongodb collection 'cpu'
let Tweet = mongoose.model('reportedTweet', tweetSchema)

let cleanDb = false

if(cleanDb === true){
    Tweet.remove({}, err=>{
        if(err) console.log("failed to remove all docs")
    })
}

/*app.use("/", (req,res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
})*/

app.use("/", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(bodyParser.json({limit: '20mb', type: 'application/json'}));
app.use(bodyParser.json())

//middleware
function tweetParser(req, res, next){
    Tweet.find({reporter: req.params.reporter}, (err, tweets)=>{
        if (err || tweets.length === 0) {
            res.json({result:'tweet not found.'})
        }else{
            req.tweetOne = tweets[0]
            next()
        }
    })
}

// bind middleware to the application
// for GET, DELETE, and POST
app.get('/:tweetDetails', tweetParser)
app.delete('/:tweetDetails', tweetParser)
app.post('/', tweetParser)


// show all tweets
app.get('/', (req, res) => {
    //res.write("here")
    Tweet.find().then(tweets => {
        res.json({
            result:'success',
            message: tweets
        })
    })
})

// route parameters are prefixed with a :
app.get('/getTweet/:reporter', (req, res) => {
    Tweet.find({reporter: req.params.reporter}).then(tweet => {
        res.json({
            result:'success',
            message: tweet
        })
    })
})

/*
For tweet analysis
 */
const language  = require('@google-cloud/language')
const client = new language.LanguageServiceClient();

app.get('/getTweetAnalysis', async (req, res) => {
    //return analysis
    const text = req.body.tweet
    const document = {
        content: text,
        type: 'PLAIN_TEXT'
    }

    // Detects the sentiment of the text
    const [result] = await client.analyzeSentiment({document: document});
    const sentiment = result.documentSentiment;

    console.log(`Text: ${text}`);
    console.log(`Sentiment score: ${sentiment.score}`);
    console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

    res.json({
        result:'success',
        message: sentiment
    })

})


//delete
app.delete('/deleteTweet/', (req, res) => {
    console.log("Delete Tweet with details: ", req.body.tweet)
    // this now has to delete from the database,
    // use CPU.remove()!
    // delete orders[req.params.orderName] ??
    Tweet.remove({tweet:req.body.tweet}, err=>{
        if (err) {
            res.json({result:"error", message:err})
        }else{
            res.json({result:"success"})
        }
    })
})

//post
app.post('/createTweet', (req, res) => {
    console.log("Report Tweet for", req.body.author)
    // insert a new tweet in the database
    console.log('postB' + JSON.stringify(req.body))
    let tweet = Tweet({
        //_id:req.body.name,//trying to make name unique
        author:req.body.author,
        reporter: req.body.reporter,
        tweet: req.body.tweet
    })
    tweet.save()

    res.json({   // echo the cpu back (which now has an cpu number)
        result: 'success',
        tweet: tweet
    })
})


const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))