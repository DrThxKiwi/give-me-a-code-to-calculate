type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-3">
      <p className="text-xs uppercase tracking-[0.34em] text-ink-500">{eyebrow}</p>
      <h2 className="font-display text-4xl text-ink-950 sm:text-5xl">{title}</h2>
      {description ? (
        <p className="text-base leading-8 text-ink-700">{description}</p>
      ) : null}
    </div>
  );
}
