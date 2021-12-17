import Errors from '../Errors';
import Init from './Init';
import Read from './Read';
import Update from './Update';
import Subscribe from './Subscribe';
import { aggregate } from '../../helpers/classes';


class Shuffles extends aggregate(
  Errors,
  Init,
  Read,
  Update,
  Subscribe,
) {}

export default new Shuffles();