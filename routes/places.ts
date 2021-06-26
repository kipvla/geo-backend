import router from './';
import placeController from '../controllers/places';

router.post('/add', placeController.addPlace);

router.get('/', placeController.getPlaceFields);
