import fs from 'node:fs';
import crypto from 'node:crypto';

const review = fs.readFileSync('prime/reports/phase-5-quality-review.md', 'utf8');
const receipt = JSON.parse(fs.readFileSync('prime/reports/phase-5-test-receipt.json', 'utf8'));
const verdict = (review.match(/verdict:\s*(pass|block|request changes)/i) || [, 'missing'])[1];
const citations = [...review.matchAll(/[\w\-./]+\.(ts|tsx|js|jsx|json|css|md)\b/g)].length;
const meta = {
  review_file: 'prime/reports/phase-5-quality-review.md',
  review_sha256: crypto.createHash('sha256').update(review).digest('hex'),
  verdict,
  char_count: review.length,
  path_citation_tokens: citations,
  chained_test_receipt_invocation: receipt.invocation_id,
  chained_test_receipt_nonce: receipt.nonce,
  captured_at: new Date().toISOString(),
};
fs.writeFileSync('prime/reports/phase-5-review-meta.json', JSON.stringify(meta, null, 2) + '\n');
console.log('review captured:', JSON.stringify(meta, null, 1));
