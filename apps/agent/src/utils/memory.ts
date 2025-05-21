import * as os from 'os';

export function MemoryUsage() {
  const freemem = os.freemem();
  const totalmem = os.totalmem();
  const freePercent = 100 * (freemem / totalmem);
  const usage = Number((100 - freePercent).toFixed(2));

  // console.log(freemem, totalmem, freePercent, usage);

  return usage;
}
