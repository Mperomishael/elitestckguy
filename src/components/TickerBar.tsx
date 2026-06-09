export default function TickerBar() {
  return (
    <div className="w-full bg-surface border-b border-white/5 overflow-hidden" style={{ height: '54px' }}>
      <div className="tradingview-widget-container" style={{ height: '54px' }}>
        <iframe
          src="https://s.tradingview.com/embed-widget/ticker-tape/?locale=en#%7B%22symbols%22%3A%5B%7B%22proName%22%3A%22BITSTAMP%3ABTCUSD%22%2C%22title%22%3A%22Bitcoin%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3AETHUSD%22%2C%22title%22%3A%22Ethereum%22%7D%2C%7B%22proName%22%3A%22BINANCE%3ASOLUSDT%22%2C%22title%22%3A%22Solana%22%7D%2C%7B%22proName%22%3A%22BINANCE%3ABNBUSDT%22%2C%22title%22%3A%22BNB%22%7D%2C%7B%22proName%22%3A%22BINANCE%3AXRPUSDT%22%2C%22title%22%3A%22XRP%22%7D%2C%7B%22proName%22%3A%22BINANCE%3AADAUSDT%22%2C%22title%22%3A%22Cardano%22%7D%2C%7B%22proName%22%3A%22BINANCE%3ADOTUSDT%22%2C%22title%22%3A%22Polkadot%22%7D%2C%7B%22proName%22%3A%22FX%3AEURUSD%22%2C%22title%22%3A%22EUR%2FUSD%22%7D%2C%7B%22proName%22%3A%22OANDA%3AXAUUSD%22%2C%22title%22%3A%22Gold%22%7D%2C%7B%22proName%22%3A%22BINANCE%3AAVAXUSDT%22%2C%22title%22%3A%22Avalanche%22%7D%5D%2C%22showSymbolLogo%22%3Atrue%2C%22isTransparent%22%3Atrue%2C%22displayMode%22%3A%22adaptive%22%2C%22colorTheme%22%3A%22dark%22%7D"
          style={{ width: '100%', height: '54px', border: 'none' }}
          title="TradingView Ticker"
        />
      </div>
    </div>
  );
}
