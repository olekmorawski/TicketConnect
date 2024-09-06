import express from 'express';
import { PinataSDK } from 'pinata';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

const app = express();
const port = 3001;

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.PINATA_GATEWAY,
});

const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = new File([req.file.buffer], req.file.originalname, { type: req.file.mimetype });
    const upload = await pinata.upload.file(file);
    res.json(upload);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during file upload' });
  }
});

app.get('/file/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const data = await pinata.gateways.get(cid);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the file' });
  }
});

// Route to create a signed URL
app.get('/signed-url/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const url = await pinata.gateways.createSignedURL({
      cid: cid,
      expires: 1800, // URL expires in 30 minutes
    });
    res.json({ url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the signed URL' });
  }
});

app.listen(port, () => {
  console.log(`Pinata app listening at http://localhost:${port}`);
});