module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `tags_seen` ORDER BY id ASC"; // query database to get all the tags_seen

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "RFID project"
                ,players: result
            });
        });
    },
};