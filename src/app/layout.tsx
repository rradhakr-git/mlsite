import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'ML Innovation Lab | Portfolio',
  description: 'Applied machine learning systems — from intent classification to multi-agent orchestration.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f8fafc] text-slate-900 leading-relaxed">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm tracking-tighter">
                  <span className="inline-block scale-x-[-1]">R</span>R
                </span>
              </div>
              <span className="text-lg font-extrabold tracking-tight">
                MLInnovationLab<span className="text-blue-600">.com</span>
              </span>
            </Link>
            <div className="flex space-x-6 text-xs font-bold uppercase tracking-widest text-slate-500">
              <Link href="/#philosophy" className="hover:text-blue-600 transition-colors">
                Philosophy
              </Link>
              <Link href="/pocs" className="hover:text-blue-600 transition-colors">
                POCs
              </Link>
              <Link href="/#contact" className="hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  );
}
