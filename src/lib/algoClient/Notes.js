import { Buffer } from 'buffer/';
export default class Notes {

  //
  // Encode
  // ----------------------------------------------
  encodeNote(str) {
    return this.msgpack.encode(str);
  }

  //
  // Decode
  // ----------------------------------------------
  decodeNote(str) {
    const buffer = Buffer.from(str, 'base64');
    return this.msgpack.decode(buffer);
  }

}