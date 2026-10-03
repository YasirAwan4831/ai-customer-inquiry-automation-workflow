export default function ResponsiveTable({ rows }) {
  const [head, ...body] = rows;
  return (
    <div className="not-prose my-8 font-sans">
      <div className="hidden overflow-x-auto rounded-lg border border-slate-200 md:block dark:border-white/10" tabIndex={0} role="region" aria-label="Table, scrollable">
        <table className="w-full min-w-[40rem] border-collapse text-left text-sm leading-6">
          <thead className="bg-navy-800 text-white dark:bg-navy-700"><tr>{head.map((h, i) => <th key={i} scope="col" className="px-4 py-3 font-semibold">{h || <span className="sr-only">Item</span>}</th>)}</tr></thead>
          <tbody>
            {body.map((r, i) => (
              <tr key={i} className="border-t border-slate-200 odd:bg-white even:bg-slate-50 dark:border-white/10 dark:odd:bg-navy-950 dark:even:bg-navy-900">
                {r.map((c, j) => (j === 0 ? <th key={j} scope="row" className="px-4 py-3 align-top font-semibold text-navy-800 dark:text-white">{c}</th> : <td key={j} className="px-4 py-3 align-top">{c}</td>))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="space-y-3 md:hidden">
        {body.map((r, i) => (
          <li key={i} className="card p-4">
            <p className="font-semibold text-navy-800 dark:text-white">{r[0]}</p>
            <dl className="mt-2 space-y-2 text-sm leading-6">
              {r.slice(1).map((c, j) => <div key={j}><dt className="text-xs font-semibold text-gold-700 dark:text-gold-300">{head[j + 1]}</dt><dd>{c}</dd></div>)}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
