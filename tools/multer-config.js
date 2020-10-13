//node modules
const multer = require('multer');


//MIME_TYPES
const MIME_TYPES = {
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png'
};

let d = new Date();

// d.toLocaleString().split("/").join(".").split(",").join("_").split(" ").join("").split(":").join(".")  
// + "_" + req.session.user.username + MIME_TYPES[file.mimetype]


//******************************************************************************** */
//                                 Profile Avatar
//******************************************************************************** */

const profile_avatar_storage = multer.diskStorage(
{
    destination: function (req, file, callback) {  
        callback(null, 'public/images/profiles');
    },

    filename: function (req, file, callback) {  
        callback(null, Date.now() + "_" + req.session.user.username + MIME_TYPES[file.mimetype]);
    }
});


const upload_profile_avatar = multer(
{
    storage: profile_avatar_storage,

    fileFilter: function (req, file, callback) 
    {     
        //if no error
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
            return callback(null, true);
        }
           
        //if the extension of the file is NOT accepted
        return callback("Only JPEG, JPG or PNG files are allowed");
    }
});


//******************************************************************************** */
//                                Article Avatar
//******************************************************************************** */

const article_avatar_storage = multer.diskStorage(
{
    destination: function (req, file, callback) {  
        callback(null, 'public/images/articles');
    },

    filename: function (req, file, callback) {  
        callback(null, Date.now() + "_" + req.body.article_title + "_" + req.session.user.username + MIME_TYPES[file.mimetype]);
    }
});


const upload_article_avatar = multer(
{
    storage: article_avatar_storage,

    fileFilter: function (req, file, callback) 
    {     
        //if no error
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
            return callback(null, true);
        }
           
        //if the extension of the file is NOT accepted
        return callback("Only JPEG, JPG or PNG files are allowed");
    }
});



const UPLOADER = {
    Profile: upload_profile_avatar,
    Article: upload_article_avatar
}

module.exports = UPLOADER;
