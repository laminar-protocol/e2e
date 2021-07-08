# e2e

## Simulate synthetic pool liquidation

1. start laminar local node
2. `npx -p @laminar/e2e@latest simulate-liquidate-synthetic-pool`

default env args

```
process.env.WS_URL = 'ws://localhost::9944' # node endpoint
process.env.SURI = '//Alice' # sudo account
```

required env args

```
process.env.OWNER # pool owner
```

## Simulate margin position

1. start laminar local node
2. `npx -p @laminar/e2e@latest simulate-margin-position`

default env args

```
process.env.WS_URL = 'ws://localhost::9944' # node endpoint
process.env.SURI = '//Alice' # sudo account
```

required env args

```
process.env.TRADER # trader opening position
```
