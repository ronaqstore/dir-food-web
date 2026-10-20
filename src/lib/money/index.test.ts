import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { formatPkr, fromPaisa, toPaisa } from './index.ts';

describe('money helpers', () => {
  it('converts rupees to paisa integer correctly', () => {
    assert.equal(toPaisa(500), 50000);
    assert.equal(toPaisa(0), 0);
    assert.equal(toPaisa(120.5), 12050);
  });

  it('converts paisa integer to rupees correctly', () => {
    assert.equal(fromPaisa(50000), 500);
    assert.equal(fromPaisa(0), 0);
    assert.equal(fromPaisa(12050), 120.5);
  });

  it('formats PKR currency strings properly', () => {
    assert.equal(formatPkr(50000), 'Rs 500');
    assert.equal(formatPkr(150000), 'Rs 1,500');
    assert.equal(formatPkr(0), 'Rs 0');
  });
});
