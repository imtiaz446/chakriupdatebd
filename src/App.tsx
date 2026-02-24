import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Menu, 
  Bell, 
  Briefcase, 
  Building2, 
  GraduationCap, 
  FileText, 
  Trophy, 
  Calendar,
  Clock,
  ChevronRight,
  Facebook,
  Send,
  Download,
  ExternalLink,
  X,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { JobPost } from './types';

const CategoryBadge = ({ category }: { category: JobPost['category'] }) => {
  switch (category) {
    case 'government': return <span className="badge-gov">সরকারি চাকরি</span>;
    case 'bank': return <span className="badge-bank">ব্যাংক জব</span>;
    case 'private': return <span className="badge-private">বেসরকারি চাকরি</span>;
    case 'admit': return <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded">অ্যাডমিট কার্ড</span>;
    case 'result': return <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded">ফলাফল</span>;
    default: return null;
  }
};

export default function App() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/jobs');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await fetch('/api/scrape-now', { method: 'POST' });
      // Wait a bit for scraping to finish or just re-fetch after a delay
      setTimeout(fetchJobs, 5000);
    } catch (error) {
      console.error('Error refreshing jobs:', error);
    } finally {
      setTimeout(() => setIsRefreshing(false), 5000);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.organization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Header */}
      <header className="sticky-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-bd-green rounded-full flex items-center justify-center">
                <div className="w-5 h-5 bg-bd-red rounded-full"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-bd-green leading-none">ChakriUpdate<span className="text-bd-red">BD</span></h1>
                <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">চাকরি আপডেট বিডি</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-semibold text-slate-600 hover:text-bd-green">হোম</a>
              <a href="#" className="text-sm font-semibold text-slate-600 hover:text-bd-green">সরকারি চাকরি</a>
              <a href="#" className="text-sm font-semibold text-slate-600 hover:text-bd-green">ব্যাংক জব</a>
              <a href="#" className="text-sm font-semibold text-slate-600 hover:text-bd-green">বেসরকারি</a>
              <a href="#" className="text-sm font-semibold text-slate-600 hover:text-bd-green">রেজাল্ট</a>
            </nav>

            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <input 
                  type="text" 
                  placeholder="সার্চ করুন..." 
                  className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-bd-green/20 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              </div>
              <button 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-all ${isRefreshing ? 'animate-spin' : ''}`}
                title="নতুন চাকরির খবর খুঁজুন"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button className="md:hidden p-2 text-slate-600">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow bg-slate-50/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breaking News Ticker */}
          <div className="bg-white border border-slate-100 rounded-lg p-3 mb-8 flex items-center gap-4 overflow-hidden shadow-sm">
            <div className="bg-bd-red text-white text-xs font-bold px-3 py-1 rounded whitespace-nowrap animate-pulse">
              ব্রেকিং নিউজ
            </div>
            <div className="text-sm text-slate-600 whitespace-nowrap">
              {jobs.length > 0 ? jobs[0].title : 'নতুন চাকরির খবরের জন্য অপেক্ষা করুন...'}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <RefreshCw className="w-10 h-10 text-bd-green animate-spin mb-4" />
              <p className="text-slate-500">চাকরির খবর লোড হচ্ছে...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                
                {/* Government Jobs Section */}
                <section>
                  <div className="flex justify-between items-end mb-6">
                    <h2 className="section-title">ব্রেকিং সরকারি চাকরি</h2>
                    <a href="#" className="text-sm font-bold text-bd-green flex items-center gap-1 hover:underline">
                      সবগুলো দেখুন <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="grid gap-4">
                    {filteredJobs.filter(j => j.category === 'government').length > 0 ? (
                      filteredJobs.filter(j => j.category === 'government').map(job => (
                        <motion.div 
                          key={job.id}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="job-card cursor-pointer"
                          onClick={() => setSelectedJob(job)}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <CategoryBadge category={job.category} />
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {job.postedDate}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-800 mb-2 hover:text-bd-green transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <Building2 className="w-4 h-4 text-bd-green" /> {job.organization}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Briefcase className="w-4 h-4 text-bd-green" /> পদ: {job.positions}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-bd-red" /> শেষ তারিখ: {job.deadline}
                            </span>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-slate-400 text-center py-10 bg-white rounded-xl border border-dashed border-slate-200">কোনো সরকারি চাকরি পাওয়া যায়নি।</p>
                    )}
                  </div>
                </section>

                {/* Bank Jobs Section */}
                <section>
                  <div className="flex justify-between items-end mb-6">
                    <h2 className="section-title">ব্যাংক জব সার্কুলার</h2>
                    <a href="#" className="text-sm font-bold text-bd-green flex items-center gap-1 hover:underline">
                      সবগুলো দেখুন <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="grid gap-4">
                    {filteredJobs.filter(j => j.category === 'bank').length > 0 ? (
                      filteredJobs.filter(j => j.category === 'bank').map(job => (
                        <motion.div 
                          key={job.id}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="job-card cursor-pointer"
                          onClick={() => setSelectedJob(job)}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <CategoryBadge category={job.category} />
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {job.postedDate}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-800 mb-2">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <Building2 className="w-4 h-4 text-bd-green" /> {job.organization}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Briefcase className="w-4 h-4 text-bd-green" /> {job.positions}
                            </span>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-slate-400 text-center py-10 bg-white rounded-xl border border-dashed border-slate-200">কোনো ব্যাংক জব পাওয়া যায়নি।</p>
                    )}
                  </div>
                </section>

                {/* SEO Titles Section */}
                <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                  <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-bd-red" /> আজকের বিশেষ আপডেট
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {jobs.slice(0, 10).map((job, i) => (
                      <a key={i} href="#" onClick={() => setSelectedJob(job)} className="text-sm text-slate-600 hover:text-bd-green flex items-start gap-2 group">
                        <span className="text-bd-red font-bold">{i + 1}.</span>
                        <span className="group-hover:underline">{job.title}</span>
                      </a>
                    ))}
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Social Join */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-800 mb-4">আমাদের সাথে যুক্ত থাকুন</h3>
                  <div className="grid gap-3">
                    <a href="#" className="flex items-center justify-center gap-2 bg-[#1877F2] text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                      <Facebook className="w-5 h-5" /> Facebook Group
                    </a>
                    <a href="#" className="flex items-center justify-center gap-2 bg-[#0088cc] text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                      <Send className="w-5 h-5" /> Telegram Channel
                    </a>
                  </div>
                </div>

                {/* Categories Quick Links */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-800 mb-4">ক্যাটাগরি</h3>
                  <div className="grid gap-2">
                    {[
                      { icon: Briefcase, label: 'সরকারি চাকরি', count: jobs.filter(j => j.category === 'government').length },
                      { icon: Building2, label: 'ব্যাংক জব', count: jobs.filter(j => j.category === 'bank').length },
                      { icon: GraduationCap, label: 'বেসরকারি চাকরি', count: jobs.filter(j => j.category === 'private').length },
                      { icon: FileText, label: 'অ্যাডমিট কার্ড', count: 0 },
                      { icon: Trophy, label: 'পরীক্ষার ফলাফল', count: 0 },
                    ].map((cat, i) => (
                      <a key={i} href="#" className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 group">
                        <span className="flex items-center gap-3 text-sm text-slate-600 group-hover:text-bd-green">
                          <cat.icon className="w-4 h-4" /> {cat.label}
                        </span>
                        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{cat.count}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-bd-green rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-bd-red rounded-full"></div>
                </div>
                <h2 className="text-xl font-bold text-white">ChakriUpdate<span className="text-bd-red">BD</span></h2>
              </div>
              <p className="text-sm leading-relaxed max-w-md">
                বাংলাদেশের সেরা চাকরির খবর ওয়েবসাইট ChakriUpdateBD। এখানে প্রতিদিনের সরকারি চাকরি, ব্যাংক জব, বেসরকারি চাকরি এবং পরীক্ষার রেজাল্ট সবার আগে আপডেট দেওয়া হয়।
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-xs">
            &copy; ২০২৬ ChakriUpdateBD. সর্বস্বত্ব সংরক্ষিত।
          </div>
        </div>
      </footer>

      {/* Job Detail Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-3xl max-height-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedJob(null)}
                className="absolute right-6 top-6 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>

              <div className="p-8">
                <div className="mb-6">
                  <CategoryBadge category={selectedJob.category} />
                  <h2 className="text-2xl font-bold text-slate-800 mt-4 mb-2">{selectedJob.title}</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {selectedJob.organization}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> প্রকাশিত: {selectedJob.postedDate}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-slate-50 p-4 rounded-2xl">
                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">পদ সংখ্যা</p>
                    <p className="font-bold text-slate-800">{selectedJob.positions || 'উল্লেখ নেই'}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl">
                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">আবেদনের শেষ তারিখ</p>
                    <p className="font-bold text-bd-red">{selectedJob.deadline}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl">
                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">শিক্ষাগত যোগ্যতা</p>
                    <p className="font-bold text-slate-800">{selectedJob.education}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl">
                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">বেতন/অভিজ্ঞতা</p>
                    <p className="font-bold text-slate-800">{selectedJob.salary || selectedJob.experience || 'বিধি মোতাবেক'}</p>
                  </div>
                </div>

                <div className="prose prose-slate max-w-none mb-8">
                  <h4 className="text-lg font-bold text-slate-800 mb-3">বিস্তারিত তথ্য:</h4>
                  <p className="text-slate-600 leading-relaxed">
                    {selectedJob.details || 'এই নিয়োগ বিজ্ঞপ্তির বিস্তারিত তথ্য শীঘ্রই আপডেট করা হবে। অনুগ্রহ করে অফিশিয়াল ওয়েবসাইট ভিজিট করুন।'}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-100">
                  {selectedJob.applyLink && (
                    <a href={selectedJob.applyLink} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" /> অনলাইনে আবেদন করুন
                    </a>
                  )}
                  <button className="btn-secondary flex items-center gap-2">
                    <Download className="w-4 h-4" /> সার্কুলার PDF ডাউনলোড
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
