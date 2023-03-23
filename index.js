const express = require('express')
const { google } = require("googleapis");
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 4000
app.use(bodyParser())
app.use(cors())
app.use('/',express.static("build"))
app.get('*', function (req, res, next) {
  res.sendFile(path.resolve('./build/index.html'));
});




process.on('uncaughtException', function(err) {
  console.log(" UNCAUGHT EXCEPTION ");
  console.log(err.message);
});

app.post('/api/cinemafans', async function (req, res) {
  const {First_Name,Last_Name,Address,Address2,Pincode,Contact_Number,Email_id,dob,How_many_movies_do_you_watch_per_month,watch_in_the_Theaters,OTT_Platforms_like,ott,Film_Profile_and_Trailers,Film_Celebrity_Profile,choose,link,get_from_CinemaDBS,Are_you_interested } = req.body;
  
    const auth = new google.auth.GoogleAuth({
        keyFile: "cinemadbs-c252082084e7.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = "1duDnb57fqsVDxXgcZOb3gz0iA_T3iyukra0YQrsj5Iw"
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });
    
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1!A:A",
    });
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:Z",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[First_Name,Last_Name,Address,Address2,Pincode,Contact_Number,Email_id,dob,How_many_movies_do_you_watch_per_month,watch_in_the_Theaters,OTT_Platforms_like,ott,Film_Profile_and_Trailers,Film_Celebrity_Profile,choose,link,get_from_CinemaDBS,Are_you_interested ]],
        },
    });
  console.log(req.body)
    
      res.send("Successfully submitted! Thank you!");
})
app.post('/api/filmfratenity', async function (req, res) {
  const {First_Name,Last_Name,Original_Name,Address,Address2,Pincode,Email_id,dob,Work_Start_Date_in_the_Film_industry,Spouse_Name,Childrens,Title,Poster,Description,Video_Clip,Awards,Release_Date,link} = req.body;
  
    const auth = new google.auth.GoogleAuth({
        keyFile: "cinemadbs-c252082084e7.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = "1duDnb57fqsVDxXgcZOb3gz0iA_T3iyukra0YQrsj5Iw"
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });
    
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet2!A:A",
    });
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet2!A:Z",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[First_Name,Last_Name,Original_Name,Address,Address2,Pincode,Email_id,dob,Work_Start_Date_in_the_Film_industry,Spouse_Name,Childrens,Title,Poster,Description,Video_Clip,Awards,Release_Date,link]],
        },
    });
  console.log(req.body)
    
      res.send("Successfully submitted! Thank you!");
})

app.listen(PORT,( )=> {
   console.log(`server is runing on ${PORT}`);
})

/*  */