import Init from './Init';
import Connect from './Connect';
import Txn from './Txn';
import Indexer from './Indexer';
import Notes from './Notes';
import Errors from '../Errors';
import { aggregate } from '../../helpers/classes';

class AlgoClient extends aggregate(
  Init,
  Connect,
  Txn,
  Indexer,
  Notes,
  Errors,
) {}

export default new AlgoClient();