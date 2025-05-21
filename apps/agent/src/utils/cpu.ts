import * as os from 'os';

interface CPUStats {
  totalIdle: number;
  totalTick: number;
  avgIdle: number;
  avgTotal: number;
}

function average(): CPUStats {
  let totalIdle = 0;
  let totalTick = 0;
  const cpus = os.cpus();
  const cpuCount = cpus.length;

  for (let i = 0; i < cpuCount; i++) {
    const cpu = cpus[i];
    for (const type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  }

  return {
    totalIdle: totalIdle,
    totalTick: totalTick,
    avgIdle: totalIdle / cpus.length,
    avgTotal: totalTick / cpus.length,
  };
}

export function CPUUsage(interval: number): Promise<number> {
  return new Promise(function (resolve) {
    if (typeof interval !== 'number') {
      throw new TypeError('interval must be a number!');
    }

    const startMeasure = average();

    setTimeout(function () {
      const endMeasure = average();
      const idleDifference = endMeasure.avgIdle - startMeasure.avgIdle;
      const totalDifference = endMeasure.avgTotal - startMeasure.avgTotal;
      const cpuPercentage =
        (10000 - Math.round((10000 * idleDifference) / totalDifference)) / 100;

      return resolve(cpuPercentage);
    }, interval);
  });
}
