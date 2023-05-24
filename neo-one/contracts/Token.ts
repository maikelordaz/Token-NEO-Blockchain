import {
  Address,
  Blockchain,
  Deploy,
  Fixed,
  Hash256,
  MapStorage,
  SmartContract,
  constant,
  receive,
} from "@neo-one/smart-contract"

export class Token extends SmartContract {
  // readonly => constant
  public readonly name = "Ian"
  public readonly symbol = "Ian"
  public readonly decimals = 6

  private mutableSupply: Fixed<8> = 0
  // Fixed<8> => 8 decimals
  private readonly balances = MapStorage.for<Address, Fixed<8>>()

  // No need to test it because withContracts helper already deploy the contract checkking everything
  public constructor(public readonly owner: Address = Deploy.senderAddress) {
    super()
    if (!Address.isCaller(owner)) {
      throw new Error("Sender must be the owner")
    }
  }

  //@constant does not modify the blockchain. Equivalent to view/pure functions
  @constant
  public get totalSupply(): Fixed<8> {
    return this.mutableSupply
  }

  @constant
  public balanceOf(address: Address): Fixed<8> {
    const balance = this.balances.get(address)
    return balance === undefined ? 0 : balance
  }

  public transfer(from: Address, to: Address, amount: Fixed<8>): boolean {
    if (amount < 0) {
      throw new Error(`Amount must be greater than 0: ${amount}`)
    }

    if (!Address.isCaller(from)) {
      throw new Error("from Address did not approve the transfer")
    }

    const fromBalance = this.balanceOf(from)
    if (fromBalance < amount) {
      throw new Error("From insufficient balance")
    }

    const toBalance = this.balanceOf(to)
    this.balances.set(from, fromBalance - amount)
    this.balances.set(to, toBalance + amount)

    return true
  }

  @receive
  public mintTokens(): void {
    // Inspect current transaction
    const { references, outputs } = Blockchain.currentTransaction
    if (references.length === 0) {
      throw new Error("Invalid mintTokens")
    }

    // First address is minter
    const sender = references[0].address

    // Sum up the amount of NEO sent to the contract. If anything else is sent throw error
    let amount = 0
    for (const output of outputs) {
      if (output.address.equals(this.address)) {
        if (!output.asset.equals(Hash256.NEO)) {
          throw new Error("Invalid mintTokens")
        }
        amount += output.value
      }
    }
    this.issue(sender, amount)
  }

  private issue(address: Address, amount: Fixed<8>): void {
    this.balances.set(address, this.balanceOf(address) + amount)

    this.mutableSupply += amount
  }
}
