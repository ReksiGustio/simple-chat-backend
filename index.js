const express = require('express')
const multer = require('multer')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profile')
  },
  filename: function (req, file, cb) {
      const { userName } = req.params

      var getFileExt = function(fileName){
        var fileExt = fileName.split(".");
        if (fileExt.length === 1 || ( fileExt[0] === "" && fileExt.length === 2)) {
          return "";
        }
        return fileExt.pop();
      }
      cb(null, String(userName) + '-' + file.fieldname + '.' + getFileExt(file.originalname))
  }
})

const messageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/message')
  },
  filename: function (req, file, cb) {
      const sender = req.params.sender
      const receiver = req.params.receiver
      const id = req.params.id

      var getFileExt = function(fileName){
        var fileExt = fileName.split(".");
        if (fileExt.length === 1 || ( fileExt[0] === "" && fileExt.length === 2)) {
          return "";
        }
        return fileExt.pop();
      }
      cb(null, String(sender) + '-' + String(receiver) + '-' + String(id) + '-' + file.fieldname + '.' + getFileExt(file.originalname))
  }
})

const upload = multer( { storage: storage } )
const uploadMessage = multer( { storage: messageStorage } )

const type = upload.single('profile_pic');
const messageType = uploadMessage.single('message_pic');

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
app.post('/upload/profile/:userName', type, function(req, res) {
  res.json(req.file)
})

//send message image
app.post('/upload/message/:sender&:receiver&:id', messageType, function(req, res) {
  res.json(req.file)
})

//fetch image
app.use('/download/profile', express.static(__dirname + '/uploads/profile'))

//fetch message image
app.use('/download/message', express.static(__dirname + '/uploads/message'))

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})