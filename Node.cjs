//Sports Timer - Pauldin Bebla 2024
const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require("multer");
const image_size = require('image-size');
const port = 8080;

const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
  };

const app = express();
const upload = multer({ dest: "./public/images/" });

app.use(express.static(__dirname));
app.use(express.json());

//show the page
app.get("/", (req, res, next) => { 
  const _retfile = path.join(__dirname, 'scoreboard.html');
  res.sendFile(_retfile);
});
//retrieve logos
app.get("/homePic.png", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/images/homePic.png"));
});
app.get("/awayPic.png", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/images/awayPic.png"));
});

//update goal animation json files
app.post('/homeJSON', (req, res) => {
  updateJSON('./home.json', req, res);
});
app.post('/awayJSON', (req, res) => {
  updateJSON('./away.json', req, res);
});
app.post('/short-homeJSON', (req, res) => {
  updateJSON('./short_home.json', req, res);
});
app.post('/short-awayJSON', (req, res) => {
  updateJSON('./short_away.json', req, res);
});
app.post('/homePNG', upload.single('homeFile'), (req, res) => {
  updatePic("./public/images/homePic.png", req, res);
});
app.post('/awayPNG', upload.single('awayFile'), (req, res) => {
  updatePic("./public/images/awayPic.png", req, res);
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});

function updatePic(filePath, req, res) {
  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, filePath);
  if (path.extname(req.file.originalname).toLowerCase() === ".png") {
    fs.rename(tempPath, targetPath, err => {
      if (err) return handleError(err, res);

      var dimensions = image_size(targetPath);
      console.log(dimensions.width + ' ' + dimensions.height);
      res
        .status(200)
        .contentType("application/json")
        .json({"width": dimensions.width, "height": dimensions.height});
    });
  } else {
    fs.unlink(tempPath, err => {
      if (err) return handleError(err, res);

      res
        .status(403)
        .contentType("text/plain")
        .end("Only .png files are allowed!");
    });
  }
}

function updateJSON(fileName, req, res) {
    // read full config file:
    var src = fs.readFileSync(fileName);
    // convert src json text to js object
    var srcObj = JSON.parse(src);
    // convert req json text to js object
    var reqObj = req.body;
    // update the src with the new stuff in the req
    for(var prop in reqObj){
        srcObj[prop] = reqObj[prop];
    }

    // convert the updated src object back to JSON text
    var updatedJson = JSON.stringify(srcObj, null, 4);

    // write the updated src back down to the file system
    fs.writeFile(
        fileName,
        updatedJson,
        function (err) {
            if (err) {
                return console.error(err);
            }
            console.log('updated ' + fileName);
        }
    );

    res.send(updatedJson);
}