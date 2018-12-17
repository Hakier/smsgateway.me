import { Sender } from './sender';

describe('Sender', () => {
  describe('constructor', () => {
    it('should save gateway as private property', () => {
      const sender: Sender = new (Sender as any)('gateway instance' as any);

      expect((sender as any).gateway).toEqual('gateway instance');
    });
  });
});
