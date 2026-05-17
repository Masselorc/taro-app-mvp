function CardFallback({ card }) {
  const symbol = card.symbol || "✦";
  const accent = card.arcana === "Maior" ? "from-violet-300 via-fuchsia-200 to-amber-200" : "from-cyan-200 via-violet-200 to-amber-100";

  return (
    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[1.6rem] border border-amber-200/60 bg-slate-950 shadow-2xl shadow-violet-950/50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.22),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.28),_transparent_40%)]" />
      <div className="absolute inset-3 rounded-[1.2rem] border border-amber-100/40" />
      <div className="absolute inset-6 rounded-full border border-violet-200/30" />
      <div className="absolute left-7 top-8 text-xs text-amber-100/80">✦</div>
      <div className="absolute right-7 top-10 text-xs text-violet-100/80">✧</div>
      <div className="absolute bottom-8 left-8 text-xs text-amber-100/70">☾</div>
      <div className="absolute bottom-8 right-8 text-xs text-amber-100/70">☽</div>
      <div className={`absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-amber-100/50 bg-gradient-to-br ${accent} text-5xl text-slate-950 shadow-2xl shadow-violet-950/60`}>
        {symbol}
      </div>
      <div className="absolute bottom-6 left-1/2 w-[78%] -translate-x-1/2 rounded-full border border-amber-100/30 bg-slate-950/70 px-3 py-2 text-center text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-amber-100">
        {card.arcana === "Maior" ? "Arcano Maior" : `${card.suit || "Arcano Menor"}`}
      </div>
    </div>
  );
}

function CardArtwork({ card }) {
  if (!card.image) return <CardFallback card={card} />;

  return (
    <figure className="overflow-hidden rounded-[1.6rem] border border-amber-200/70 bg-slate-950 shadow-2xl shadow-violet-950/50">
      <div className="relative bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.20),_transparent_35%),linear-gradient(135deg,_rgba(88,28,135,0.35),_rgba(15,23,42,0.85))] p-2">
        <img
          src={card.image}
          alt={card.imageAlt || `Carta ${card.name}`}
          className="aspect-[2/3] w-full rounded-[1.1rem] object-cover shadow-xl shadow-slate-950/60"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
      <figcaption className="border-t border-amber-100/20 bg-slate-950/95 px-3 py-2 text-center text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-amber-100/85">
        {card.arcana === "Maior" ? "Arcano Maior" : `${card.suit || "Arcano Menor"}`}
      </figcaption>
    </figure>
  );
}

function Paragraphs({ text }) {
  return String(text || "")
    .split("\n\n")
    .filter(Boolean)
    .map((paragraph) => (
      <p key={paragraph.slice(0, 42)} className="mt-2 leading-relaxed text-slate-300">
        {paragraph}
      </p>
    ));
}

export default function TarotCard({ card }) {
  return (
    <article className="overflow-hidden rounded-[1.8rem] border border-violet-200/20 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/40">
      <div className="grid gap-5 md:grid-cols-[210px_1fr]">
        <CardArtwork card={card} />
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-200">{card.position}</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-50">{card.name}</h3>
          <p className="mt-3 text-base leading-relaxed text-slate-300">{card.shortMeaning}</p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <h4 className="font-semibold text-amber-100">Análise desta carta na leitura</h4>
            <Paragraphs text={card.text} />
          </div>
          <div className="mt-3 rounded-2xl border border-violet-200/20 bg-violet-300/10 p-4">
            <h4 className="font-semibold text-violet-100">Conselho prático</h4>
            <Paragraphs text={card.personalAdvice || card.advice} />
          </div>
        </div>
      </div>
    </article>
  );
}
