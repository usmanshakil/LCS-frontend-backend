const AWS = require('aws-sdk');
const fs = require('fs');
var multiparty = require('multiparty');
const async = require('async');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESSKEY
})
const bucketConfig = {
  Bucket: process.env.BUCKET_NAME,
  CreateBucketConfiguration: {
    LocationConstraint: process.env.BUCKET_LOCATION_CONSTRAINT
  }
}
const checkBucketExists = async bucket => {
  const options = {
    Bucket: process.env.BUCKET_NAME,
  };
  try {
    await s3.headBucket(options).promise();
    return true;
  } catch (error) {
    if (error.statusCode === 400) {
      return false;
    }
    throw error;
  }
};
createBucket = async () => {
  try {
    const isExist = await checkBucketExists();
    if (!isExist) {
      s3.createBucket(bucketConfig, (err, data) => {
        if (err) {
          console.log("Erro creating Bucket in S3 : " + err.stack)
        }
        else {
          console.log('Bucket created successfully', data.Location)
        }
      })
    }
    else {
      console.log('Bucket already exist')
    }
  } catch (err) {
    console.log(err)
  }

}
const imageUpload = async (base64, userId) => {

  // Ensure that you POST a base64 data to your server.
  // Let's assume the variable "base64" is one.
  const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');

  // Getting the file type, ie: jpeg, png or gif
  const type = base64.split(';')[0].split('/')[1];
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `${userId}.${type}`, // type is not required
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64', // required
    ContentType: `image/${type}` // required. Notice the back ticks
  }

  let location = '';
  let key = '';
  try {
    const { Location, Key } = await s3.upload(params).promise();
    location = Location;
    key = Key;
  } catch (error) {
    // console.log(error)
  }

  return location;
}
const mediaUploadToS3 = async (file, keyName) => {
  const type = file.mimetype.split('/')[1];
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `${keyName}.${type}`, // type is not required
    Body: file.buffer,
    ACL: 'public-read',
    ContentType: file.mimetype // required. Notice the back ticks
  }

  let retObj = {};
  try {
    const { Key } = await s3.upload(params).promise();
    if (Key) {
      retObj.uuid = keyName;
      retObj.extension = `.${type}`;
      retObj.type = file.mimetype.split('/')[0];
    }
  } catch (error) {
    throw error
  }
  return retObj;
}
var documentUpload = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      var result = [];
      var form = new multiparty.Form();
      form.parse(req, async function (err, fields, files) {
        let fileData = files.files;
        let id = fields.id[0];
        let type = fields.type[0];
        // for (var i = 0; i < fileData.length; i++) {
        let folder_name = '/../uploads/' + id + '/';
        if (type === 'resume') {
          folder_name = '/../resume/' + id + '/';
        }
        let dir = __dirname + folder_name;
        if (!fs.existsSync(dir)) {
          await fs.mkdirSync(dir);
        }
        async.eachSeries(fileData, function (fileData, cb) {
          fs.readFile(fileData.path, function (err, data) {
            console.log(err + "-----" + data)
            if (err) {
              cb(err)
            } else {
              fs.writeFile(dir + fileData.originalFilename, data, function (err) {
                console.log("error : " + err)
                if (err) {
                  cb(err)
                }
                else {
                  result.push(fileData.originalFilename);
                  cb();
                }
              })
            }
          })
          // fs.renameSync(fileData.path, folder_name + fileData.originalFilename, (err) => {
          //   if (err) {
          //     console.log("error : " + err.message)
          //     cb(err)
          //   }
          //   else {
          //     result.push(fileData.originalFilename);
          //     cb()
          //   }
          // })

          // var buffer = fs.readFileSync(fileData.path);
          // var params = {
          //   Bucket: process.env.BUCKET_NAME,
          //   Key: fileData.originalFilename, //file.name doesn't exist as a property
          //   Body: buffer,
          //   ACL: 'public-read',
          //   ContentType: fileData.headers['content-type']
          // };
          // s3.upload(params, function (err, data) {
          //   if (err) {
          //     console.log('ERROR MSG: ', err);
          //     cb(err)
          //   }
          //   else {
          //     result.push(data.Location);
          //       console.log('Successfully uploaded data === ', data.Location);
          //       cb()
          //   }
          // });
        }, function (err) {
          if (err) reject(err)
          else resolve(result)
        })
      })
    } catch (err) {
      reject(err)
    }


  })

}
module.exports = { createBucket, imageUpload, documentUpload, mediaUploadToS3 };

// uploadFile = () =>{
//     s3.createBucket()
// }