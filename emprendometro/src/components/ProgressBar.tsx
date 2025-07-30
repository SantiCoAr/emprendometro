// src/components/ProgressBar.tsx
interface Props { current: number; total: number; }
const ProgressBar: React.FC<Props> = ({ current, total }) => {
  const percent = Math.round((current / total) * 100);
  return (
    <div className="w-full bg-gray-200 rounded h-3 my-4">
      <div
        className="bg-blue-500 h-3 rounded"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};
export default ProgressBar;
