interface LabelledNumberProps {
  value?: number;
  label: string;
}
export function LabelledNumber(props: LabelledNumberProps) {
  return (
    <>
      <p className="text-center text-2xl font-bold">{props.value ?? 0}</p>
      <p className="text-center font-bold">{props.label}</p>
    </>
  );
}