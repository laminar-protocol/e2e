import { Context, setup, dollar } from '../../helper';
import { ApiPromise } from '@polkadot/api';

jest.setTimeout(60_000);

let ctx: Context;
let api: ApiPromise;

beforeAll(async () => {
  ctx = await setup();
  api = ctx.api;
});

afterAll(async () => {
  await ctx.teardown();
});

beforeEach(async () => {
  await ctx.killAll();
});

test('test', async () => {
  const accounts = await ctx.makeAccounts(2);
  const [alice, bob] = accounts;
  
  await ctx.updateBalance(alice, 'AUSD', dollar(10)).finalized;
  await ctx.updateBalance(bob, 'AUSD', dollar(101)).finalized;
  await ctx.feedPrice('FEUR', dollar(1.2)).send;

  const aliceBalance = await api.query.tokens.accounts(alice.address, 'AUSD');
  const bobBalance = await api.query.tokens.accounts(bob.address, 'AUSD');
  const entries = await api.query.oracle.rawValues.entries();

  expect(aliceBalance.toHuman()).toStrictEqual({ free: '10.000 LAMI', reserved: '0', miscFrozen: '0', feeFrozen: '0' });
  expect(bobBalance.toHuman()).toStrictEqual({ free: '101.000 LAMI', reserved: '0', miscFrozen: '0', feeFrozen: '0' });
  expect((entries[0][1].toJSON() as any).value).toBe('0x000000000000000010a741a462780000');
});
