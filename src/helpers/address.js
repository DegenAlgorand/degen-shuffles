
export function shortenAddress (address, length = 5, glue = '...') {
  const start = address.substring(0, length);
  const end = address.substring(address.length - length);
  return `${start}${glue}${end}`;
}