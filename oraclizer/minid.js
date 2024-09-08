const express = require('express');

const app = express();
const port = 3001;

app.use(express.json());


//HERE
var known_addresses = [];

function start_minid()
//HERE
{

}


app.post('/upload', upload.single('file'), async (req, res) => {
  /*try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = new File([req.file.buffer], req.file.originalname, { type: req.file.mimetype });
    const upload = await pinata.upload.file(file);
    res.json({ 
      success: true, 
      cid: upload.IpfsHash,
      name: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during file upload' });
  }*/
});

app.get('/file/:cid', async (req, res) => {
  /*try {
    const { cid } = req.params;
    const data = await pinata.gateways.get(cid);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the file' });
  }*/
});

app.get('/signed-url/:cid', async (req, res) => {
  /*try {
    const { cid } = req.params;
    const url = await pinata.gateways.createSignedURL({
      cid: cid,
      expires: 1800, // URL expires in 30 minutes
    });
    res.json({ url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the signed URL' });
  }*/
});

app.listen(port, () => {
  console.log(`Pinata app listening at http://localhost:${port}`);
});
