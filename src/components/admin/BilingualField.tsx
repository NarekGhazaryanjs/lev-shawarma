export function BilingualField({
  label,
  valueHy,
  valueRu,
  onChangeHy,
  onChangeRu,
  multiline = false,
  required = false,
}: {
  label: string;
  valueHy: string;
  valueRu: string;
  onChangeHy: (value: string) => void;
  onChangeRu: (value: string) => void;
  multiline?: boolean;
  required?: boolean;
}) {
  const inputClass =
    "w-full rounded-2xl border border-black/10 bg-cream px-4 py-3 outline-none focus:border-brand";

  return (
    <div className="space-y-3 rounded-2xl border border-black/8 bg-white/40 p-4">
      <p className="font-semibold">{label}</p>
      <label className="block">
        <span className="text-soft mb-2 block text-sm font-semibold">Հայերեն</span>
        {multiline ? (
          <textarea
            className={`${inputClass} min-h-24`}
            value={valueHy}
            onChange={(event) => onChangeHy(event.target.value)}
            required={required}
          />
        ) : (
          <input
            className={inputClass}
            value={valueHy}
            onChange={(event) => onChangeHy(event.target.value)}
            required={required}
          />
        )}
      </label>
      <label className="block">
        <span className="text-soft mb-2 block text-sm font-semibold">Русский</span>
        {multiline ? (
          <textarea
            className={`${inputClass} min-h-24`}
            value={valueRu}
            onChange={(event) => onChangeRu(event.target.value)}
          />
        ) : (
          <input
            className={inputClass}
            value={valueRu}
            onChange={(event) => onChangeRu(event.target.value)}
          />
        )}
      </label>
    </div>
  );
}
