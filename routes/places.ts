import { Router } from 'express';
import { placeController } from '@controller';

const placesRouter = Router();

placesRouter.post('/add', placeController.addPlace);
placesRouter.get('/', placeController.getPlaceFields);

export default placesRouter;
