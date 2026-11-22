import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { generateUuidV4 } from './uuid.ts';

describe('generateUuidV4', () => {
  it('generates a valid RFC4122 v4 UUID string', () => {
    const uuid = generateUuidV4();
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    assert.match(uuid, uuidRegex);
  });

  it('generates unique UUIDs on subsequent calls', () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateUuidV4()));
    assert.equal(ids.size, 100);
  });
});
