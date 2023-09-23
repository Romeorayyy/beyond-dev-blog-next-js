import InsightRoll from '@/src/components/About/InsightRoll';

const insights = [
  'Passionate about Web Design & SEO',
  'Dedicated to advancing Generative AI',
  'Committed to sharing Financial Insights',
  'Coding, Side Hustles, and Affiliate Marketing Blogger',
  'Exploring Topics that Pique My Interest 🌐',
];

export default function AboutLayout({ children }) {
  return (
    <main className="w-full flex flex-col items-center justify-between">
      <InsightRoll insights={insights} />
      {children}
    </main>
  );
}
