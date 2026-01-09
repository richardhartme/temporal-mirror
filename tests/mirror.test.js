import assert from 'node:assert/strict';
import test from 'node:test';
import {
  calculateMirror,
  formatDate,
  getDefaultPivotString,
  getTodayString,
  parseInputDate
} from '../build-tests/src/utils/dateMirror.js';

test('parseInputDate parses valid DD/MM/YYYY strings', () => {
  const parsed = parseInputDate('20/02/2025');

  assert.ok(parsed, 'expected a valid Date object');
  assert.equal(parsed?.getUTCFullYear(), 2025);
  assert.equal(parsed?.getUTCMonth(), 1);
  assert.equal(parsed?.getUTCDate(), 20);
});

test('parseInputDate rejects invalid input', () => {
  assert.equal(parseInputDate('2025-02-20'), null);
  assert.equal(parseInputDate('32/01/2024'), null);
});

test('calculateMirror finds symmetrical past date', () => {
  const pivot = parseInputDate('01/01/2025');
  const future = parseInputDate('11/01/2025');

  assert.ok(pivot);
  assert.ok(future);

  const { offsetDays, mirroredDate } = calculateMirror(future, pivot);

  assert.equal(offsetDays, 10);
  assert.equal(formatDate(mirroredDate), '22/12/2024');
});

test('calculateMirror reports negative offsets for past dates', () => {
  const pivot = parseInputDate('01/01/2025');
  const pastFuture = parseInputDate('31/12/2024');

  assert.ok(pivot);
  assert.ok(pastFuture);

  const { offsetDays } = calculateMirror(pastFuture, pivot);

  assert.equal(offsetDays, -1);
});

test('helpers default to the current calendar year', () => {
  const mockToday = new Date(Date.UTC(2030, 5, 15));
  const mockPivot = new Date(Date.UTC(2030, 0, 1));

  assert.equal(getTodayString(mockToday), '15/06/2030');
  assert.equal(getDefaultPivotString(mockToday), formatDate(mockPivot));
});
