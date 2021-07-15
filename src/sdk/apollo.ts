import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { NormalizedCacheObject } from "@apollo/client/cache/inmemory/types";
import Web3 from "web3";
import { Fraction } from "@uniswap/sdk-core";
import { getChainId } from "./utils/web3";
import { AAVE_STAKING, G$PRICE } from "./constants/graphql";
import { UnsupportedChainId } from "./utils/errors";
import { decimalToFraction } from "./utils/converter";
import { debug, debugGroup, debugGroupEnd } from "./utils/debug";

/**
 * Returns Apollo client to make GraphQL requests.
 * @param {string} uri Client URI.
 * @return {ApolloClient}
 */
export function getClient(uri: string): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({ uri, cache: new InMemoryCache() })
}

/**
 * Returns G$ price from GraphQL request.
 * @param {Web3} web3 Web3 instance.
 * @return {Fraction}
 * @throws {UnsupportedChainId}
 */
export async function g$Price(web3: Web3): Promise<{ DAI: Fraction, cDAI: Fraction }> {
  const chainId = await getChainId(web3)

  if (!G$PRICE[chainId]) {
    throw new UnsupportedChainId(chainId)
  }

  const client = getClient(G$PRICE[chainId])

  const {
    data: {
      reserveHistories: [{ openPriceDAI, openPriceCDAI }] = [{
        openPriceDAI: null,
        openPriceCDAI: null
      }] as [{ openPriceDAI: string | null, openPriceCDAI: string | null }]
    } = {}
  } = await client.query({
    query: gql`{ reserveHistories(first: 1 orderBy: block, orderDirection: desc) { openPriceDAI, openPriceCDAI } }`
  })

  if (!openPriceDAI || !openPriceCDAI) {
    throw new Error('Invalid CDAI or DAI price for G$')
  }

  const result = {
    DAI: decimalToFraction(openPriceDAI),
    cDAI: decimalToFraction(openPriceCDAI)
  }

  debug('G$ to DAI ratio', result.DAI.toSignificant(6))
  debug('G$ to cDAI ratio', result.cDAI.toSignificant(6))

  return result
}

type AAVEStaking = {
  percentDepositAPY: Fraction,
  percentDepositAPR: Fraction,
}

/**
 * Returns AAVE staking meta intormation from GraphQL request.
 * @param {Web3} web3 Web3 instance.
 * @param {string} tokenSymbol Token symbol.
 * @return {Fraction}
 * @throws {UnsupportedChainId}
 */
export async function aaveStaking(web3: Web3, tokenSymbol: string): Promise<AAVEStaking> {
  const chainId = await getChainId(web3)

  if (!G$PRICE[chainId]) {
    throw new UnsupportedChainId(chainId)
  }

  const client = getClient(AAVE_STAKING[chainId])

  const {
    data: {
      reserves: [{
        aEmissionPerSecond,
        liquidityRate,
        totalATokenSupply
      }] = [{ aEmissionPerSecond: 0, liquidityRate: 0, totalATokenSupply: 0 }]
    } = {}
  } = await client.query({
    query: gql`{ reserves( first: 1, where: { symbol: "${tokenSymbol}", liquidityRate_gt: 0 }, orderBy: liquidityRate, orderDirection: desc) { totalATokenSupply, aEmissionPerSecond, liquidityRate } }`,
  })

  const percentDepositAPY = new Fraction(liquidityRate, 1e27).multiply(100)
  const aEmissionPerYear = new Fraction(aEmissionPerSecond).multiply(31_536_000)
  const percentDepositAPR = aEmissionPerYear.multiply(100).divide(new Fraction(totalATokenSupply))

  debugGroup('AAVE Staking')
  debug('percentDepositAPY', percentDepositAPY.toSignificant(6))
  debug('percentDepositAPR', percentDepositAPR.toSignificant(6))
  debugGroupEnd('AAVE Staking')

  return { percentDepositAPY, percentDepositAPR }
}