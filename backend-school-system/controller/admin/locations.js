const JWT = require("jsonwebtoken");
var Sequelize = require('sequelize');
const Op = Sequelize.Op
const db = require('../../models');
const CNST = require('../../config/constant');
const { sendEmail } = require('../../helper/email');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/web_config.json')[env];
const { getUserRole } = require('../../helper/helper');
const { mediaUploadToS3 } = require('../../helper/s3upload')

module.exports = {
    list: async (req, res, next) => {
        try {
            var status = 'active';
            const locationList = await db.locations.findAndCountAll({
                where: { has_deleted: "false" },
                // Add order conditions here.... 
                offset: 0, limit: 200
            }, { rows: false })
            return res.status(200).json({ data: locationList.rows, total_records: locationList.count, message: CNST.DATA_LOAD_SUCCESS })
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    },

    getbyid: async (req, res, next) => {
        try {
            const id = req.query.id;
            if (!id) {
                return res.status(400).json({ message: "location is require" });
            }
            const locationList = await db.locations.findOne(
                {
                    where: { has_deleted: "false", id }
                },
                { rows: false }
            );
            return res.status(200).json({ data: locationList, message: CNST.SUCCESS });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    create: async (req, res, next) => {
        try {
            const {
                location,
                status
            } = req.value.body;
            const locationObject = {
                id: Math.random(),
                location,
                status,
                has_deleted: "false"
            };
            // Check duplicate    
            const hasExist = await db.locations.findOne({
                where: {
                    location: `${location}`,
                },
            });
            if (!hasExist) {
                const LocationRes = await db.locations.create(
                    { ...locationObject }
                );
                return res.status(200).json({ data: LocationRes, message: "Added successfully" });
            } else {
                return res.status(400).json({ message: "Location is already exist" });
            } INCIDNT_ALREADY_EXIST
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    update: async (req, res, next) => {
        try {
            const {
                id,
                location,
                status,
                has_deleted
            } = req.value.body;
            const locationObj = {
                id,
                location,
                status,
                has_deleted
            }

            // Update Incident
            const hasExist = await db.locations.findOne({
                where: {
                    location: `${location}`,
                },
            });
            if (hasExist ) {
                console.log("aready exist")
                return res.status(400).json({ message: "Location is already exist" });
            } else {
                const result = await db.locations.update(
                    locationObj,
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
            const locationsId = req.query.id;
            const locationsObj = { has_deleted: "true" };
            await db.locations.update(locationsObj, {
                where: { id: locationsId },
            });
            return res.status(200).json({ message: "location deleted successfully" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

}
