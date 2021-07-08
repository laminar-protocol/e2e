#!/usr/bin/env node

import {simulateMarginPosition} from '../simulate-margin-position';

simulateMarginPosition().catch((error) => {
  console.error(error);
  process.exit(-1);
});
