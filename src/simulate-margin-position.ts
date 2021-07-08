import { Context, setup, dollar } from './helper';

export const simulateMarginPosition = async () => {
    const ctx: Context = await setup();

    const trader = process.env.TRADER;
    if (!trader) throw Error('process.env.TRADER not defined');

    await ctx.updateBalance(trader, 'LAMI', dollar(1_000)).send;
    await ctx.updateBalance(trader, 'AUSD', dollar(1_000_000)).send;

    await ctx.send(ctx.api.tx.baseLiquidityPoolsForMargin.createPool()).send;
    await ctx.send(ctx.api.tx.baseLiquidityPoolsForMargin.depositLiquidity(0, dollar(1_000))).send;

    await ctx.feedPrice('FEUR', dollar(0.9)).send;

    await ctx.sudo(ctx.api.tx.marginLiquidityPools.enableTradingPair(['FEUR', 'AUSD'])).send;

    await ctx.send(ctx.api.tx.marginLiquidityPools.setSpread(0, ['FEUR', 'AUSD'], dollar(0.003), dollar(0.003))).send;
    await ctx.sudo(ctx.api.tx.marginProtocol.setTradingPairRiskThreshold(['FEUR', 'AUSD'], { margin_call: 1_000_000, stop_out: 0 }, { margin_call: 990_000, stop_out: 0 }, { margin_call: 990_000, stop_out: 0 })).send;
    await ctx.send(ctx.api.tx.marginLiquidityPools.setEnabledLeverages(0, ['FEUR', 'AUSD'], 1)).send;
    await ctx.send(ctx.api.tx.marginLiquidityPools.liquidityPoolEnableTradingPair(0, ['FEUR', 'AUSD'])).send;

    await ctx.sudoAs(trader, ctx.api.tx.marginProtocol.deposit(0, dollar(1000))).send;
    await ctx.sudoAs(trader, ctx.api.tx.marginProtocol.openPosition(0, ['FEUR', 'AUSD'], 'LongTwo', dollar(100), dollar(1))).finalized;

    await ctx.feedPrice('FEUR', dollar(0.7)).finalized;

    await ctx.teardown();
};
