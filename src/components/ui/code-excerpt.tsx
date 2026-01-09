import React from 'react';

interface CodeExcerptProps {
  code: string;
  label?: string;
}

export function CodeExcerpt({ code, label }: CodeExcerptProps) {
  return (
    <div className="w-full my-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/50 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <div className="w-3 h-3 rounded-full bg-green-400/80" />
        </div>
        {label && <span className="text-xs font-mono text-gray-500">{label}</span>}
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-200">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export default CodeExcerpt;
