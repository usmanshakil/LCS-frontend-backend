// const createError = require('http-errors');
const express = require('express');
const jwt_decode = require("jwt-decode");
// var http = require('http');
const passport = require('passport')
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const guard = require("express-jwt-permissions")();
const passportJWT = passport.authenticate('jwt', { session: false });
const cron = require('node-cron');
const rp = require('request-promise');
const dotenv = require('dotenv');
dotenv.config();
const CNST = require('./config/constant');
const { createBucket } = require('./helper/s3upload')
const userRoute = require('./routes/users');
const parentRoute = require('./routes/parent');
const superAdminRoute = require('./routes/super_admin');
const adminRoute = require('./routes/admin');
const teacherRoute = require('./routes/teacher');
const renewalRoute = require('./routes/renewal');
const schedular = require("./controller/schedular");
// const teacherRoute = require('./routes/teacher');

const app = express();

//Create bucket
createBucket();

app.use(cors());

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Models
const models = require('./models');

//Sync Database
models.sequelize.sync().then(function () {
  console.log("Nice! Database look nice")
}).catch(error => {
  console.log(error, "Something went wrong with the database Update!")
})
app.use(passport.initialize());
// require('./routes')(app);


app.use('/users', userRoute);
app.use('/parent', passportJWT, parentRoute);
app.use('/teacher', passportJWT, teacherRoute);
// app.use('/superadmin', passportJWT, guard.check('SUPER_ADMIN'), superAdminRoute)
app.use('/superadmin/teacher', passportJWT, superAdminRoute.teacher);
app.use('/superadmin/class', passportJWT, superAdminRoute.classes);
app.use('/admin/users', passportJWT, adminRoute.user);
app.use('/admin/teacher', passportJWT, adminRoute.teacher);
app.use('/admin/student', passportJWT, adminRoute.student);
app.use('/admin/class', passportJWT, adminRoute.classes);
app.use('/admin/annoucement', passportJWT, adminRoute.announcement);
app.use('/admin/support', passportJWT, adminRoute.support);
app.use('/admin/incident', passportJWT, adminRoute.incident);
app.use('/admin/locations', adminRoute.locations);
app.use('/admin/incident-type', adminRoute.incidentTypes);
app.use('/renewal', renewalRoute)



app.get('/', (req, res) => {
  return res.send('Welcome to Express app')
})
app.get('/file/:type/:id/:file_name/:token', function (req, res, next) {
  let token = req.params['token']
  var decoded = "";
  try {
    decoded = jwt_decode(token);
  } catch (error) {
    return res.send('Unauthorize')
  }
  if (decoded && decoded.user_role) {
    let file = path.join(__dirname, `uploads/${req.params['id']}`)//`${__dirname}/uploads/${req.params['id']}/${req.params['file_name']}`;
    if (req.params['type'] === 'resume') {
      file = path.join(__dirname, `resume/${req.params['id']}`)//`${__dirname}/resume/${req.params['id']}/${req.params['file_name']}`;
    }
    var options = {
      root: file,
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }

    var fileName = req.params['file_name'];
    res.sendFile(fileName, options, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('Sent:', fileName)
      }
    })
  } else {
    return res.send('Unauthorize')
  }
})
app.get('/download/:type/:id/:file_name/:token', function (req, res) {
  let token = req.params['token'];
  var decoded = "";
  try {
    decoded = jwt_decode(token);
  } catch (error) {
    return res.send('Unauthorize')
  }


  console.log("decoded : " + JSON.stringify(decoded));
  if (decoded && decoded.user_role) {
    let file = `${__dirname}/uploads/${req.params['id']}/${req.params['file_name']}`;
    if (req.params['type'] === 'resume') {
      file = `${__dirname}/resume/${req.params['id']}/${req.params['file_name']}`;
    }

    res.download(file, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("File downloaded Successfully");
      }
    });
  } else {
    return res.send('Unauthorize')
  }

});
app.get('*', (req, res) => {
  res.status(500).send({ message: 'Invalid API route' })
})


app.use(function (err, req, res, next) {
  if (err.code === 'permission_denied' || err.code === 'permissions_not_found') {
    res.status(403).send('Forbidden');
  }

  return res.status(400).json({ message: err.message });
});

//Start cron job to send email of renewal admission to parent
var task = cron.schedule('00 10 * * *', () => {
  console.log('Runing a job at 01:00');
  // Get expired data
  var options = {
    uri: `${CNST.SYSTEM_IP}renewal`,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
  };

  rp(options)
    .then(function (result) {
      console.log('Final Data of Renewal in App.js : ', result);
    })
    .catch(function (err) {
      // API call failed...
      console.log("failed", err)
    });


}, {
  scheduled: true,
  // timezone: "America/Sao_Paulo"
});

cron.schedule("36 4 * * *", function () {
  schedular.warningSchedularToExpiredStudentAdmissionDate();
});

var port = process.env.PORT || '3001';
app.set('port', port);

const server = app.listen(port, function () {
  console.log('Server listening on port ' + port);
});

// var server = http.createServer(app);
// server.listen(port); 
module.exports = app;