import Errors from '../Errors';
import Init from './Init';
import Connect from './Connect';
import Txn from './Txn';
import { aggregate } from '../../helpers/classes';

class AlgoClient extends aggregate(
  Init,
  Connect,
  Txn,
  Errors,
) {}

export default new AlgoClient();