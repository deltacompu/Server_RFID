#!/bin/bash
. ~/.nvm/nvm.sh
. ~/.bashrc

if [ -z "$(sudo netstat -na | grep 3000 | grep LISTEN)" ];
then
    echo notinuse    
    nvm install 16
    node app.js > my_app_log.log 2> my_app_err.log & 
     
else
echo RFID web server running on port 3000 is inuse
fi


