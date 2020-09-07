const fs = require('fs');

fs.readFile('contador.txt', (error, data) => {
    if(error){
        console.log(error);
    }

    let visitas = data.toString().split(':')[1];
    visitas++;
    
    fs.writeFile('contador.txt', `visitas:${visitas}`, (error) => {
        console.log(error);
    });
    
})