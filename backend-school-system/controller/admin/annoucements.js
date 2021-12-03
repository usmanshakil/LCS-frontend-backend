const db = require('../../models');
const CNST = require('../../config/constant');
const { sendEmail } = require('../../helper/email');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/web_config.json')[env];
const { getUserRole } = require('../../helper/helper');
module.exports = {
    list: async (req, res, next) => {
        try {
            var page_number = parseInt(req.query.page_number) || CNST.DEFAULT_PAGE_NUMBER,
                page_size = parseInt(req.query.page_size) || CNST.DEFAULT_PAGE_SIZE,
                page_number = page_number <= 1 ? 0 : ((page_number * page_size) - page_size),
                order_by_column = req.query.column || '', order_type = req.query.order || 'ASC',
                order_type = order_type === 'ascending' ? 'ASC' : 'DESC';
            let order = [['id', 'DESC']];
            order_by_column ? order.push([order_by_column, order_type]) : '';
            const list = await db.announcements.findAndCountAll({
                where: { has_deleted: 'false' },
                attributes: ['id', 'title', 'description', 'status', 'created_at'],

                // Add order conditions here....
                order,
                offset: page_number, limit: page_size
            }, { rows: false })

            return res.status(200).json({ data: list.rows, total_records: list.count, message: CNST.DATA_LOAD_SUCCESS })

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    add: async (req, res, next) => {
        try {
            const announcement = req.value.body;
            const result = await db.announcements.create(announcement);

            return res.status(200).json({ message: CNST.ANNOUNCEMENT_CREATED_SUCCESS })

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    update: async (req, res, next) => {
        try {
            const { id, title, description } = req.value.body;
            const announcement = { title, description };
            let beforeData, afterData;

            // Fetch announcement data and store in object to compare after updated data
            const announcementBefore = await db.announcements.findOne({ where: { id: id }, attributes: { exclude: ['createdAt', 'updatedAt'] } })

            // Update Announcement
            const result = await db.announcements.update(announcement, { where: { id: id } });

            // Fetch announcement data after updation
            const announcementAfter = await db.announcements.findOne({ where: { id: id }, attributes: { exclude: ['createdAt', 'updatedAt'] } })

            // Compare both before and after record. Get only changes fields
            var updatedInfo = [];
            for (let key in announcementAfter._previousDataValues) {
                if (announcementAfter[key] !== announcementBefore[key]) {
                    var obj = {
                        key: [key],
                        before: announcementBefore[key],
                        after: announcementAfter[key]
                    }
                    updatedInfo.push(obj);
                }
            }

            let emailData = [{
                tableName: "announcement",
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

            return res.status(200).json({ message: CNST.ANNOUNCEMENT_UPDATED_SUCCESS })

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    setActive: async (req, res, next) => {
        try {
            const id = req.params.id;
            const { status } = req.body;
            if (!id) {
                return res.status(400).json({ message: CNST.ID_REQUIRED });
            }
            if (status) {
                db.announcements.update({ status: false }, { where: { status: true } }).then(response => {
                    db.announcements.update({ status: true }, { where: { id: id } }).then(status => {
                        return res.status(200).json({ message: CNST.ANNOUNCEMENT_ACTIVE_SUCCESS });
                    }).catch(error => {
                        return res.status(400).json({ message: error.message });
                    })
                }).catch(error => {
                    return res.status(400).json({ message: error.message });
                })
            }
            else {
                db.announcements.update({ status: false }, { where: { id: id } }).then(response => {
                    return res.status(200).json({ message: CNST.ANNOUNCEMENT_ACTIVE_SUCCESS });
                }).catch(error => {
                    return res.status(400).json({ message: error.message });
                })
            }

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    active: async (req, res, next) => {
        try {
            db.announcements.findOne({ where: { status: true } }).then(response => {
                return res.status(200).json({ data: response, message: CNST.SUCCESS });
            }).catch(error => {
                return res.status(400).json({ message: error.message });
            })
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    delete: async (req, res, next) => {
        try {
            const id = req.query.id;
            if (!id) {
                return res.status(400).json({ message: CNST.ANNOUNCEMENT_ID_REQUIRED });
            }
            const obj = {
                has_deleted: "true"
            }
            const result = await db.announcements.update(obj, { where: { id: id } })
            return res.status(200).json({ message: CNST.ANNOUNCEMENT_DELETED_SUCCESS })

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}