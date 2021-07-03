# e2e

## Simulate synthetic pool liquidation

1. start laminar local node
2. `npx @laminar/e2e simulate-liquidate-synthetic-pool`

default env args

```
process.env.WS_URL = 'ws://localhost::9944' # node endpoint
process.env.SURI = '//Alice' # sudo account
```

required env args

```
process.env.OWNER # pool owner
```