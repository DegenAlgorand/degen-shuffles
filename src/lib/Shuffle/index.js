import Errors from '../Errors';
import Configs from './Configs';
import Create from './Create';
import Read from './Read';
import Update from './Update';
import Subscribe from './Subscribe';
import { aggregate } from '../../helpers/classes';


/**
 * Shuffle
 * @prop {object}   configs 
 * @prop {array}    errors
 * @prop {boolean}  hasErrors
 */

export default class Shuffle extends aggregate(
  Errors,
  Configs, 
  Create,
  Update,
  Read,
  Subscribe,
) {}