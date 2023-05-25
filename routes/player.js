const fs = require('fs');
const Json2csvParser = require("json2csv").Parser;
const mysql = require("mysql");

           

module.exports = {
    addPlayerPage: (req, res) => {
        res.render('add-player.ejs', {
            title: "Download Viewed Asset Tags Report"
            ,message: ''
        });    
    },
    addPlayer: (req, res) => {
        
        let initial_date = req.body.initial_date;
        let end_date = req.body.end_date;
        let tagsseenQuery = "SELECT * FROM tags_seen WHERE date_time between '" + initial_date + "' and '" + end_date + "';";
       
        
        db.query(tagsseenQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'The document is being created, it will be stored in the download folder';

                const connection = mysql.createConnection({
                    host: 'localhost',
                    user: 'userRFID',
                    password: 'Amazon2022!',
                    database: 'socka'
                  });
                  
                  // open the MySQL connection
                  connection.connect(error => {
                    if (error) throw error;
                  
                    // query data from MySQL
                    connection.query(tagsseenQuery, function(error, data, fields) {
                      if (error) throw error;
                  
                      const jsonData = JSON.parse(JSON.stringify(data));
                      console.log("jsonData", jsonData);
                  
                      const json2csvParser = new Json2csvParser({ header: true});
                      const csv = json2csvParser.parse(jsonData);
                      console.log("jsonData", csv);
                      fs.writeFile("C:\\Users\\davsuar\\Downloads\\tags_"+ initial_date+"_until_"+ end_date +".csv", csv, function(error) {
                        if (error) throw error;
                        console.log("Write to csv file successfully!");
                        res.render('add-player.ejs', {
                            message,
                            title: "Download"
                        });
                      });
                    });
                  });                
            } else if (result.length == 0) {
                message = 'There is not data from those dates. Check the dates selected';
                res.render('add-player.ejs', {
                     message,
                    title: "Download"
                 });
            }
        });
    }    
};
