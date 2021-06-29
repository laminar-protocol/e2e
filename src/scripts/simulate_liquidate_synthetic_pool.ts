#!/usr/bin/env node

import run from '../simulate_liquidate_synthetic_pool';

run().catch((error) => {
  console.error(error);
  process.exit(-1);
});
