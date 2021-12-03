const router = require('express-promise-router')();
const db = require('../../models');
const CNST = require('../../config/constant');
module.exports = {
    addClass: async (req,res,next) =>{
        try{                                     
            const { class_name, class_age, room, location, teachers } = req.value.body;
            const classObj = { class_name, class_age, room, location }
            const classRes = await db.classes.create(classObj);
            
            if(teachers.length){
                const teacherArr = [];
                for (let i = 0; i < teachers.length; i++){
                    let obj = {
                        teacher_id: teachers[i],
                        class_id: classRes.id
                    }
                    teacherArr.push(obj);
                }
                const classTeacherRes = await db.class_teachers.bulkCreate(teacherArr);
            }
            return res.status(200).json({ message: CNST.CLASS_ADD_SUCCESS})
        }catch(error){
            return res.status(400).json({ message: error.message})
        }
    }
}