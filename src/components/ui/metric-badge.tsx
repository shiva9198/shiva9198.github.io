import React from 'react';

export function MetricBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
      <span className="mr-2 opacity-75">{label}:</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

export default MetricBadge;
