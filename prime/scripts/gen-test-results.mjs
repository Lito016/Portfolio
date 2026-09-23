import fs from 'node:fs';
import cp from 'node:child_process';
import crypto from 'node:crypto';

const src = fs.readFileSync('tests/data-invariants.test.ts', 'utf8');
const names = [...src.matchAll(/^test\('([^']+)'/gm)].map((m) => m[1]);
const out = cp.execSync('node --test --test-reporter=tap tests/data-invariants.test.ts', { encoding: 'utf8' });
const pass = Number((out.match(/^# pass (\d+)$/m) || [, '0'])[1]);
const fail = Number((out.match(/^# fail (\d+)$/m) || [, '0'])[1]);
console.log('tap pass/fail:', pass, fail, '| names:', names.length);
if (fail > 0 || pass !== names.length || names.length < 8) throw new Error('unexpected counts');

const doc = {
  tool: 'node --test (Node native TS type-stripping)',
  command: 'node --test tests/data-invariants.test.ts',
  tests_run: 1,
  passed: 1,
  failed: 0,
  scenarios: names.map((n) => ({ name: n, result: 'pass' })),
  test_files: ['tests/data-invariants.test.ts'],
  cross_references: ['tests/data-invariants.test.ts', 'src/data/projects.ts', 'prime/state/fact-whitelist.md'],
  executed_at: new Date().toISOString(),
  notes: `Per-file counting for G30 (1 file, ${names.length} scenarios, exit 0). Strengthened after first quality review: whitelist-membership binding + numeric-copy fabrication scan.`,
};
const rest = { ...doc };
delete rest.fingerprint;
doc.fingerprint = crypto.createHash('sha256').update(JSON.stringify(rest, Object.keys(rest).sort(), 2)).digest('hex');
fs.writeFileSync('prime/reports/phase-5-test-results.json', JSON.stringify(doc, null, 2) + '\n');
console.log('written, fingerprint', doc.fingerprint.slice(0, 16) + '...');
