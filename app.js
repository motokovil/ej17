const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

//__dirname es una variable global dentro del contexto de node que nos regresa la ruta absoluta donde nos ubicamos actualmente
//path.join nos permite construir rutas absolutas
//express.static nos sirve para indicar que nuestro servidor va estar sirviendo archivos estaticos sobre el directorio public

const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/nosotros', (req, res) => {
    fs.readFile('contador.txt', (error, datos) => {
        let visitas = datos.toString();
        let arregloVisitas = visitas.split(':');
        visitas = Number(arregloVisitas[1]);
        visitas++;
        fs.writeFile('contador.txt', `visitas:${visitas}`, (error) => {
            if(error){
                console.log(error);
            }
            res.send('<h1>El numero de visitas es: '+visitas+'</h1>');
        });
    });
});

app.post('/register', (req, res) => {
    fs.readFile('db.json', (error, data) => {
        if(error){
            console.log(error);
        }
        let users = JSON.parse(data.toString()); //Transformarlo a un objeto literal javascript para poder manipularlo
        users.push(req.body); //Voy agregar los datos que estoy recibiendo a través de la petición
        fs.writeFile('db.json', JSON.stringify(users), (error) => {
            if(error) { 
                console.log(error);
            }
            res.redirect('/');
        });
    });
});

app.post('/login', (req,res)=>{
    const {email, password} = req.body
    fs.readFile('db.json', (error,data)=>{
        if(error){console.log(error)}
        const users = JSON.parse(data)
        const user = users.find(element => {
            if(element.email === email && element.password === password){
                return element
            }
        })
        if(user){
            res.sendFile(path.join(__dirname, 'public', 'index.html'))
        } else {
            res.redirect('/login.html')
        }
    })
    console.log(email, password)
})

app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/restablecer-contrasena', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'forgot-password.html'));
});

app.listen(8000, () => {
    console.log('Iniciando el servidor en el puerto 8000');
});