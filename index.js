import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourBearerToken = "1fa00744-daaf-4602-84b5-4d24f5ca2dec";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));






app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});



//GET
app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const response = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  }
});



//POST
app.post("/post-secret", async (req, res) => {
  try {
    const response = await axios.post(API_URL+'/secrets',req.body,config);
    res.render("index.ejs",{content: JSON.stringify(response.data)});
  } catch (error) {
    res.render("index.ejs",{content: JSON.stringify(response.data)});
  }
});



//PUT
app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  var data = {
    secret: req.body.secret,
    score : req.body.score
  };

  try {
    const response = await axios.put(API_URL+`/secrets/${searchId}`, data, config);
    res.render("index.ejs", {content: JSON.stringify(response.data)});
  } catch (error) {
    res.render("index.ejs",{content: JSON.stringify(response.data)});
  }

});



//PATCH
app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;

  try {
    const response = await axios.patch(API_URL+`/secrets/${searchId}`, req.body, config);
    res.render("index.ejs", {content: JSON.stringify(response.data)})
  } catch (error) {
    res.render("index.ejs", {content: JSON.stringify(response.data)});
  }

  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
});



//DELETE
app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;

  try {
    const response = await axios.delete(API_URL+`/secrets/${searchId}`, config);
    res.render("index.ejs", {content: JSON.stringify(response.data)});
  } catch (error) {
    res.render("index.ejs", {content: JSON.stringify(response.data)});
  }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
