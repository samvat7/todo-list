const express = require('express');

const bodyParser = require('body-parser');

const db = require('./config/mongoose');

const Task = require('./models/task');

const app = express();

const port = 7000;

app.listen(port, function (err) {

    if (err) {
        console.log('Error in launching the server.');

        return;
    }

    console.log('Server is up and running on the port: ', port);
});

app.set('view engine', 'ejs');

app.set('views', './views');

app.use(express.static('assets'));

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.urlencoded());

app.get('/', function (req, res) {

    Task.find({}).then((tasks) => {

        return res.render('home', {

            title: "Home",
            task_list: tasks
        })
    })
        .catch((err) => {

            console.log('Error retrieving tasks from DB: ', err);

        });
});

app.post('/create-task', function(req, res){

    const newTask = new Task({
        name: req.body.name,
        type: req.body.type,
        date: req.body.date,
        checked: false
    });

    newTask.save().then(() =>{

        console.log(`${newTask} saved.`);
    }).catch((err) =>{

        console.log('Error adding new task: ', err);
    });

    return res.redirect('back');
});

app.get('/delete-task/', function(req, res){

    let taskId = req.query.id;

    Task.findByIdAndDelete(taskId).then((err) => {

        if(err){
            console.log('Error in deleting the task: ', err);
            return;
        }

        console.log('Task deleted succesfully.');
    });

    return res.redirect('back');
});

app.get('/mark-task/', function(req,res){

    let taskId = req.query.id;

    Task.findByIdAndUpdate(taskId, {checked: true}).then((err, docs) => {

        if(err){
            console.log('Error in updating marked status of the task: ', err);
            return;
        }
        
        console.log('Successfully updated the marked status: ', docs);
    });

    return res.redirect('back');
});

app.get('/unmark-task/', function(req,res){

    let taskId = req.query.id;

    Task.findByIdAndUpdate(taskId, {checked: false}).then((err, docs) => {

        if(err){
            console.log('Error in updating marked status of the task: ', err);
            return;
        }
        
        console.log('Successfully updated the marked status: ', docs);
    });

    return res.redirect('back');
});

app.get('/delete-all-checked', function(req, res){

    Task.deleteMany({checked: true}).then(() => {

        console.log('Marked tasks deleted.');
    }).catch((err) => {

        console.log('Error occured in deleting checked tasks', err);
    });

    return res.redirect('back');
});

