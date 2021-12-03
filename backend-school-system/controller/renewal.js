var Sequelize = require('sequelize');
const Op = Sequelize.Op;
var async = require('async');
const db = require('.././models');
const CNST = require('.././config/constant');
const moment = require('moment');
const { sendEmail } = require('../helper/email');
const { ExtractJwt } = require('passport-jwt');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/web_config.json')[env];

module.exports = {
    sendExpiredChildEmailToParent: async (req, res, next) => {
        try {
            // const expired = req.query.expired || false;
            var renewalTypesArray = [
                { column_name: "expiry_date", type: "Admission", expired: true, table_name: 'childs' },
                { column_name: "expiry_date", type: "Admission", expired: false, table_name: 'childs' },
                { column_name: "last_physical_date", type: "Last Physical", expired: true, table_name: 'child_medical_info' },
                { column_name: "last_physical_date", type: "last physical", expired: false, table_name: 'child_medical_info' },
                { column_name: "lead_screen_date", type: "Lead Screen", expired: true, table_name: 'child_medical_info' },
                { column_name: "lead_screen_date", type: "Lead Screen", expired: false, table_name: 'child_medical_info' },
                { column_name: "immunizations", type: "Immunizations", expired: true, table_name: 'child_medical_info' },
                { column_name: "immunizations", type: "Immunizations", expired: false, table_name: 'child_medical_info' }
            ]
            async.eachOfSeries(renewalTypesArray, function (renewal, i, callback) {
                let whereCondition = "";
                let emailShootDays = "";
                if (renewal.expired) {
                    emailShootDays = 2;
                    whereCondition = {
                        [renewal.column_name]: {
                            [Op.lt]: moment().format('YYYY-MM-DD')
                        }
                    }
                }
                else {
                    emailShootDays = 7;
                    whereCondition = {
                        [renewal.column_name]: {
                            [Op.between]: [moment().format('YYYY-MM-DD'), moment().add(30, 'days').format('YYYY-MM-DD')]
                        }
                    }
                }
                db[renewal.table_name].findAll({
                    where: whereCondition,
                    include: [{
                        model: db.users,
                        attributes: ['first_name', 'last_name', 'email'],
                        where: { has_deleted: 'false' }
                    }]
                }).then(data => {
                    if (data.length) {
                        sortDataAndSendEmail(data, emailShootDays, renewal).then(result => {
                            callback()
                            //return res.status(200).json({ data: data, message: CNST.SUCCESS });
                        }).catch(error => {
                            console.log("Email error : " + error)
                            //return res.status(400).json({ message: error.message });
                        })
                    }
                    else {
                        callback();
                    }
                })
            }, function (error) {
                if (error) {
                    return res.status(400).json({ message: error.message });
                }
                return res.status(200).json({ message: CNST.SUCCESS });
                // all queries are done here
            });

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
// This function sorts and sends email.
function sortDataAndSendEmail(data, emailShootDays, renewalType) {
    return new Promise((resolve, reject) => {
        try {
            const emailDataArr = [];
            // Send email to parent
            if (data.length) {
                const currentDay = moment().format('DD');
                for (let k = 0; k < data.length; k++) {
                    var obj = {};
                    // var renewal_date = renewalType.table_name === "childs"?"expiry_date":
                    const expiryDate = moment(data[k][renewalType.column_name]).format('LL')
                    let j = 0;
                    for (let i = 0; i < 30;) {
                        let countEmailShootDay = moment(data[k][renewalType.column_name]).add(i, 'days').format('DD') //(parseInt(expiryDay === (28 || 30 || 31) ? 1 : expiryDay) + parseInt(i));
                        if (parseInt(currentDay) === parseInt(countEmailShootDay)) {
                            obj.email = data[k].user.email;
                            obj.parent_name = `${data[k].user.first_name} ${data[k].user.last_name}`;
                            // obj.child_name = `${data[k].first_name} ${data[k].last_name}`;
                            obj.expired = renewalType.expired;
                            obj.expiry_date = expiryDate;
                            obj.subject = renewalType.type
                            obj.expired_column_name = (renewalType.type).toLowerCase();
                            obj.contactEmail = config.contact_email;
                            obj.logo = config.email_logo
                            emailDataArr.push(obj);
                            break;
                        }
                        i += emailShootDays;
                    }
                }
                if (emailDataArr.length) {
                    const emailREs = sendEmail('renewal', emailDataArr)
                    resolve(true)
                }
                else {
                    resolve()
                }
            }
        }
        catch (error) {
            reject(error);
        }
    })
}