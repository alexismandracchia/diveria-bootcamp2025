type FullScreenLoaderProps = {
  message?: string; 
};

import { TbFidgetSpinner } from "react-icons/tb";

export default function FullScreenLoader({ message }: FullScreenLoaderProps) {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div role="status" className="flex flex-col items-center space-y-3">
        <TbFidgetSpinner className="w-15 h-15 text-blue-600 animate-spin" />
        {message && (
          <div className="text-lg font-medium text-blue-800 bg-blue-200 rounded-full px-3 py-1 animate-pulse dark:bg-blue-900 dark:text-blue-200">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}