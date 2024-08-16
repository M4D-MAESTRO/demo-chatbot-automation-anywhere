import { LimitCharsPipe } from './limit-chars.pipe';

describe('LimitCharsPipe', () => {
  it('create an instance', () => {
    const pipe = new LimitCharsPipe();
    expect(pipe).toBeTruthy();
  });
});
