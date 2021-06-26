import { Request, Response } from 'express';
import Place from '../models/place';
import AWS from 'aws-sdk';
import shortid from 'shortid';
import moment from 'moment';

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
  let location = '';

  try {
    /* @ts-ignore */
    const { Location } = await s3.upload(params).promise();
    location = Location;
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

const placeController = { addPlace, getPlaceFields, uploadImage };
export default placeController;
