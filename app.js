const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override'); 
const cors = require("cors");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));

const port = process.env.PORT || 8080;

// Listening to the port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// Get Route for the home page
app.get('/', (req, res) => {
    res.send("Welcome to the homepage");
});

// All post data
let posts = [
    { username: "Deepali_Dev", content: "JavaScript makes web development easier!", id: uuidv4() },
    { username: "CodeArchitect", content: "Learning React and loving it!", id: uuidv4() },
    { username: "TechStrategist", content: "Backend development is quite interesting.", id: uuidv4() },
    { username: "DevOpsWizard", content: "Building a full-stack project!", id: uuidv4() },
    { username: "UIUX_Designer", content: "CSS animations are so cool!", id: uuidv4() },
    { username: "AI_Researcher", content: "Exploring AI and Machine Learning!", id: uuidv4() },
    { username: "PythonPro", content: "Python is my go-to programming language.", id: uuidv4() },
    { username: "CloudEngineer", content: "Cloud computing is the future!", id: uuidv4() },
    { username: "CyberSecurityAnalyst", content: "Cybersecurity is more important than ever.", id: uuidv4() },
    { username: "SoftwareConsultant", content: "Helping businesses with tech solutions!", id: uuidv4() }
];

// Get Route for all posts
app.get('/posts', (req, res) => {
    res.render('AllPosts.ejs', { posts });
});

// Get Route to show the form for a new post
app.get('/posts/new', (req, res) => {
    res.render('newpost.ejs');
});

// POST Route to add a new post
app.post('/posts/new', (req, res) => {
    const { username, content } = req.body;
    if (!username || !content) {
        return res.status(400).send("Username and content are required.");
    }
    posts.push({ username, content, id: uuidv4() }); // ✅ Added id generation
    res.redirect('/posts');
});

// Get Route to show a post by id (edit page)
app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    console.log(id)
    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).send("Post not found"); // ✅ Handle case where post doesn't exist
    }

    res.render('Edit.ejs', { post });
});

// Patch Route to edit a post
app.patch('/posts/:id',(req,res)=>{
    const {id}=req.params;
    const {content}=req.body;
    const post=posts.find(p=>p.id===id);

    post.content=content;
    res.redirect('/posts');
})

//DELETE Route to delete a post
app.delete('/posts/:id',(req,res)=>{
    const {id}=req.params;
    posts=posts.filter(p=>p.id!==id);
    res.redirect('/posts');
})