module.exports = {
    getHomePageScanner: (req, res) => {
  
            res.render('scanner.ejs', {
                title: "Scanner found" 
                            
            });
        
    },

    getHomeMonitor: async (req, res) => {
  
        res.render('monitor.ejs', {
            title: "Monitor RFID" 
                         
        });        
    },

    getHomePageRadio: (req, res) => {
  
        res.render('radio.ejs', {
            title: "Radio found" 
                         
        });
    
    },

    getHomePageNoTag: async (req, res) => {
  
        res.render('notags.ejs', {
            title: "RFID" 
                         
        });        
    },

    getNewIdTag: async (req, res) => {
  
        res.render('add_id_tag.ejs', {
            title: "Add new Id Tag" 
                         
        });        
    },
};