const moment = require('moment');
const db = require('../../models');
const CNST = require('../../config/constant');
const { sendEmail } = require("../../helper/email");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/web_config.json')[env];
const { getUserRole } = require('../../helper/helper');
const { imageUpload } = require("../../helper/s3upload");
const tableTypes = ["parentAgreement", "localTripPermission", "photoRelease", "sunscreenPermission", "toothBrushingInformation", "transportAuthority", "schoolDirectory", "authorizationAndConsent"]

uploadImage = async (signature, fileName) => {
    return fileName = await imageUpload(signature, fileName);
}
module.exports = {
    add: async (req, res, next) => {
        try {
            const type = req.body.type;
            var table_name = "";
            switch (type) {
                case "childInfo":
                    table_name = "childs";
                    break;
                // const child_info_res = await db.childs.update(req.body[type], { where: { id: req.body[type].id } });
                case "parent1":
                case "parent2":
                    table_name = "child_parent_info";
                    break;
                case "medicalInformation":
                    table_name = "child_medical_info";
                    break;
                case "emergencyContact1":
                case "emergencyContact2":
                    table_name = "child_emergency_contact_info";
                    break;
                case "devReport":
                    table_name = "child_development_report";
                    break;
                case "childHealth":
                    table_name = "child_health_report";
                    break;
                case "childEatingHabit":
                    table_name = "child_eating_habit";
                    break;
                case "childToiletHabit":
                    table_name = "child_toilet_habit";
                    break;
                case "childSleepingHabit":
                    table_name = "child_sleeping_habit";
                    break;
                case "socialRelationship":
                    table_name = "child_social_relationship";
                    break;
                case "dailySchedule":
                    table_name = "child_daily_schedule";
                    break;
                case "photoRelease":
                    table_name = "child_photo_release";
                    break;
                case "localTripPermission":
                    table_name = "child_local_trip_permission";
                    break;
                case "parentAgreement":
                    table_name = "child_parent_agreement";
                    break;
                case "authorizationAndConsent":
                    table_name = "child_authorization_and_consent";
                    break;
                case "sunscreenPermission":
                    table_name = "child_sunscreen_permissions";
                    break;
                case "toothBrushingInformation":
                    table_name = "child_toothbrushing_info";
                    break;
                case "transportAuthority":
                    table_name = "child_transport_authority";
                    break;
                case "schoolDirectory":
                    table_name = "child_school_directory_info";
                    break;
                default:
                    break;
            }
            // if (tableTypes.indexOf(type) > -1) {
            //     if (req.body[type].signature.indexOf("https") === -1) {
            //         const fileName = await imageUpload(req.body[type].signature, (`'${req.user.id}_${table_name}'_Signature`));
            //         //Update signature value in model
            //         req.body[type].signature = fileName;
            //     }
            // }
            req.body[type].user_id = req.user.id;
            if (table_name === 'child_medical_info') {
                let physical_report_arr = req.body[type].medical_reports;
                delete req.body[type].medical_reports;
                let childMedicalInfo = await db[table_name].create(req.body[type]);
                //await db.medical_reports.destroy({ where: { child_medical_info_id: req.body[type].id } });
                if (physical_report_arr.length) {
                    let reportArr = [];
                    physical_report_arr.forEach(function (report) {
                        let reportObj = {
                            child_medical_info_id: childMedicalInfo.id,
                            physical_report: report.physical_report
                        };
                        reportArr.push(reportObj);
                    })
                    await db.medical_reports.bulkCreate(reportArr)
                }
            }
            if (table_name === "childs") {
                req.body[type].expiry_date = moment(req.body[type].admission_date).add(1, 'year').format('YYYY-MM-DD')
            }
            const result = await db[table_name].create(req.body[type]);
            if (table_name === "childs") {
                return res.status(200).json({ child_id: result.id, message: CNST.SUCCESS_MSG })
            } else {
                return res.status(200).json({ message: CNST.SUCCESS_MSG })
            }

        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    },
    list: async (req, res, next) => {
        try {
            var page_number = parseInt(req.query.page_number) || CNST.DEFAULT_PAGE_NUMBER,
                page_size = parseInt(req.query.page_size) || CNST.DEFAULT_PAGE_SIZE,
                page_number = page_number <= 1 ? 0 : ((page_number * page_size) - page_size);

            const orderBy = []
            const childs = await db.childs.findAndCountAll({
                where: { user_id: req.user.id, has_deleted: 'false' },
                include: [
                    { model: db.users, attributes: ['signature'], where: { active: 1, has_deleted: 'false' }, required: true },
                    { model: db.child_parent_info, as: 'parentInfo' },
                    {
                        model: db.child_medical_info, as: 'medicalInfo',
                        include: [{ model: db.medical_reports, as: 'medical_reports', required: false }]
                    },
                    { model: db.child_emergency_contact_info, as: 'emergencyInfo' },
                    { model: db.child_development_report, as: 'devReport' },
                    { model: db.child_health_report, as: 'healthReport' },
                    { model: db.child_eating_habit, as: 'eatingHabitReport' },
                    { model: db.child_toilet_habit, as: 'toiletHabitReport' },
                    { model: db.child_sleeping_habit, as: 'sleepingHabitReport' },
                    { model: db.child_social_relationship, as: 'socialRelationshipReport' },
                    { model: db.child_daily_schedule, as: 'dailyScheduleReport' },
                    { model: db.child_photo_release, as: 'photoRelease' },
                    { model: db.child_local_trip_permission, as: 'localTripPermission' },
                    { model: db.child_parent_agreement, as: 'parentAgreement' },
                    { model: db.child_authorization_and_consent, as: 'authorizationAndConsent' },
                    { model: db.child_sunscreen_permissions, as: 'sunscreenPermission' },
                    { model: db.child_toothbrushing_info, as: 'toothBrushingInformation' },
                    { model: db.child_transport_authority, as: 'transportAuthority' },
                    { model: db.child_school_directory_info, as: 'schoolDirectory' },
                ],
                distinct: true,
                // Add order conditions here....
                order: [
                    ['id', 'DESC']
                ],
                offset: page_number, limit: page_size
            }, { rows: false });
            return res.status(200).json({ data: childs.rows, count: childs.count, message: CNST.DATA_LOAD_SUCCESS })
        } catch (err) {

            return res.status(400).json({ message: err.message })
        }

    },
    update: async (req, res, next) => {
        try {
            const type = req.body.type;
            var table_name = "";
            switch (type) {
                case "childInfo":
                    table_name = "childs";
                    break;
                // const child_info_res = await db.childs.update(req.body[type], { where: { id: req.body[type].id } });
                case "parent1":
                case "parent2":
                    table_name = "child_parent_info";
                    break;
                case "medicalInformation":
                    table_name = "child_medical_info";
                    break;
                case "emergencyContact1":
                case "emergencyContact2":
                    table_name = "child_emergency_contact_info";
                    break;
                case "devReport":
                    table_name = "child_development_report";
                    break;
                case "childHealth":
                    table_name = "child_health_report";
                    break;
                case "childEatingHabit":
                    table_name = "child_eating_habit";
                    break;
                case "childToiletHabit":
                    table_name = "child_toilet_habit";
                    break;
                case "childSleepingHabit":
                    table_name = "child_sleeping_habit";
                    break;
                case "socialRelationship":
                    table_name = "child_social_relationship";
                    break;
                case "dailySchedule":
                    table_name = "child_daily_schedule";
                    break;
                case "photoRelease":
                    table_name = "child_photo_release";
                    break;
                case "localTripPermission":
                    table_name = "child_local_trip_permission";
                    break;
                case "parentAgreement":
                    table_name = "child_parent_agreement";
                    break;
                case "authorizationAndConsent":
                    table_name = "child_authorization_and_consent";
                    break;
                case "sunscreenPermission":
                    table_name = "child_sunscreen_permissions";
                    break;
                case "toothBrushingInformation":
                    table_name = "child_toothbrushing_info";
                    break;
                case "transportAuthority":
                    table_name = "child_transport_authority";
                    break;
                case "schoolDirectory":
                    table_name = "child_school_directory_info";
                    break;
                default:
                    break;
            }
            let before, after = "";
            if (req.body[type].id) {
                // Get data before updation
                before = await db[table_name].findOne({ where: { id: req.body[type].id }, attributes: { exclude: ['createdAt', 'updatedAt'] } })
                // if (tableTypes.indexOf(type) > -1) {
                //     console.log(req.body[type].signature.indexOf("https") === -1)
                //     if (req.body[type].signature.indexOf("https") === -1) {
                //         const fileName = await imageUpload(req.body[type].signature, (`${before.user_id}_${table_name}_Signature`));
                //         //Update signature value in model
                //         req.body[type].signature = fileName;
                //     }
                // }

                // Update data
                if (table_name === 'child_medical_info') {
                    let physical_report_arr = req.body[type].medical_reports;
                    delete req.body[type].medical_reports;
                    let childMedicalInfo = await db[table_name].update(req.body[type], { where: { id: req.body[type].id } });
                    await db.medical_reports.destroy({ where: { child_medical_info_id: req.body[type].id } });
                    if (physical_report_arr.length) {
                        let reportArr = [];
                        physical_report_arr.forEach(function (report) {
                            let reportObj = {
                                child_medical_info_id: req.body[type].id,
                                physical_report: report.physical_report
                            };
                            reportArr.push(reportObj);
                        })
                        await db.medical_reports.bulkCreate(reportArr)
                    }
                } else {
                    const result = await db[table_name].update(req.body[type], { where: { id: req.body[type].id } });
                }

                // Get data after updation
                after = await db[table_name].findOne({ where: { id: req.body[type].id }, attributes: { exclude: ['createdAt', 'updatedAt'] } })

                // Compare before and after data to check the difference and send email to admin
                var updatedInfo = [];
                for (let key in before._previousDataValues) {
                    if (before[key] !== after[key]) {
                        var obj = {
                            key: [key],
                            before: before[key] === "0" ? "checked" : before[key] === "1" ? "unchecked" : before[key],
                            after: after[key] === "0" ? "checked" : after[key] === "1" ? "unchecked" : after[key]
                        }
                        updatedInfo.push(obj);
                    }
                }
                if (updatedInfo.length) {
                    let emailData = [{
                        tableName: `${table_name} form`,
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
                }
                return res.status(200).json({ message: CNST.CHILD_UPDATED_SUCCESS })
            }
            else {
                req.body[type].user_id = req.user.id;
                // if (tableTypes.indexOf(type) > -1) {
                //     if (req.body[type].signature.indexOf("https") === -1) {
                //         const fileName = await imageUpload(req.body[type].signature, (`${req.body[type].user_id}_${table_name}_Signature`));
                //         //Update signature value in model
                //         req.body[type].signature = fileName;
                //     }
                // }
                if (table_name === 'child_medical_info') {
                    let physical_reports_arr = req.body[type].medical_reports;
                    delete req.body[type].medical_reports;
                    let childMedicalInfo = await db[table_name].create(req.body[type]);
                    //await db.medical_reports.destroy({ where: { child_medical_info_id: req.body[type].id } })
                    if (physical_reports_arr.length) {
                        let reportArr = [];
                        physical_reports_arr.forEach(function (report) {
                            let reportObj = {
                                child_medical_info_id: req.body[type].id,
                                physical_report: report.physical_report
                            };
                            reportArr.push(reportObj);
                        })
                        await db.medical_reports.bulkCreate(reportArr)
                    }
                } else {

                    const result = await db[table_name].create(req.body[type]);
                }
                return res.status(200).json({ message: CNST.CHILD_UPDATED_SUCCESS })
            }


        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    delete: async (req, res, next) => {
        try {
            const id = req.query.id;
            if (!id) {
                return res.status(400).json({ message: CNST.CHILD_ID_REQUIRED });
            }
            const childObj = {
                has_deleted: 'true'
            }
            const result = await db.childs.update(childObj, { where: { id: id } });
            return res.status(200).json({ message: CNST.CHILD_DELETE_SUCCESS })
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    renew_admission: async (req, res, next) => {
        let transaction;
        try {
            transaction = await db.sequelize.transaction();
            let { expiry_date, child_id, child_name, parent_signature, parent_signature_name } = req.body;
            let formated_expiry_date = moment(expiry_date).format('YYYY-DD-MM')
            await db.childs.update({ expiry_date: formated_expiry_date }, { where: { id: child_id } }, { transaction })
            await db.users.update({ signature: parent_signature, comment: parent_signature_name }, { where: { id: req.user.id } }, { transaction })
            let emailData = [{
                email: config.email,
                adminName: config.name,
                expiryDate: expiry_date,
                childName: child_name,
                parentName: `${req.user.first_name} ${req.user.last_name}`
            }]
            // Send updates on admin email if anything changed in table.
            const emailResult = sendEmail('renewal_admission', emailData)
            await transaction.commit();
            return res.status(200).json({ message: CNST.RENEWAL_ADMISSION_SUCCESS })
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            return res.status(400).json({ message: error.message });
        }
    }
}