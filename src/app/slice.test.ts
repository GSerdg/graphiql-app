import { describe, expect, it } from 'vitest';
import modulReducer, { setDescription, setIsNotificationOpen, setNotificationType } from './modulSlice';

describe('Input slice', () => {
  it('should return default state width empty action', () => {
    const result = modulReducer(undefined, { type: '' });
    expect(result).toEqual({
      isNotificationOpen: false,
      notificationType: 'success',
      description: '',
    });
  });

  it('should add new inputValue item width setInputValue action', () => {
    const action1 = { type: setIsNotificationOpen.type, payload: true };
    const result1 = modulReducer(
      {
        isNotificationOpen: false,
        notificationType: 'error',
        description: 'Message',
      },
      action1
    );
    expect(result1.isNotificationOpen).toBeTruthy();

    const action2 = { type: setNotificationType.type, payload: 'error' };
    const result2 = modulReducer(
      {
        isNotificationOpen: false,
        notificationType: 'success',
        description: 'Message',
      },
      action2
    );
    expect(result2.notificationType).toBe('error');

    const action3 = { type: setDescription.type, payload: 'Mesage' };
    const result3 = modulReducer(
      {
        isNotificationOpen: false,
        notificationType: 'success',
        description: '',
      },
      action3
    );
    expect(result3.description).toBe('Mesage');
  });
});
