import { createAction } from '@reduxjs/toolkit'
import { ChainId } from '@sushiswap/sdk'

export interface SerializableTransactionReceipt {
    to: string
    from: string
    contractAddress: string
    transactionIndex: number
    blockHash: string
    transactionHash: string
    blockNumber: number
    status?: number,
}

export const addTransaction = createAction<{
    chainId: ChainId
    hash: string
    from: string
    approval?: { tokenAddress: string; spender: string }
    claim?: { recipient: string }
    summary?: string,
    tradeInfo?: {
      input: {
        decimals: number | undefined,
        symbol: string | undefined
      },
      output: {
        decimals: number | undefined,
        symbol: string | undefined
      }
    }
}>('transactions/addTransaction')
export const clearAllTransactions = createAction<{ chainId: ChainId }>('transactions/clearAllTransactions')
export const finalizeTransaction = createAction<{
    chainId: ChainId
    hash: string
    receipt: SerializableTransactionReceipt,
    summary?: string
}>('transactions/finalizeTransaction')
export const checkedTransaction = createAction<{
    chainId: ChainId
    hash: string
    blockNumber: number
}>('transactions/checkedTransaction')
