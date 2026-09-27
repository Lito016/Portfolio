// Convert node --test TAP output into the G30 oracle's test-results JSON shape.
// The oracle re-executes each test_files entry with `node --test <file>` and
// compares FILE-level counts, so tests_run/passed/failed are file counts;
// subtest totals ride along in `subtests` for honesty.
import { readFileSync, writeFileSync } from 'node:fs';

const tapPath = process.argv[2];
const outPath = process.argv[3];
const files = process.argv.slice(4);

const tap = readFileSync(tapPath, 'utf8');
const plan = (label) => {
  const m = tap.match(new RegExp(`^# ${label} (\\d+)$`, 'm'));
  if (!m) throw new Error(`TAP plan line "# ${label} N" not found`);
  return Number(m[1]);
};
const subtests = { tests: plan('tests'), pass: plan('pass'), fail: plan('fail') };
if (subtests.fail !== 0) {
  console.error(`refusing to write a pass receipt: TAP reports ${subtests.fail} failing subtests`);
  process.exit(1);
}

writeFileSync(
  outPath,
  JSON.stringify(
    {
      tool: 'node:test (node --test, --test-concurrency=1)',
      command: `node --test --test-concurrency=1 ${files.join(' ')}`,
      tests_run: files.length,
      passed: files.length,
      failed: 0,
      test_files: files,
      subtests,
      note: 'tests_run/passed/failed are file-level counts to match the re-execution oracle; subtests carries the 13-case detail.',
    },
    null,
    2,
  ) + '\n',
);
console.log(`wrote ${outPath}: ${files.length}/${files.length} files pass (${subtests.tests} subtests, ${subtests.pass} pass)`);
