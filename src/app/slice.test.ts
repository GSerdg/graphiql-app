import { describe, expect, it } from 'vitest';
import modulReducer, { setIsOpenMessage, setMessageType, setStatusMessage } from './modulSlice';

describe('Input slice', () => {
  it('should return default state width empty action', () => {
    const result = modulReducer(undefined, { type: '' });
    expect(result).toEqual({
      isOpenMessage: false,
      messageType: 'success',
      statusMessage: '',
    });
  });

  it('should add new inputValue item width setInputValue action', () => {
    const action1 = { type: setIsOpenMessage.type, payload: true };
    const result1 = modulReducer(
      {
        isOpenMessage: false,
        messageType: 'error',
        statusMessage: 'Message',
      },
      action1
    );
    expect(result1.isOpenMessage).toBeTruthy();

    const action2 = { type: setMessageType.type, payload: 'error' };
    const result2 = modulReducer(
      {
        isOpenMessage: false,
        messageType: 'success',
        statusMessage: 'Message',
      },
      action2
    );
    expect(result2.messageType).toBe('error');

    const action3 = { type: setStatusMessage.type, payload: 'Mesage' };
    const result3 = modulReducer(
      {
        isOpenMessage: false,
        messageType: 'success',
        statusMessage: '',
      },
      action3
    );
    expect(result3.statusMessage).toBe('Mesage');
  });
});
