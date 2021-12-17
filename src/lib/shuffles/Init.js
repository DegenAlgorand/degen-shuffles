import algoClient from '../algoClient';

export default class Init {
  constructor () {
    this.all = [];
  }
  
  init() {
    algoClient.onInit(this.getAllShuffles.bind(this));
  }
}
