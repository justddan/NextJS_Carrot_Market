interface FormButtonProps {
  loading: boolean;
  text: string;
  onClick: () => void;
}

export default function FormButton({
  loading,
  text,
  onClick,
}: FormButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {loading ? "로딩 중" : text}
    </button>
  );
}
