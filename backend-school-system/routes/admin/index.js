const user = require('./user');
const student = require('./student');
const classes = require('./class');
const teacher = require('./teacher');
const announcement = require('./annoucements');
const support = require('./support');
const incident = require('./incidents');
const locations = require('./locations');
const incidentTypes = require('./incidentTypes');
module.exports = {
    user,
    student,
    classes,
    teacher,
    announcement,
    support,
    incident,
    locations,
    incidentTypes
}