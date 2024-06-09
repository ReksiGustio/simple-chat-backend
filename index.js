const express = require('express')
const multer = require('multer')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads')
  },
  filename: function (req, file, cb) {
      var getFileExt = function(fileName){
        var fileExt = fileName.split(".");
        if (fileExt.length === 1 || ( fileExt[0] === "" && fileExt.length === 2)) {
          return "";
        }
        return fileExt.pop();
      }
      cb(null, Date.now() + '.' + getFileExt(file.originalname))
  }
})


const upload = multer( { storage } )
const type = upload.single('profile_pic');
const app = express()
const port = 3000;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//route
app.get('/', (req, res) => {
  res.send('Simple Chat Backend by Gustio. Malas ngoding frontend web atau lebih tepatnya gak ngerti')
})

app.use('/', router)

//send image
app.post('/upload', type, function(req, res) {
  res.json(req.file)
})

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})