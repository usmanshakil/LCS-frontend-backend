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
            var page_number = parseInt(req.query.page_number) || CNST.DEFAULT_PAGE_NUMBER,
                page_size = parseInt(req.query.page_size) || CNST.DEFAULT_PAGE_SIZE,
                page_number = page_number <= 1 ? 0 : ((page_number * page_size) - page_size),
                order_by_column = req.query.column || '',
                order_type = req.query.order || 'ASC',
                order_type = order_type === 'ascending' ? 'ASC' : 'DESC';
            var whereCondition = { has_deleted: "false" };
            let order = [['id', 'DESC']];
            order_by_column ? order.push([order_by_column, order_type]) : '';
            const teacherList = await db.incidents.findAndCountAll({
                where: whereCondition,
                include: [
                    {
                        model: db.medias,
                        attributes: ['uuid', 'extension']
                    },
                    {
                        model: db.childs,
                        attributes: ['first_name', 'last_name']
                    },
                    {
                        model: db.classes,
                        where: { has_deleted: "false" },
                        attributes: ['class_name', 'location']
                    },
                ],
                distinct: true,
                offset: page_number, limit: page_size,
                order,
                // raw: false
            }, { rows: false })
            return res.status(200).json({ data: teacherList.rows, total_records: teacherList.count, message: CNST.SUCCESS })
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    },
    getbyid: async (req, res, next) => {
        try {
            const id = req.query.id;
            if (!id) {
                return res.status(400).json({ message: CNST.INCIDENT_ID_REQUIRED });
            }
            const incidentList = await db.incidents.findOne(
                {
                    where: { has_deleted: "false", id },
                    include: [
                        {
                            model: db.medias,
                            attributes: ['uuid', 'extension', 'type']
                        },
                        {
                            model: db.childs,
                            attributes: ['first_name', 'last_name']
                        },
                        {
                            model: db.classes,
                            where: { has_deleted: "false" },
                            attributes: ['class_name', 'location']
                        },
                    ],
                },
                { rows: false }
            );
            return res.status(200).json({ data: incidentList, message: CNST.SUCCESS });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    search: async (req, res, next) => {
        try {
            var page_number = parseInt(req.query.page_number) || CNST.DEFAULT_PAGE_NUMBER,
                page_size = parseInt(req.query.page_size) || CNST.DEFAULT_PAGE_SIZE,
                page_number = page_number <= 1 ? 0 : ((page_number * page_size) - page_size),
                order_by_column = req.query.column || '', order_type = req.query.order || 'ASC',
                class_id = parseInt(req.query.class_id) || null,
                user_id = parseInt(req.query.user_id) || null,
                order_type = order_type === 'ascending' ? 'ASC' : 'DESC';
            let { qs } = req.query;
            var whereCondition = {
                has_deleted: 'false',
                [Op.or]: [
                    {
                        'name': { [Op.like]: `%${qs}%` }
                    },
                    {
                        'location': { [Op.like]: `%${qs}%` }
                    }
                ]
            };
            if (class_id) whereCondition.class_id = class_id
            if (user_id) whereCondition.user_id = user_id
            let order = [['id', 'DESC']];
            order_by_column ? order.push([order_by_column, order_type]) : '';
            const teacherList = await db.incidents.findAndCountAll({
                where: whereCondition,
                include: [
                    {
                        model: db.medias,
                        attributes: ['uuid', 'extension']
                    },
                    {
                        model: db.childs,
                        attributes: ['first_name', 'last_name']
                    },
                    {
                        model: db.classes,
                        where: { has_deleted: "false" },
                        attributes: ['class_name', 'location']
                    },
                ],
                distinct: true,
                offset: page_number, limit: page_size,
                order
            }, { rows: false })
            return res.status(200).json({ data: teacherList.rows, total_records: teacherList.count, message: CNST.SUCCESS })
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    },
    create: async (req, res, next) => {
        try {
            const {
                name,
                date,
                location,
                incident_type,
                description,
                solution,
                parent_notified,
                teacher_signoff,
                director_signoff,
                status,
                class_id,
                user_id,
                medias,
            } = req.value.body;
            const incidentObject = {
                name,
                date,
                location,
                incident_type,
                description,
                solution,
                parent_notified,
                teacher_signoff,
                director_signoff,
                status,
                class_id,
                user_id,
            };
            // if media exist then add media
            if (medias && medias.length > 0) incidentObject.medias = medias;

            // Check duplicate class name
            const hasExist = await db.incidents.findOne({
                where: {
                    name: `${name}`,
                    date: `${date}`
                },
            });
            if (!hasExist) {
                const IncidentRes = await db.incidents.create(
                    { ...incidentObject },
                    {
                        include: db.medias
                    }
                );
                return res.status(200).json({ data: IncidentRes, message: CNST.INCIDENT_ADD_SUCCESS });
            } else {
                return res.status(400).json({ message: CNST.INCIDNT_ALREADY_EXIST });
            } INCIDNT_ALREADY_EXIST
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    update: async (req, res, next) => {
        try {
            const {
                id,
                name,
                date,
                location,
                incident_type,
                description,
                solution,
                parent_notified,
                teacher_signoff,
                director_signoff,
                status,
                class_id,
                user_id,
                medias,
            } = req.value.body;
            const incident = {
                name,
                date,
                location,
                incident_type,
                description,
                solution,
                parent_notified,
                teacher_signoff,
                director_signoff,
                status,
                class_id,
                user_id,
            }

            // Fetch incident data and store in object to compare after updated data
            const incidentBefore = await db.incidents.findOne(
                {
                    where: { id: id },
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [
                        {
                            model: db.medias
                        },
                    ],
                })

            // Update Incident
            const result = await db.incidents.update(
                incident,
                { where: { id: id } }
            );


            const incidentAfter = await db.incidents.findOne(
                {
                    where: { id: id },
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [
                        {
                            model: db.medias
                        },
                    ]
                }
            )
            // if medias added  
            if (medias) {
                const uuids = incidentAfter.medias.map(m => m.uuid)
                // delete previuos one
                const deleteResult = await db.medias.destroy({ where: { uuid: uuids } })
                if (medias.length > 0) {
                    //   add new again
                    const mediaResult = await db.medias.bulkCreate(medias, { returning: true })
                    // assign to incident
                    await incidentAfter.setMedias(mediaResult.map(med => med.id))
                }
            }

            // Compare both before and after record. Get only chaupdate with includenges fields
            var updatedInfo = [];
            for (let key in incidentAfter._previousDataValues) {
                if (incidentAfter[key] !== incidentBefore[key]) {
                    var obj = {
                        key: [key],
                        before: incidentBefore[key],
                        after: incidentAfter[key]
                    }
                    updatedInfo.push(obj);
                }
            }
            let emailData = [{
                tableName: "incident",
                email: config.email,
                adminName: config.name,
                loginUserEmail: req.user.email,
                role: getUserRole(req.user.role_id),
                loginUserName: `${req.user.first_name} ${req.user.last_name}`,
                updatedInfo: updatedInfo,
                contactEmail: config.contact_email,
                logo: config.email_logo
            }]
            // Send updates on admin email if anything changed in table.
            const emailResult = sendEmail('data_change_updates', emailData)

            return res.status(200).json({ message: CNST.INCIDENT_UPDATE_SUCCESS })
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    delete: async (req, res, next) => {
        try {
            const incidentId = req.query.id;
            const incidentObj = { has_deleted: "true" };
            await db.incidents.update(incidentObj, {
                where: { id: incidentId },
            });
            return res.status(200).json({ message: CNST.INCIDENT_DELETE_SUCCESS });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    uploadImages: async (req, res, next) => {
        try {
            const { body, files } = req;
            const uuids = JSON.parse(body.uuids)
            if (!files || files.length < 1) {
                return res.status(400).json({ message: CNST.NO_FILES });
            }
            const results = [];
            for (let i = 0; i < files.length; i++) {
                const response = await mediaUploadToS3(files[i], uuids[i])
                results.push(response)
            }
            res.status(201).json({ data: results, message: 'done' })
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },
    classList: async (req, res, next) => {
        try {
            const classes = await db.classes.findAll(
                {
                    where: { has_deleted: "false", class_name: { [Op.ne]: "" } },
                    attributes: [
                        "id",
                        "class_name",
                    ],
                    order: [["id", "DESC"]]
                });
            return res.status(200).json({ data: classes, message: CNST.SUCCESS })
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    },
}