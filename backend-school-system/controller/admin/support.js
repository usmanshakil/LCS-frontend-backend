var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');
const db = require('../../models');
const CNST = require('../../config/constant');
const { sendEmail } = require('../../helper/email');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/web_config.json')[env];
module.exports = {
    list: async (req, res, next) => {
        try {
            var page_number = parseInt(req.query.page_number) || CNST.DEFAULT_PAGE_NUMBER,
                page_size = parseInt(req.query.page_size) || CNST.DEFAULT_PAGE_SIZE,
                page_number = page_number <= 1 ? 0 : ((page_number * page_size) - page_size),
                order_by_column = req.query.column || '', order_type = req.query.order || 'ASC',
                order_type = order_type === 'ascending' ? 'ASC' : 'DESC';
            var status = req.query.status || 'pending';

            const sortBy = { status, has_deleted: 'false' }

            const supportlist = await db.support.findAndCountAll({
                where: sortBy,
                // Add order conditions here....
                order: [
                    (order_by_column ? [order_by_column, order_type] : ['id', 'DESC'])
                ],
                offset: page_number, limit: page_size
            }, { rows: false })
            return res.status(200).json({ data: supportlist.rows, total_records: supportlist.count, message: CNST.DATA_LOAD_SUCCESS })
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    },
    reply: async (req, res, next) => {
        try {
            const { id, reply, user_email, user_name } = req.body;
            const data = { reply, admin_email: req.user.email, status: 'resolved' }
            const result = await db.support.update(data, { where: { id: id } });

            //Send email to super admin
            var supportReply = [{
                email: user_email,
                userName: user_name,
                adminEmail: config.email,
                reply: reply,
                contactEmail: config.contact_email,
                logo: config.email_logo
            }]
            const emailResponse = await sendEmail('support_reply', supportReply)
            return res.status(200).json({ message: CNST.SUPPORT_REPLY_SUCCESS })
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    },
    delete: async (req, res, next) => {
        try {
            const { ids } = req.body || []
            if (!ids.length) {
                return res.status(400).json({ message: CNST.ID_REQUIRED })
            }
            const result = await db.support.update({ has_deleted: 'true' }, { where: { id: ids } });
            return res.status(200).json({ message: CNST.DELETED_SUCCESS })

        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    },
    sortByDateRange: async (req, res, next) => {
        try {

            var page_number = parseInt(req.query.page_number) || CNST.DEFAULT_PAGE_NUMBER,
                page_size = parseInt(req.query.page_size) || CNST.DEFAULT_PAGE_SIZE,
                page_number = page_number <= 1 ? 0 : ((page_number * page_size) - page_size);

            const { start_date, end_date, status } = req.query;
            let whereCond = {
                has_deleted: 'false',
                status: status,
                created_at: {
                    [Op.between]: [moment(start_date + " 00:00:00").format('YYYY-MM-DD HH:mm:ss'), moment(end_date + " 00:00:00").format('YYYY-MM-DD HH:mm:ss')]
                }
            };
            const result = await db.support.findAndCountAll({
                where: whereCond,

                offset: page_number, limit: page_size,
                order: [
                    ['id', 'DESC']
                ],
                raw: false

            });
            return res.status(200).json({ data: result.rows, total_records: result.count, message: CNST.SUCCESS })

        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    },
}