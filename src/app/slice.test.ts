import { describe, expect, it } from 'vitest';
import inputReducer, { setInputValue } from './inputSlice';

describe('Input slice', () => {
  it('should return default state width empty action', () => {
    const result = inputReducer(undefined, { type: '' });
    expect(result).toEqual({ inputValue: '' });
  });

  it('should add new inputValue item width setInputValue action', () => {
    const action = { type: setInputValue.type, payload: 'Luke' };
    const result = inputReducer({ inputValue: '' }, action);
    expect(result.inputValue).toBe('Luke');
  });
});
