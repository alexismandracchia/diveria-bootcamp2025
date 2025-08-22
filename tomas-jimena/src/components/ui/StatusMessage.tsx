export default function StatusMessage({ message, type }: { message: string; type: 'error' | 'success' }) {
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className={`p-2 rounded-md text-sm ${type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
        {message} 
      </div>
    </div>
  );
}
