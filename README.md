# E2E & Simulations

To run the simulation you need to local Laminar node

### Running Laminar local node

Using `docker`:
```shell=
docker run --rm -p 9944:9944  laminar/laminar-node:latest \
--dev --ws-external --rpc-methods=unsafe \
-levm=trace --tmp
```

To build the project without `docker` use the guidelines here:
[**laminar-protocol/laminar-chain**](https://github.com/laminar-protocol/laminar-chain)
Run the node with:
```
cargo run -- --dev --tmp
```

## Simulate synthetic pool liquidation

Install dependencies:
```
yarn
```

Run simulation:
```shell=
yarn dev:simulate-liquidate-synthetic-pool
```

## Simulate margin position

To use simulation you need to clone the repository and run the simulation script:

Install dependencies:
```
yarn
```

Run simulation:
```shell=
yarn dev:simulate-margin-position
```