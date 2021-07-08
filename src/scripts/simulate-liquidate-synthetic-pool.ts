#!/usr/bin/env node

import { simulateLiquidateSyntheticPool } from '../simulate-liquidate-synthetic-pool';

simulateLiquidateSyntheticPool().catch((error) => {
  console.error(error);
  process.exit(-1);
});
