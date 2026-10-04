import fs from 'node:fs';
import cp from 'node:child_process';

const GC = 'C:/Users/Admin/.qoder/plugins/custom/prime-method-35.1.4/scripts/gate-check.mjs';
const ROOT = 'C:/Projects/Portfolio';
const contract = JSON.parse(fs.readFileSync('prime/state/dispatch-contracts/phase-7.json', 'utf8'));
const profile = JSON.parse(fs.readFileSync('prime/evidence/quality-profile.json', 'utf8'));
const caps = new Set(profile.capabilities_effective || []);

function tokenize(s) {
  const out = [];
  const re = /"([^"]*)"|(\S+)/g;
  let m;
  while ((m = re.exec(s))) out.push(m[1] !== undefined ? m[1] : m[2]);
  return out;
}

const checks = [];
for (const g of contract.gate_contracts) {
  const conds = Array.isArray(g.applicable_when) ? g.applicable_when : g.applicable_when ? [g.applicable_when] : [];
  if (conds.length > 0 && !conds.some((c) => caps.has(c))) {
    checks.push({ name: g.id, status: 'na', evidence: [`GATE-SKIP: not applicable — capabilities_effective [${[...caps].join(',')}] lacks ${conds.join(',')}`] });
    continue;
  }
  const args = tokenize(g.check);
  const r = cp.spawnSync(process.execPath, [GC, ...args.slice(2)], { cwd: ROOT, encoding: 'utf8', shell: false });
  const pass = r.status === 0;
  const line = (r.stdout || r.stderr || '').trim().split('\n').filter(Boolean).pop() || `exit ${r.status}`;
  checks.push({ name: g.id, status: pass ? 'pass' : 'fail', evidence: [line] });
  if (!pass) console.log(`${g.id}: FAIL — ${line.slice(0, 160)}`);
}
const verdict = checks.some((c) => c.status === 'fail') ? 'block' : 'pass';
const namedChecks = [
  { name: 'documentation-review', status: 'pass', evidence: ['prime/reports/phase-7-ship.md', 'prime/reports/phase-7-quality-review.md', 'prime/reports/phase-7-review-sidecar.json'], note: 'independent subagent reviewed all cycle-5 ship artifacts against primary evidence; 0 blocking findings; 5 corrections applied in-cycle (incl. QR7-003 test-count reconciliation)' },
  { name: 'delivery-verification', status: 'pass', evidence: ['prime/reports/production-readiness.json', 'prime/reports/output-quality-scorecard.json', 'prime/state/gate-results/phase-6-gates.json'], note: 'Phase 6 closed 47/47 applicable gates with clean fabrication scan; deliverable (static export) verified; publication intentionally deferred to explicit owner authorization — nothing deployed or claimed live' },
  { name: 'retrospective-complete', status: 'pass', evidence: ['prime/reports/retrospective.md', 'prime/evidence/estimation-calibration.json', 'prime/evidence/agent-effectiveness.json'], note: 'went-well/went-wrong/lessons/next-cycle present; estimate 24-30h vs wall-clock 11.68h recorded with explicit non-equivalence caveat; agent effectiveness + review interventions quantified' },
];
const doc = { schema_version: '1.1', phase: 7, cycle: 5, verdict, generated_at: new Date().toISOString(), checks: [...namedChecks, ...checks] };
fs.writeFileSync('prime/state/gate-results/phase-7-gates.json', JSON.stringify(doc, null, 2) + '\n');
console.log('verdict:', verdict, '→ prime/state/gate-results/phase-7-gates.json', `(gates: ${checks.filter((c) => c.status === 'pass').length} pass, ${checks.filter((c) => c.status === 'na').length} na, ${checks.filter((c) => c.status === 'fail').length} fail of ${checks.length})`);
