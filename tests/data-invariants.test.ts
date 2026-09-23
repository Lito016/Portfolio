import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  hostedProjects,
  featuredProjects,
  otherProjects,
  categoryLabels,
  whatIBuildCategories,
} from '../src/data/projects.ts';

test('slugs are unique and kebab-case', () => {
  const slugs = hostedProjects.map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length, 'duplicate slug found');
  for (const slug of slugs) {
    assert.match(slug, /^[a-z0-9]+(-[a-z0-9]+)*$/, `bad slug: ${slug}`);
  }
});

test('featured flag and caseStudy are consistent (union contract)', () => {
  for (const project of hostedProjects) {
    if (project.featured) {
      assert.ok(project.caseStudy, `featured project without case study: ${project.slug}`);
    } else {
      assert.equal(project.caseStudy, undefined, `non-featured project carries case study: ${project.slug}`);
    }
  }
  assert.equal(featuredProjects.length + otherProjects.length, hostedProjects.length);
});

test('links and assets are empty-string-or-valid (no dead anchors, no empty <Image> src)', () => {
  for (const project of hostedProjects) {
    assert.ok(project.url === '' || project.url.startsWith('https://'), `non-https url: ${project.slug}`);
    assert.ok(project.image === '' || project.image.startsWith('/'), `non-root image path: ${project.slug}`);
    for (const link of project.links) {
      assert.ok(['GitHub', 'Live Demo', 'Docs'].includes(link.label), `unexpected link label: ${link.label}`);
      assert.ok(link.url.startsWith('https://'), `non-https link: ${project.slug} ${link.url}`);
    }
  }
});

test('every metric fact is whitelist-traceable: W-id exists in the whitelist and its entry carries the fact', () => {
  const whitelist = readFileSync('prime/state/fact-whitelist.md', 'utf8');
  const declaredIds = new Set([...whitelist.matchAll(/\bW(\d+)\b/g)].map((m) => `W${m[1]}`));
  assert.ok(declaredIds.size >= 20, `whitelist parse degenerate: only ${declaredIds.size} ids found`);
  const lines = whitelist.split('\n');
  for (const project of featuredProjects) {
    for (const metric of project.caseStudy.metrics) {
      assert.match(metric.source, /^W\d+$/, `metric not whitelisted: ${project.slug} "${metric.value} ${metric.label}" source=${metric.source}`);
      assert.ok(declaredIds.has(metric.source), `metric cites undeclared whitelist id ${metric.source}: ${project.slug} "${metric.value} ${metric.label}"`);
      const entryLines = lines.filter((l) => new RegExp(`\\b${metric.source}\\b`).test(l));
      assert.ok(entryLines.length > 0, `no whitelist entry text for ${metric.source}`);
      const bound = entryLines.some(
        (l) => l.includes(metric.value) || l.toLowerCase().includes(metric.label.toLowerCase())
      );
      assert.ok(bound, `whitelist ${metric.source} entries do not carry value "${metric.value}" or label "${metric.label}" (${project.slug})`);
      assert.ok(metric.value.trim().length > 0 && metric.label.trim().length > 0, `empty metric on ${project.slug}`);
    }
  }
});

test('numeric tokens in visible project copy are all whitelist-mapped (no invented numbers)', () => {
  const ALLOWED = new Map([['49', 'W2'], ['16', 'W3']]);
  const corpus: string[] = [];
  const collect = (s: string | undefined) => {
    if (s) corpus.push(s);
  };
  for (const c of whatIBuildCategories) {
    collect(c.title);
    collect(c.blurb);
    c.examples.forEach(collect);
  }
  for (const project of hostedProjects) {
    collect(project.name);
    collect(project.description);
    project.highlights.forEach(collect);
    const cs = 'caseStudy' in project ? project.caseStudy : undefined;
    if (!cs) continue;
    collect(cs.overview);
    collect(cs.problem);
    collect(cs.users);
    collect(cs.solution);
    collect(cs.architectureNote);
    collect(cs.dataDesign);
    collect(cs.testing);
    collect(cs.security);
    cs.workflow?.forEach((n) => {
      collect(n.label);
      collect(n.detail);
    });
    cs.architecture.forEach((g) => {
      collect(g.label);
      g.nodes.forEach((n) => {
        collect(n.label);
        collect(n.detail);
      });
    });
    cs.features?.forEach((f) => {
      collect(f.name);
      collect(f.description);
    });
    cs.challenges?.forEach((c) => {
      collect(c.problem);
      collect(c.resolution);
    });
    cs.decisions?.forEach((d) => {
      collect(d.choice);
      collect(d.rationale);
    });
    cs.metrics.forEach((m) => {
      collect(m.value);
      collect(m.label);
    });
  }
  assert.ok(corpus.length > 50, 'copy corpus unexpectedly small — guard would run vacuously');
  let numericFound = 0;
  for (const text of corpus) {
    for (const m of text.matchAll(/\b\d+\b/g)) {
      numericFound += 1;
      const source = ALLOWED.get(m[0]);
      assert.ok(source, `unguarded numeric token "${m[0]}" in visible copy (add to whitelist + ALLOWED map): "${text.slice(0, 80)}"`);
    }
  }
  assert.ok(numericFound >= 4, `numeric scan found only ${numericFound} tokens — corpus likely wrong`);
});

test('diagram node ids are unique per project and per lane', () => {
  for (const project of featuredProjects) {
    const cs = project.caseStudy;
    if (cs.workflow) {
      const ids = cs.workflow.map((n) => n.id);
      assert.equal(new Set(ids).size, ids.length, `duplicate workflow node id: ${project.slug}`);
    }
    for (const group of cs.architecture) {
      const ids = group.nodes.map((n) => n.id);
      assert.equal(new Set(ids).size, ids.length, `duplicate architecture node id: ${project.slug}/${group.label}`);
    }
  }
});

test('categories cover the three positioning domains and What I Build uses them', () => {
  assert.deepEqual(Object.keys(categoryLabels).sort(), [
    'ai-developer-tools',
    'business-systems',
    'computer-vision-automation',
  ]);
  assert.deepEqual(
    whatIBuildCategories.map((c) => c.category).sort(),
    Object.keys(categoryLabels).sort()
  );
  for (const category of whatIBuildCategories) {
    assert.ok(category.examples.length >= 3, `too few examples: ${category.category}`);
    assert.ok(category.title === categoryLabels[category.category], `title drift: ${category.category}`);
    assert.ok(category.blurb.trim().length > 0);
  }
});

test('every project has a category in the positioning taxonomy', () => {
  const valid = new Set(Object.keys(categoryLabels));
  for (const project of hostedProjects) {
    assert.ok(valid.has(project.category), `unknown category: ${project.slug} ${project.category}`);
    assert.ok(project.highlights.length <= 6, `too many highlights: ${project.slug}`);
    assert.ok(!/web application for managing/i.test(project.description), `generic description: ${project.slug}`);
  }
});
