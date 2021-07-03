import { Context, setup, dollar } from './helper';

export const simulateLiquidateSyntheticPool = async () => {
  const ctx: Context = await setup();

  const owner = process.env.OWNER;
  if (!owner) throw Error('process.env.OWNER not defined');

  await ctx.updateBalance(owner, 'LAMI', dollar(1_000_000)).send;
  await ctx.updateBalance(owner, 'AUSD', dollar(1_000_000)).send;

  await ctx.sudoAs(owner, ctx.api.tx.baseLiquidityPoolsForSynthetic.createPool()).send;
  await ctx.sudoAs(owner, ctx.api.tx.baseLiquidityPoolsForSynthetic.depositLiquidity(0, dollar(1_000))).send;

  await ctx.feedPrice('FEUR', dollar(0.9)).send;

  await ctx.sudoAs(owner, ctx.api.tx.syntheticLiquidityPools.setSpread(0, 'FEUR', dollar(0.003), dollar(0.003))).send;
  await ctx.sudoAs(owner, ctx.api.tx.syntheticLiquidityPools.setSyntheticEnabled(0, 'FEUR', true)).send;
  await ctx.sudoAs(owner, ctx.api.tx.syntheticProtocol.mint(0, 'FEUR', dollar(1000), dollar(1))).send;
  await ctx.sudo(ctx.api.tx.syntheticTokens.setLiquidationRatio('FEUR', 200_000)).finalized;
  await ctx.teardown();
};
