import abi from '../../../abis/NFTXZap.json'
import { Interface } from '@ethersproject/abi'
import { NFTTrade, BuyItem, Market, TokenType } from '../NFTTrade'
import { RoutePlanner, CommandType } from '../../utils/routerCommands'
import { ethers, BigNumber, BigNumberish } from 'ethers'
import { Currency, CurrencyAmount, Ether } from '@uniswap/sdk-core'
import { assert } from 'console'
import JSBI from 'jsbi'

export type NFTXData = {
  recipient: string
  vaultAddress: string
  vaultId: BigNumberish
  tokenAddress: string
  tokenIds: BigNumberish[]
  price: BigNumber
}

type NFTXVaultPurchase = {
  recipient: string
  price: BigNumber
  vaultAddress: string
  tokenIds: BigNumberish[]
}

export class NFTXTrade extends NFTTrade<NFTXData> {
  public static INTERFACE: Interface = new Interface(abi)

  constructor(orders: NFTXData[]) {
    super(Market.NFTX, orders)
  }

  encode(planner: RoutePlanner): void {
    for (const order of this.orders) {
      const calldata = NFTXTrade.INTERFACE.encodeFunctionData('buyAndRedeem', [
        order.vaultId,
        order.tokenIds.length,
        order.tokenIds,
        [Ether.onChain(1).wrapped.address, order.vaultAddress],
        order.recipient,
      ])
      planner.addCommand(CommandType.NFTX, [order.price, calldata])
    }
  }

  getBuyItems(): BuyItem[] {
    let buyItems: BuyItem[] = []
    for (const order of this.orders) {
      for (const tokenId of order.tokenIds) {
        buyItems.push({
          tokenAddress: order.tokenAddress,
          tokenId: tokenId,
          tokenType: TokenType.ERC721,
        })
      }
    }
    return buyItems
  }

  getTotalPrice(): BigNumberish {
    let total = BigNumber.from(0)
    for (const item of this.orders) {
      total = total.add(item.price)
    }
    return total
  }
}