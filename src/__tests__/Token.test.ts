/**
 * @jest-environment node
 */
import { Hash256 } from "@neo-one/client"
import { withContracts } from "../neo-one/test"
import BigNumber from "bignumber.js"

describe("Token", () => {
  test("exists", async () => {
    await withContracts(async ({ token }) => {
      expect(token).toBeDefined()
    })
  })

  test("token specs", async () => {
    await withContracts(async ({ token }) => {
      const [name, symbol, decimals] = await Promise.all([
        token.name(),
        token.symbol(),
        token.decimals(),
      ])
      expect(name).toEqual("Eon")
      expect(symbol).toEqual("EON")
      expect(decimals.toNumber()).toEqual(8)
    })
  })

  test("balances", async () => {
    await withContracts(async ({ token, accountIDs }) => {
      const [totalSupply, balance] = await Promise.all([
        token.totalSupply(),
        token.balanceOf(accountIDs[0].address),
      ])
      expect(totalSupply.toNumber()).toEqual(0)
      expect(balance.toNumber()).toEqual(0)
    })
  })

  test("mint", async () => {
    await withContracts(async ({ token, accountIDs }) => {
      const accountID = accountIDs[2]
      const amount = new BigNumber(10)

      const mintTokensResult = await token.mintTokens({
        sendTo: [
          {
            amount,
            asset: Hash256.NEO,
          },
        ],
        from: accountID,
      })
      const mintTokensReceipt = await mintTokensResult.confirmed()
      if (mintTokensReceipt.result.state === "FAULT") {
        throw new Error(mintTokensReceipt.result.message)
      }
      expect(mintTokensReceipt.result.value).toBeUndefined()

      const [balance, totalSupply] = await Promise.all([
        token.balanceOf(accountID.address),
        token.totalSupply(),
      ])
      expect(balance.toNumber()).toEqual(amount.toNumber())
      expect(totalSupply.toNumber()).toEqual(amount.toNumber())

      const toAccountID = accountIDs[1]
      const transferAmount = new BigNumber(3)
      const transferReceipt = await token.transfer.confirmed(
        accountID.address,
        toAccountID.address,
        transferAmount,
        {
          from: accountID,
        }
      )
      if (transferReceipt.result.state === "FAULT") {
        throw new Error(transferReceipt.result.message)
      }
      expect(transferReceipt.result.value).toEqual(true)

      const [fromBalance, toBalance, afterTotalSuppply] = await Promise.all([
        token.balanceOf(accountID.address),
        token.balanceOf(toAccountID.address),
        token.totalSupply(),
      ])
      expect(fromBalance.toNumber()).toEqual(
        amount.minus(transferAmount).toNumber()
      )
      expect(toBalance.toNumber()).toEqual(transferAmount.toNumber())
      expect(afterTotalSuppply.toNumber()).toEqual(amount.toNumber())
    })
  })
})
