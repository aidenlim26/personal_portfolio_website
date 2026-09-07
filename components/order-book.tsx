/**
 * Hero panel three. Not a screenshot — a live-typeset fragment of the order
 * book the HFT simulator prints, rendered as HTML text on a dark field.
 *
 * The ladder deliberately runs off the bottom edge of the panel. The two
 * photographs beside it bleed to all four edges of their frames; a code block
 * floated in the middle of its box with margins would read as a UI component
 * dropped into a slot, which is the one thing this panel must not look like.
 * It is cropped by its frame the same way a photograph is.
 *
 * TODO(aiden): paste a real dump from hft_trading_simulator over these levels.
 * They are shaped like your output but they are not your output, and that
 * difference is the whole point of the panel.
 */
const LEVELS = [
  ["142.10", "142.40"],
  ["142.05", "142.55"],
  ["141.95", "142.60"],
  ["141.90", "142.75"],
  ["141.85", "142.90"],
  ["141.70", "143.05"],
  ["141.65", "143.20"],
  ["141.50", "143.40"],
  ["141.45", "143.55"],
  ["141.30", "143.70"],
  ["141.25", "143.85"],
  ["141.10", "144.05"],
  ["141.05", "144.20"],
  ["140.90", "144.35"],
  ["140.85", "144.50"],
  ["140.70", "144.75"],
  ["140.65", "144.90"],
  ["140.50", "145.10"],
] as const;

function Rule() {
  return <div className="my-[0.85em] h-px bg-[var(--book-label)]/30" />;
}

export default function OrderBook() {
  return (
    <div
      role="img"
      aria-label="A bid and ask ladder printed by the trading simulator."
      className="h-full w-full overflow-hidden bg-ink px-[7%] pt-[7%] font-mono text-[var(--book-figure)] tnum"
      style={{ fontSize: "clamp(0.6875rem, 0.42rem + 0.62vw, 0.8125rem)" }}
    >
      <p className="text-[var(--book-label)]">hft_sim</p>

      <Rule />

      <div className="grid grid-cols-2 gap-x-[1.2em] leading-[1.75]">
        <span className="text-[var(--book-label)]">last</span>
        <span className="text-right text-[var(--book-mark)]">142.30</span>
        <span className="text-[var(--book-label)]">spread</span>
        <span className="text-right">0.30</span>
      </div>

      <Rule />

      <div className="grid grid-cols-2 gap-x-[1.2em] leading-[1.75]">
        <span className="text-[var(--book-label)]">bid</span>
        <span className="text-right text-[var(--book-label)]">ask</span>
        {LEVELS.map(([bid, ask]) => (
          <span key={bid} className="contents">
            <span>{bid}</span>
            <span className="text-right">{ask}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
