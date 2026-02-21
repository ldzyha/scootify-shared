#!/usr/bin/env tsx
/**
 * Generate Data Quality Report
 * 
 * Analyzes all products in the database and generates completeness
 * and quality scores.
 */

import { writeFileSync } from 'fs';
import {
  generateCompletenessReport,
  generateQualityReport,
  getDatabaseQualitySummary,
  validateProduct,
  validateScooter,
  validateAccessory,
} from './src/db/validators';
import { products, scooters, accessories } from './src/db';
import type { Scooter } from './src/db/schema';

console.log('📊 Generating Data Quality Report...\n');
console.log('='.repeat(80));

// =============================================================================
// VALIDATION RESULTS
// =============================================================================

console.log('\n✅ VALIDATION RESULTS');
console.log('-'.repeat(80));

let validProducts = 0;
let invalidProducts = 0;
const validationIssues: Array<{ product: string; errors: string[]; warnings: string[] }> = [];

products.forEach(product => {
  let result;
  
  if (product.productType === 'scooter') {
    result = validateScooter(product as Scooter);
  } else {
    result = validateAccessory(product as any);
  }

  if (result.valid) {
    validProducts++;
  } else {
    invalidProducts++;
  }

  if (result.errors.length > 0 || result.warnings.length > 0) {
    validationIssues.push({
      product: product.name,
      errors: result.errors,
      warnings: result.warnings,
    });
  }
});

console.log(`Valid products: ${validProducts}/${products.length}`);
console.log(`Invalid products: ${invalidProducts}/${products.length}`);
console.log(`Products with warnings: ${validationIssues.filter(i => i.warnings.length > 0).length}`);

if (validationIssues.length > 0) {
  console.log('\nIssues found:');
  validationIssues.slice(0, 5).forEach(issue => {
    console.log(`\n  ${issue.product}:`);
    if (issue.errors.length > 0) {
      console.log(`    ❌ Errors: ${issue.errors.join(', ')}`);
    }
    if (issue.warnings.length > 0) {
      console.log(`    ⚠️  Warnings: ${issue.warnings.join(', ')}`);
    }
  });
  if (validationIssues.length > 5) {
    console.log(`\n  ... and ${validationIssues.length - 5} more products with issues`);
  }
}

// =============================================================================
// DATABASE SUMMARY
// =============================================================================

console.log('\n📈 DATABASE QUALITY SUMMARY');
console.log('-'.repeat(80));

const summary = getDatabaseQualitySummary();

console.log(`Total products: ${summary.totalProducts}`);
console.log(`  - Scooters: ${summary.totalScooters}`);
console.log(`  - Accessories: ${summary.totalAccessories}`);
console.log(`\nAverage quality score: ${summary.averageQualityScore}/100`);
console.log(`Average completeness: ${summary.averageCompleteness}%`);

console.log('\nGrade distribution:');
(['A', 'B', 'C', 'D', 'F'] as const).forEach(grade => {
  const count = summary.gradeDistribution[grade] || 0;
  const percent = Math.round((count / summary.totalProducts) * 100);
  const bar = '█'.repeat(Math.floor(percent / 5));
  console.log(`  ${grade}: ${count.toString().padStart(2)} products (${percent.toString().padStart(2)}%) ${bar}`);
});

console.log('\nTop 10 products by quality:');
summary.topProducts.forEach((p, i) => {
  console.log(`  ${(i + 1).toString().padStart(2)}. ${p.name.padEnd(50)} ${p.score}/100 (${p.grade})`);
});

if (summary.lowestProducts.length > 0 && summary.lowestProducts[0].score < 80) {
  console.log('\nLowest 10 products by quality:');
  summary.lowestProducts.forEach((p, i) => {
    console.log(`  ${(i + 1).toString().padStart(2)}. ${p.name.padEnd(50)} ${p.score}/100 (${p.grade})`);
  });
}

// =============================================================================
// COMPLETENESS BREAKDOWN
// =============================================================================

console.log('\n📋 COMPLETENESS BREAKDOWN');
console.log('-'.repeat(80));

const completenessReport = generateCompletenessReport();

// Group by completeness ranges
const ranges = {
  '90-100%': completenessReport.filter(c => c.completenessPercent >= 90).length,
  '80-89%': completenessReport.filter(c => c.completenessPercent >= 80 && c.completenessPercent < 90).length,
  '70-79%': completenessReport.filter(c => c.completenessPercent >= 70 && c.completenessPercent < 80).length,
  '60-69%': completenessReport.filter(c => c.completenessPercent >= 60 && c.completenessPercent < 70).length,
  'Below 60%': completenessReport.filter(c => c.completenessPercent < 60).length,
};

