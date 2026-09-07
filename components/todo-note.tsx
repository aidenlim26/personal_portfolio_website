/**
 * A placeholder Aiden has to write himself. Deliberately visible: an invisible
 * TODO is a TODO that ships.
 */
export default function TodoNote({ children }: { children: string }) {
  return (
    <p className="prose-body mt-7 border-l-2 border-[var(--color-ochre)] py-1 pl-4 text-[0.9375rem] text-[var(--color-ochre)] italic">
      {children}
    </p>
  );
}
