import { Request, Response } from 'express';
import axios from 'axios';
import AWS from 'aws-sdk';
import shortid from 'shortid';
import moment from 'moment';
import dotenv from 'dotenv';
import { Place } from '../models/place';
import { getDMS2DD } from '../utils';

const piexif = require('piexifjs');

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ID,
  secretAccessKey: process.env.AWS_S3_SECRET,
});

const uploadImage = async (file: any, type: any) => {
  /* @ts-ignore */
  const base64Data = new Buffer.from(
    file.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  );

  const key = shortid.generate() + moment().valueOf();

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${key}.jpeg`,
    Body: base64Data,
    ContentEncoding: 'base64',
    ContentType: type,
    ACL: 'public-read',
  };

  try {
    /* @ts-ignore */
    const { Location } = await s3.upload(params).promise();
    let location = Location || '';
    return location;
  } catch (error) {
    console.log(error);
  }
};

/* TODO: express validator */
const addPlace = async (req: Request, res: Response) => {
  try {
    const { placeImages, title, latitude, longitude } = req.body;

    const arrayOfURL = [];

    for (let i = 0; i < placeImages.length; i++) {
      const { data, mime } = placeImages[i];
      const currentURL = await uploadImage(data, mime);
      arrayOfURL.push(currentURL);
    }

    await Place.create({ title, latitude, longitude, images: arrayOfURL });

    res.status(200).send('Add place...');
  } catch (e) {
    res.status(500).send('Internal Server Error!');
  }
};

const getPlaceFields = async (req: Request, res: Response) => {
  try {
    const filteredKeys = [
      {
        field: 'title',
        headerName: 'Title',
        type: 'string',
        required: true,
      },
      {
        field: 'latitude',
        headerName: 'Latitude',
        type: 'string',
        required: true,
      },
      {
        field: 'longitude',
        headerName: 'Longitude',
        type: 'string',
        required: true,
      },
      {
        field: 'placeImages',
        headerName: 'Place image',
        type: 'image',
        required: true,
      },
      { field: 'options', headerName: 'Options' },
    ];
    const tableOptions = { show: true, edit: true, delete: true };
    const entityName = 'course';
    const categoryName = 'Course';

    res.status(200).send({
      keysLabel: filteredKeys,
      tableOptions,
      entityName,
      categoryName,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal Server Error!');
  }
};

const crowdSource = async (req: Request, res: Response) => {
  try {
    const { placeImages, title, latitude, longitude } = req.body;

    const arrayOfURL = [];

    for (let i = 0; i < placeImages.length; i++) {
      const { data, mime } = placeImages[i];
      const { GPS } = piexif.load(data);
      if (Object.entries(GPS).length > 0) {
        const lat = getDMS2DD(
          GPS['2'][0][0],
          GPS['2'][1][0],
          GPS['2'][2][0] / 100,
          GPS['1']
        );
        const lon = getDMS2DD(
          GPS['4'][0][0],
          GPS['4'][1][0],
          GPS['4'][2][0] / 100,
          GPS['3']
        );
        console.log('LAT: ', lat);
        console.log('LONG: ', lon);

        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
        const response = await axios.get(url);
        console.log(response);
      } else {
        res.status(400).json({ msg: 'No GPS co-ordinates could be found :(' });
      }

      //console.log(exIfObject);
      // const currentURL = await uploadImage(data, mime);
      // arrayOfURL.push(currentURL);
    }

    // await Place.create({ title, latitude, longitude, images: arrayOfURL });

    res.status(200).json({ msg: 'Thanks for your contribution!...' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: 'Internal Server Error!' });
  }
};

export const placeController = {
  addPlace,
  crowdSource,
  getPlaceFields,
  uploadImage,
};
