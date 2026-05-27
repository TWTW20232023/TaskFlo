// Import express
const express = require('express');
const app = express();

// Set EJS engine
app.set('view engine','ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));

// Task List
let taskList = [
  {
    title: "Build Website",
    description: "Create a portfolio site",
    steps: [
      { title: "Design layout", note: "Sketch homepage wireframe", progress: 20 },
      { title: "Write HTML/CSS", note: "Basic structure and styling", progress: 50 },
      { title: "Deploy", note: "Push to GitHub Pages", progress: 0 }
    ]
  },
  {
    title: "Study Networking",
    description: "Prepare for Cisco exam",
    steps: [
      { title: "Review IPv6", note: "Practice addressing schemes", progress: 40 },
      { title: "Lab practice", note: "Configure routers in Packet Tracer", progress: 60 }
    ]
  },
  {
    title: "Roblox Game Project",
    description: "Prototype tower defense game",
    steps: [
      { title: "Map design", note: "Create basic terrain", progress: 30 },
      { title: "Enemy AI", note: "Script pathfinding logic", progress: 10 },
      { title: "Testing", note: "Playtest with friends", progress: 0 }
    ]
  }
];


// Homepage
app.get('/',(req,res)=>{
    res.render('index',{
        taskList
    });
});

// Add Task
app.get('/add',(req,res)=>{
    res.render('add');
});

app.post('/add',(req,res)=>{
    const { task, description } = req.body;
    const newTask = { 
        title: task, 
        description: description || 'No description provided',
        steps: [] // Initialize steps as an empty array
    };
    taskList.push(newTask);
    res.redirect('/');
});

// Edit Task
app.get('/edit/:index',(req,res)=>{
    const { index } = req.params;
    res.render('edit',{
        task: taskList[index],
        index
    });
});

app.post('/edit',(req,res)=>{
    const { task, description, index } = req.body;
    taskList[index] = { title: task, description: description || 'No description provided', steps: taskList[index].steps };
    res.redirect('/');
});

// View Task
app.get('/view',(req,res)=>{
    console.log("TaskList:", taskList);
    res.render('view',{ taskList });
});


// Map Task
app.get('/map/:index',(req,res)=>{
    const { index } = req.params;
    res.render('map',{
        task: taskList[index],
        index
    });
});

// Delete Task
app.post('/delete/:index', (req,res) => {
    const { index } = req.params;
    taskList.splice(index, 1);
    res.redirect('/');
});

// Add Step
app.get('/tasks/:taskIndex/steps/add', (req,res) => {
    const { taskIndex } = req.params;
    const task = taskList[taskIndex];
    res.render('addStep', { taskIndex, task });
});


app.post('/tasks/:taskIndex/steps/add', (req,res) => {
    const { taskIndex } = req.params;
    const { title, note, progress } = req.body;
    taskList[taskIndex].steps.push({ title, note, progress });
    res.redirect(`/map/${taskIndex}`);
});

// Edit Step
app.get('/tasks/:taskIndex/steps/edit/:stepIndex', (req,res) => {
    const { taskIndex, stepIndex } = req.params;
    const task = taskList[taskIndex];
    const step = task.steps[stepIndex];
    res.render('editStep', { taskIndex, stepIndex, task, step });
});


app.post('/tasks/:taskIndex/steps/edit/:stepIndex', (req,res) => {
    const { taskIndex, stepIndex } = req.params;
    const { title, note, progress } = req.body;
    taskList[taskIndex].steps[stepIndex] = { title, note, progress };
    res.redirect(`/map/${taskIndex}`);
});

// Delete Step
app.post('/tasks/:taskIndex/steps/delete/:stepIndex', (req,res) => {
    const { taskIndex, stepIndex } = req.params;
    taskList[taskIndex].steps.splice(stepIndex, 1);
    res.redirect(`/map/${taskIndex}`);
});


// Server
const PORT = 3000;
app.listen(PORT,()=>{
    console.log(
        `Server running on http://localhost:${PORT}`
    );
});

// testing 123

// Second test 123

//Third test 123