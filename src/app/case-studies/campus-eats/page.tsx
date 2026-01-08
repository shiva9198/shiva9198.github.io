import React from 'react';
import { CodeExcerpt } from '@/components/ui/code-excerpt';
import { MetricBadge } from '@/components/ui/metric-badge';
import { OrderStateSimulator } from '@/components/playground/OrderStateSimulator';

export default function CampusEatsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Campus Eats: High-Scale Food Delivery</h1>
        <div className="flex flex-wrap gap-3 mb-6">
          <MetricBadge label="Uptime" value="99.99%" />
          <MetricBadge label="Daily Orders" value="2,500+" />
          <MetricBadge label="Avg Latency" value="<120ms" />
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          A microservices-based delivery platform handling high-concurrency order processing for university campuses.
        </p>
      </header>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Handling sudden spikes in traffic during lunch hours (12pm-1pm) resulted in database locks and race conditions. We needed a system capable of handling state transitions atomically.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Architecture & Code</h2>
        <p className="mb-4">We utilized a Finite State Machine (FSM) to strictly enforce order transitions.</p>
        
        <CodeExcerpt 
          label="OrderStateMachine.ts"
          code={`const orderMachine = createMachine({
  id: 'order',
  initial: 'created',
  states: {
    created: { on: { CONFIRM: 'confirmed' } },
    confirmed: { on: { PREPARE: 'preparing' } },
    // ... strict transitions only
  }
});`} 
        />
      </section>

      <section className="mb-16">
        <OrderStateSimulator />
      </section>

      <footer className="mt-20 pt-10 border-t flex justify-between text-sm text-gray-500">
        <div>
           <a href="/case-studies/campus-eats/campus-eats-case-study.pdf" className="underline hover:text-black">Download PDF Case Study</a>
        </div>
        <div className="flex gap-4">
           <span>Lighthouse: 100/100</span>
           <span>Test Coverage: 94%</span>
        </div>
      </footer>
    </main>
  );
}
