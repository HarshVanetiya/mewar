// A writer's note explaining a block's purpose. Hidden unless "Content notes" is on.
// Remove all <Note> usages before launch.
export default function Note({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className="note" style={style}>
      INTENT: {children}
    </div>
  );
}
