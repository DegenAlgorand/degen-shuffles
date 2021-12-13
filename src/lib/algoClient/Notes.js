import { Buffer } from 'buffer/';
export default class Notes {

  //
  // Encode
  // ----------------------------------------------
  encodeNote(str) {
    return this.algosdk.encodeObj(str);
  }

  //
  // Decode
  // ----------------------------------------------
  decodeNote(str) {
    if (!str) return;
    const buffer = Buffer.from(str, 'base64');
    return this.algosdk.decodeObj(buffer);
  }

}