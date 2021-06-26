import { Router } from 'express';
const placesRouter = Router();
import placeController from '../controllers/places';

placesRouter.post('/add', placeController.addPlace);

placesRouter.get('/', placeController.getPlaceFields);
export default placesRouter;
