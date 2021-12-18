import Errors from '../Errors';
import Configs from './Configs';
import Create from './Create';
import Read from './Read';
import Update from './Update';
import OptIn from './OptIn';
import Picker from './Picker';
import Winners from './Winners';
import Subscribe from './Subscribe';
import { aggregate } from '../../helpers/classes';


export default class Shuffle extends aggregate(
  Errors,
  Configs, 
  Create,
  Read,
  Update,
  OptIn,
  Winners,
  Picker,
  Subscribe,
) {}