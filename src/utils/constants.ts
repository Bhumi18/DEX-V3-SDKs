import { BigNumber } from 'ethers'

export const UNIVERSAL_ROUTER_ADDRESS = (chainId: number): string => {
  switch (chainId) {
    case 1:
      return '0xEf1c6E67703c7BD7107eed8303Fbe6EC2554BF6B'
    case 137:
      return '0x4C60051384bd2d3C01bfc845Cf5F4b44bcbE9de5'
    case 10:
      return '0xb555edF5dcF85f42cEeF1f3630a52A108E55A654'
    case 42161:
      return '0x4C60051384bd2d3C01bfc845Cf5F4b44bcbE9de5'
    case 42220:
      return '0xC73d61d192FB994157168Fb56730FdEc64C9Cb8F'
    default:
      throw new Error(`Universal Router not deployed on chain ${chainId}`)
  }
}
export const PERMIT2_ADDRESS = '0x000000000022D473030F116dDEE9F6B43aC78BA3'

export const CONTRACT_BALANCE = BigNumber.from(2).pow(255)
export const ETH_ADDRESS = '0x0000000000000000000000000000000000000000'

export const MSG_SENDER = '0x0000000000000000000000000000000000000001'
export const ADDRESS_THIS = '0x0000000000000000000000000000000000000002'