import test from 'node:test';
import assert from 'node:assert/strict';
import { formatMonthYear } from '../src/lib/dates.ts';

// Deterministic date-format invariants for the About/Experience metadata.
// formatMonthYear is pure, so this file is safe to re-execute in the fast
// Phase-5 unit suite (no dev server, no browser).

test('formatMonthYear maps YYYY-MM to the short month + year', () => {
  assert.equal(formatMonthYear('2026-01'), 'Jan 2026');
  assert.equal(formatMonthYear('2026-09'), 'Sep 2026');
  assert.equal(formatMonthYear('2025-12'), 'Dec 2025');
});

test('formatMonthYear passes a bare year through unchanged', () => {
  assert.equal(formatMonthYear('2026'), '2026');
  assert.equal(formatMonthYear('2000'), '2000');
});

test('formatMonthYear renders every month index without an undefined token', () => {
  for (let m = 1; m <= 12; m++) {
    const value = `2026-${String(m).padStart(2, '0')}`;
    const out = formatMonthYear(value);
    assert.doesNotMatch(out, /undefined|NaN/, `bad render for ${value}: ${out}`);
    assert.match(out, /^[A-Z][a-z]{2} 2026$/, `unexpected shape for ${value}: ${out}`);
  }
});
