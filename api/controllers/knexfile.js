var knex = require('./connect-db');

const setup = {
    checkConnection: function(){
        console.log( knex );
    },

    postUser: function(user){
        return knex.raw( 'CALL AddUser(?, ?, ?, ?)', [user.displayName, user.email, user.picture, user.password] )
            
    },

    initialize: function(){
        console.log( "Creating user tables...");
        knex.raw('CREATE TABLE users (`userID` INT NOT NULL AUTO_INCREMENT, `email` VARCHAR(45) NULL, PRIMARY KEY (`userID`));')
        .then(
            (val) => {
                console.log( val );
            }
        ).catch(
            (error) => {
                console.log( error );
            }
        )
    }
}

module.exports = setup