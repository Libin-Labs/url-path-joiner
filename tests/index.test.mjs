import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('joins ordinary segments', () => {
  assert.equal(api.joinUrlPath('/api/', 'v1', 'users'), '/api/v1/users');
});
test('collapses repeated separators', () => {
  assert.equal(api.joinUrlPath('a//b', 'c'), 'a/b/c');
});
test('resolves dot segments', () => {
  assert.equal(api.joinUrlPath('/a/b/../c'), '/a/c');
});
test('preserves relative traversal', () => {
  assert.equal(api.joinUrlPath('../a'), '../a');
});
test('preserves trailing slash', () => {
  assert.equal(api.joinUrlPath('/a/'), '/a/');
});
test('rejects query strings', () => {
  assert.throws(() => api.joinUrlPath('/a?x=1'), RangeError);
});
