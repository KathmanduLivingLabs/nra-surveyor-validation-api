'use strict';

module.exports = function(sequelize,DataTypes){

    var Onaaccounts = sequelize.define('onaaccounts',{

        ona_id : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        username : {
            type : DataTypes.STRING,
            allowNull : false
        },
        hash : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        first_name : {
            type : DataTypes.STRING,
            allowNull : true
        },
        last_name : {
            type : DataTypes.STRING,
            allowNull : true
        },
        email : {
            type : DataTypes.STRING,
            allowNull : true
        }

    });

    return Onaaccounts;


}