#!/usr/bin/env node

import { Context, setup, dollar } from './helper';

const main = async () => {
  const ctx: Context = await setup();

  const owner = process.env.OWNER;
  if (!owner) throw Error('process.env.OWNER not defined');

  await ctx.updateBalance(owner, 'LAMI', dollar(1_000_000)).finalized;
  await ctx.updateBalance(owner, 'AUSD', dollar(1_000_000)).finalized;

  await ctx.sudoAs(owner, ctx.api.tx.baseLiquidityPoolsForSynthetic.createPool()).finalized;
  await ctx.sudoAs(owner, ctx.api.tx.baseLiquidityPoolsForSynthetic.depositLiquidity(0, dollar(1_000))).finalized;

  await ctx.feedPrice('FEUR', dollar(0.9)).finalized;

  await ctx.sudoAs(owner, ctx.api.tx.syntheticLiquidityPools.setSpread(0, 'FEUR', dollar(0.003), dollar(0.003))).finalized;
  await ctx.sudoAs(owner, ctx.api.tx.syntheticLiquidityPools.setSyntheticEnabled(0, 'FEUR', true)).finalized;
  await ctx.sudoAs(owner, ctx.api.tx.syntheticProtocol.mint(0, 'FEUR', dollar(1000), dollar(1))).finalized;
  await ctx.sudo(ctx.api.tx.syntheticTokens.setLiquidationRatio('FEUR', 200_000)).finalized;
};

main().catch((error) => {
  console.error(error);
  process.exit(-1);
});
