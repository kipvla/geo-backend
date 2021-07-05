import { Router } from 'express';
import { placeController } from '../controllers';

const placesRouter = Router();

placesRouter.post('/add', placeController.addPlace);
placesRouter.get('/', placeController.getPlaceFields);
placesRouter.post('/crowdsource', placeController.crowdSource);

export default placesRouter;
