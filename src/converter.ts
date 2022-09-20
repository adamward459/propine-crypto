import axios from "axios";

export class Converter {
  async portfolioToUSD(token: string, amount: number): Promise<number> {
    if (amount === 0) {
      return 0;
    }
    const response = await axios.get(
      `https://min-api.cryptocompare.com/data/price?fsym=${token}&tsyms=USD&api_key=84bd2a019679784a8146c676d1bca8c81a587523ef8525ed516e5a0ed5494e63`
    );

    return response.data.USD * amount;
  }
}
