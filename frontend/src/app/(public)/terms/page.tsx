import React from 'react';

export const metadata = {
  title: 'Terms | BHRAMASTRA Financial Services',
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20 px-6 min-h-[60vh] max-w-[1800px] mx-auto">
      <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-widest uppercase mb-8 text-white">
        Terms
      </h1>
      <div className="text-brand-grey font-body leading-relaxed max-w-3xl">
        <p>This is the dedicated terms page.</p>
      </div>
    </div>
  );
}
