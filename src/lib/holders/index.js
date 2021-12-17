import Errors from '../Errors';

import Init from './Init';
import Read from './Read';
import Subscribe from './Subscribe';
import { aggregate } from '../../helpers/classes';


class Holders extends aggregate(
  Errors,
  Init,
  Read,
  Subscribe,
) {}

export default new Holders();