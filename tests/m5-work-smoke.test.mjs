// m5 smoke suite — wraps prime/evidence/scripts/m5-work-smoke.mjs (dev server on :4212, self-managed).
import { test } from 'node:test';
import { execFileSync } from 'node:child_process';

test('m5 work-smoke harness exits 0', { timeout: 100_000 }, () => {
  const out = execFileSync(process.execPath, ['prime/evidence/scripts/m5-work-smoke.mjs'], {
    encoding: 'utf8',
    timeout: 95_000,
    maxBuffer: 8 * 1024 * 1024,
  });
  const m = out.match(/^(\d+)\/(\d+) checks passed$/m);
  if (!m) throw new Error('no summary line in harness output');
  if (m[1] !== m[2]) throw new Error(`harness reported ${m[1]}/${m[2]}`);
});
