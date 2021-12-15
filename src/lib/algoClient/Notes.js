import { Buffer } from 'buffer/';
export default class Notes {

  //
  // Encode
  // ----------------------------------------------
  encodeNote(obj) {
    obj = {...obj};
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'boolean') obj[key] = value.toString();
    });
    return this.algosdk.encodeObj(obj);
  }

  //
  // Decode
  // ----------------------------------------------
  decodeNote(str) {
    if (!str) return;
    const buffer = Buffer.from(str, 'base64');
    const obj = this.algosdk.decodeObj(buffer);
    Object.entries(obj).forEach(([key, value]) => {
      if (value === 'true') obj[key] = true;
      else if (value === 'false') obj[key] = false;
    });
    return obj;
  }

}