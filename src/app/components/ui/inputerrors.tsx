interface Props {
  errors?: string[];
}

export function InputErrors(props: Props) {
  const { errors } = props;

  if (!errors) return null;

  return (
    <div className="text-sm text-red-500">
      {errors.map((error, idx) => (
        <p key={idx}>{error}</p>
      ))}
    </div>
  );
}
