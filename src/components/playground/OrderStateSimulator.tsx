'use client';
import React, { useState } from 'react';

const STATES = ['Created', 'Confirmed', 'Preparing', 'Ready', 'Delivered'];

export function OrderStateSimulator() {
  const [step, setStep] = useState(0);

  return (
    <div className="p-6 border rounded-xl bg-white dark:bg-gray-900 shadow-sm my-8">
      <h3 className="text-lg font-semibold mb-4">Interactive: Order State Machine</h3>
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 -z-10" />
        {STATES.map((s, i) => (
          <div key={s} className={`flex flex-col items-center gap-2 bg-white dark:bg-gray-900 px-2`}>
            <div className={`w-4 h-4 rounded-full transition-colors duration-300 ${i <= step ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`} />
            <span className={`text-xs ${i === step ? 'font-bold text-emerald-600' : 'text-gray-500'}`}>{s}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <button 
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="px-4 py-2 text-sm border rounded hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button 
          onClick={() => setStep(Math.min(STATES.length - 1, step + 1))}
          disabled={step === STATES.length - 1}
          className="px-4 py-2 text-sm bg-black text-white dark:bg-white dark:text-black rounded hover:opacity-90 disabled:opacity-50"
        >
          Next State Event
        </button>
      </div>
    </div>
  );
}

export default OrderStateSimulator;
