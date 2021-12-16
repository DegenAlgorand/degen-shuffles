import { string } from "i/lib/util";


export function stripTags (str) {
  if (typeof str !== 'string') return str;
  return str.replace(/<\/?[^>]+(>|$)/g, '');
}


export function urlString (str) {
  if (str.startsWith('http://') || str.startsWith('https://')) 
    return str;
  return `https://${str}`;
}

export function twitterUrl (str) {
  return `https://twitter.com/${str.replace('@', '')}`
}