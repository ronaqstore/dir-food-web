import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { parseDealDescription } from './deal-parser.ts';

describe('parseDealDescription', () => {
  test('parses plus-separated deal combos into structured items', () => {
    const text = '1 Large Pizza (any flavor) + 4 Pcs Crispy Chicken Broast + 2 Crispy Zinger Burgers + 1 Cold Drink (2.5 Liter). Feeds 5-6 persons.';
    const result = parseDealDescription(text);

    assert.equal(result.items.length, 4);
    assert.equal(result.items[0]?.name, '1 Large Pizza (any flavor)');
    assert.equal(result.items[0]?.emoji, '🍕');
    assert.equal(result.items[1]?.name, '4 Pcs Crispy Chicken Broast');
    assert.equal(result.items[1]?.emoji, '🍗');
    assert.equal(result.items[2]?.name, '2 Crispy Zinger Burgers');
    assert.equal(result.items[2]?.emoji, '🍔');
    assert.equal(result.items[3]?.name, '1 Cold Drink (2.5 Liter)');
    assert.equal(result.items[3]?.emoji, '🥤');
    assert.equal(result.servingNote, 'Feeds 5-6 persons');
  });

  test('parses newline separated items', () => {
    const text = '1 Mutton Karahi\n4 Roghni Naans\n1.5L Drink';
    const result = parseDealDescription(text);

    assert.equal(result.items.length, 3);
    assert.equal(result.items[0]?.emoji, '🍲');
    assert.equal(result.items[1]?.emoji, '🫓');
    assert.equal(result.items[2]?.emoji, '🥤');
  });

  test('handles empty or null descriptions safely', () => {
    const result = parseDealDescription(null);
    assert.deepEqual(result.items, []);
  });
});

