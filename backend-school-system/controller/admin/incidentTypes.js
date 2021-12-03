const JWT = require("jsonwebtoken");
var Sequelize = require('sequelize');
const db = require('../../models');
const CNST = require('../../config/constant');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/web_config.json')[env];
const { getUserRole } = require('../../helper/helper');
const { mediaUploadToS3 } = require('../../helper/s3upload')

module.exports = {
    list: async (req, res, next) => {
        try {
            var status = 'active';
            const incident_type_list = await db.incident_type.findAndCountAll({
                where: { has_deleted: "false" },
                // Add order conditions here.... 
                offset: 0, limit: 200
            }, { rows: false })
            return res.status(200).json({ data: incident_type_list.rows, total_records: incident_type_list.count, message: CNST.DATA_LOAD_SUCCESS })
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    },

    getbyid: async (req, res, next) => {
        try {
            const id = req.query.id;
            if (!id) {
                return res.status(400).json({ message: "Incident Type is require" });
            }
            const incident_type_list = await db.incident_type.findOne(
                {
                    where: { has_deleted: "false", id }
                },
                { rows: false }
            );
            return res.status(200).json({ data: incident_type_list, message: CNST.SUCCESS });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    create: async (req, res, next) => {
        try {
            const {
                incident_type,
                status
            } = req.value.body;
            const incident_type_Object = {
                id: Math.random(),
                incident_type,
                status,
                has_deleted: "false"
            };
            // Check duplicate    
            const hasExist = await db.incident_type.findOne({
                where: {
                    incident_type: `${incident_type}`,
                },
            });
            if (!hasExist) {
                const incident_type_Res = await db.incident_type.create(
                    { ...incident_type_Object }
                );
                return res.status(200).json({ data: incident_type_Res, message: "Added successfully" });
            } else {
                return res.status(400).json({ message: "Incident Type  is already exist" });
            } INCIDNT_ALREADY_EXIST
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    update: async (req, res, next) => {
        try {
            const {
                id,
                incident_type,
                status,
                has_deleted
            } = req.value.body;
            const incident_type_Obj = {
                id,
                incident_type,
                status,
                has_deleted
            }

            // Update Incident
            const hasExist = await db.incident_type.findOne({
                where: {
                    incident_type: `${incident_type}`,
                },
            });
            if (hasExist.status === status && hasExist.incident_type === incident_type) {
                console.log("aready exist")
                return res.status(400).json({ message: "Incident Type is already exist" });
            } else {
                const result = await db.incident_type.update(
                    incident_type_Obj,
                    { where: { id: id } }
                );
                return res.status(200).json({ data: result.data, message: "Update successfully" });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    delete: async (req, res, next) => {
        try {
            const incident_type_Id = req.query.id;
            const incident_type_Obj = { has_deleted: "true" };
            await db.incident_type.update(incident_type_Obj, {
                where: { id: incident_type_Id },
            });
            return res.status(200).json({ message: "Incident Type deleted successfully" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

}