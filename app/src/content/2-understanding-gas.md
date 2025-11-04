# Understanding Gas and Fees

Gas is the unit that measures the computational work required to execute actions on Ethereum. Fees are paid in ETH for the gas consumed.

## How gas works

- Each operation (storage, computation, logging) costs a fixed amount of gas.
- You pay: gasUsed × gasPrice = fee (in ETH).
- Validators prioritize transactions with higher effective fees.

## Why gas exists

- Prevents spam by attaching a real cost to computation.
- Allocates scarce block space via market pricing.
- Incentivizes validator participation and network security.

> Tip: Efficient smart contracts optimize storage and minimize expensive operations to reduce gas costs.
