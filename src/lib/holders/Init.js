import algoClient from '../algoClient';

export default class Init {
  constructor () {
    this.all = [];
  }
  async init () {
    algoClient.onInit(this.getHolders.bind(this));
  }
}
