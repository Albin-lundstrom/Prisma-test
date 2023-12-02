express = require('express'); 
      app = express(); 
      bodyParser = require('body-parser');
const path = require('path');
const { prismaCreate } = require('./create.js')
const { prismaEdit } = require('./edit.js')
const { main } = require('./get-users.js');
const url = require('url')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended : true })); 
app.use(express.static(__dirname));
const multer = require('multer');
const upload = multer({ dest: 'img/' });

app.get('/', function (req, res) {
    main().then((res) => test(res));
    const test = (data) => {
    res.render('index.ejs', {
        data: data,
    });
    }
})
app.get('/create', function (req, res) {  
    res.render('create.ejs', {
    }); 
})
app.post('/create', upload.single('img'), async (request, response) => {
    const { name, email, phone } = request.body;
    const img = request.file ? request.file.filename : null;
    try {
        const newUser = await prismaCreate(name, email, phone, img);

        res.render('create.ejs', {
        });    
    } catch (error) {
        response.status(500).send('Internal Server Error');
    }
});
process.on('beforeExit', async () => {
    await prisma.$disconnect();
});


app.post('/card:id', upload.single('img'), async (request, res) => {
    let {id, email, name, phone } = request.body;
    console.log(request.body);
    const img = request.file ? request.file.filename : null;
    edits = {
        id: '',
        name:name,
        email:email,
        phone:phone,
        img:img,
    };
    let changes = {};
    id = Number(id);

    for(var i = 1; i < Object.values(request.body).length; i++){
        console.log(Object.keys(edits)[i], Object.values(request.body)[i])
        console.log("---------------")
        if(Object.values(request.body)[i] != ''){
           changes[Object.keys(edits)[i]] = Object.values(request.body)[i];
        }else{
           continue;
    }}
    if(Object.values(edits)[4] != null){
        changes[Object.keys(edits)[4]] = Object.values(edits)[4];
    }
    try {
        const clientUrl = request.hostname + request.originalUrl;
        cilentPath = clientUrl
        let index = Number(cilentPath.slice(14));
        console.log(changes)
        const newUser = await prismaEdit(id, changes);
        main().then((res) => test(res));
        let test = (data) => {
        res.render('card.ejs', {
        data: data,
        i: index
        })}
    }catch (error) {
        //response.status(500).send('Internal Server Error');
        const clientUrl = request.hostname + request.originalUrl;
        cilentPath = clientUrl
        console.log(cilentPath);
        let index = Number(cilentPath.slice(14));
        main().then((res) => test(res));
        let test = (data) => {
        res.render('card.ejs', {
        data: data,
        i: index
        })}
    }
});
process.on('beforeExit', async () => {
    await prisma.$disconnect();
});


app.get('/card:id', (req, res) => {
    const clientUrl = req.hostname + req.originalUrl;
    cilentPath = clientUrl
    console.log(cilentPath);
    index = Number(cilentPath.slice(14));
    main().then((res) => test(res));
    const test = (data) => {
    res.render('card.ejs', {
        data: data,
        i: index
    });
    }
});
app.get('/card', (req, res) => {
    res.render('index.ejs', {
    });
});

var server = app.listen(8000, function () {  
    var host = server.address().address  
    var port = server.address().port  
    console.log("Example app listening at http://%s:%s", host, port)  
})