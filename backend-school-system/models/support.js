'use strict'
module.exports = (sequalize,DataTypes) =>{
    const Support = sequalize.define('support',{
        name:{
            type:DataTypes.STRING,
            defaultValue:''
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        phone:{
            type:DataTypes.STRING,
            defaultValue:''
        },
        subject:{
            type:DataTypes.STRING,
            allowNull:false
        },
        message:{
            type:DataTypes.STRING,
            allowNull:false
        },
        reply:{
            type:DataTypes.STRING,
            defaultValue:''
        },
        admin_email:{
            type:DataTypes.STRING,
            defaultValue:''
        },
        status:{
            type:DataTypes.ENUM('pending','cancelled','resolved'),
            defaultValue:'pending'
        },
        has_deleted: {
            type: DataTypes.ENUM("false", "true"),
            defaultValue: "false"
        },
    },{ underscored: true, timestamps: true })
    Support.associate = function(models) {
        // associations can be defined here
        Support.belongsTo(models.users,{
            // onDelete:'CASCADE',
            hooks:true,
            foreignKey:{
                name:'user_id',
                allowNull:false
            }
        })
    };
    return Support;
}