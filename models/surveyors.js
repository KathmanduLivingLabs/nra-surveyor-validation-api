'use strict';

module.exports = function(sequelize,DataTypes){

    var NraSurveyors = sequelize.define('surveyors',{

        program : {
            type : DataTypes.STRING,
            allowNull : true
        },
        crn : {
            type : DataTypes.STRING,
            allowNull : true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : true
        },
        address : {
            type : DataTypes.STRING,
            allowNull : true

        },
        mobile : {
            type : DataTypes.STRING,
            allowNull : true

        },
        district : {
            type : DataTypes.STRING,
            allowNull : true

        }


    });

    return NraSurveyors;


}