Object.entries(ranges).forEach(([range, count]) => {
  const percent = Math.round((count / completenessReport.length) * 100);
  const bar = '█'.repeat(Math.floor(percent / 5));
  console.log(`  ${range.padEnd(10)}: ${count.toString().padStart(2)} products (${percent.toString().padStart(2)}%) ${bar}`);
});

// =============================================================================
// QUALITY BREAKDOWN BY CATEGORY
// =============================================================================

console.log('\n🏆 QUALITY BY CATEGORY');
console.log('-'.repeat(80));

const qualityReport = generateQualityReport();

// By product type
const scooterScores = qualityReport.filter(q => products.find(p => p.id === q.productId)?.productType === 'scooter');
const accessoryScores = qualityReport.filter(q => products.find(p => p.id === q.productId)?.productType === 'accessory');

console.log(`Scooters average: ${Math.round(scooterScores.reduce((s, q) => s + q.overallScore, 0) / scooterScores.length)}/100`);
console.log(`Accessories average: ${Math.round(accessoryScores.reduce((s, q) => s + q.overallScore, 0) / accessoryScores.length)}/100`);

// By domain
console.log('\nBy domain:');
const domains = ['hiley.com.ua', 'hysco.com.ua', 'nami.com.ua', 'scootify.com.ua'];
domains.forEach(domain => {
  const domainProducts = products.filter(p => p.domains.includes(domain as any));
  const domainScores = qualityReport.filter(q => 
    domainProducts.some(p => p.id === q.productId)
  );
  const avgScore = Math.round(domainScores.reduce((s, q) => s + q.overallScore, 0) / domainScores.length);
  console.log(`  ${domain.padEnd(20)}: ${avgScore}/100 (${domainScores.length} products)`);
});

// =============================================================================
// EXPORT REPORTS
// =============================================================================

console.log('\n💾 EXPORTING REPORTS');
console.log('-'.repeat(80));

// Export JSON reports
const reports = {
  summary,
  completeness: completenessReport,
  quality: qualityReport,
  validation: validationIssues,
  generatedAt: new Date().toISOString(),
};

writeFileSync(
  'data-quality-report.json',
  JSON.stringify(reports, null, 2)
);
console.log('✓ JSON report saved to: data-quality-report.json');

// Export Markdown report
const markdown = `# Data Quality Report

Generated: ${new Date().toISOString()}

## Summary

- **Total Products**: ${summary.totalProducts} (${summary.totalScooters} scooters + ${summary.totalAccessories} accessories)
- **Average Quality Score**: ${summary.averageQualityScore}/100
- **Average Completeness**: ${summary.averageCompleteness}%
- **Valid Products**: ${validProducts}/${products.length}

## Grade Distribution

| Grade | Count | Percentage |
|-------|-------|------------|
${(['A', 'B', 'C', 'D', 'F'] as const).map(grade => {
  const count = summary.gradeDistribution[grade] || 0;
  const percent = Math.round((count / summary.totalProducts) * 100);
  return `| ${grade} | ${count} | ${percent}% |`;
}).join('\n')}

## Top 10 Products by Quality

| Rank | Product | Score | Grade |
|------|---------|-------|-------|
${summary.topProducts.map((p, i) => `| ${i + 1} | ${p.name} | ${p.score}/100 | ${p.grade} |`).join('\n')}

## Completeness Breakdown

| Range | Count | Percentage |
|-------|-------|------------|
${Object.entries(ranges).map(([range, count]) => {
  const percent = Math.round((count / completenessReport.length) * 100);
  return `| ${range} | ${count} | ${percent}% |`;
}).join('\n')}

## Quality by Domain

| Domain | Average Score | Products |
|--------|---------------|----------|
${domains.map(domain => {
  const domainProducts = products.filter(p => p.domains.includes(domain as any));
  const domainScores = qualityReport.filter(q => 
    domainProducts.some(p => p.id === q.productId)
  );
  const avgScore = Math.round(domainScores.reduce((s, q) => s + q.overallScore, 0) / domainScores.length);
  return `| ${domain} | ${avgScore}/100 | ${domainScores.length} |`;
}).join('\n')}

## Validation Issues

${validationIssues.length === 0 ? 'No validation issues found! 🎉' : `
Found ${validationIssues.length} products with issues:

${validationIssues.map(issue => `
### ${issue.product}

${issue.errors.length > 0 ? `**Errors:**\n${issue.errors.map(e => `- ❌ ${e}`).join('\n')}` : ''}
${issue.warnings.length > 0 ? `**Warnings:**\n${issue.warnings.map(w => `- ⚠️  ${w}`).join('\n')}` : ''}
`).join('\n')}
`}
`;

writeFileSync('DATA_QUALITY_REPORT.md', markdown);
console.log('✓ Markdown report saved to: DATA_QUALITY_REPORT.md');

console.log('\n' + '='.repeat(80));
console.log('✅ Report generation complete!\n');
