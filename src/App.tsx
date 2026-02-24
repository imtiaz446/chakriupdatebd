import React, { useState } from 'react';
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
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SAMPLE_JOBS, JobPost } from './types';

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
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = SAMPLE_JOBS.filter(job => 
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
              <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full">
                <Bell className="w-5 h-5" />
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
              সড়ক ও জনপথ অধিদপ্তর (RHD) নিয়োগ বিজ্ঞপ্তি ২০২৬ প্রকাশিত হয়েছে - ১৮৮ পদে বিশাল নিয়োগ...
            </div>
          </div>

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
                  {filteredJobs.filter(j => j.category === 'government').map(job => (
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
                  ))}
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
                  {filteredJobs.filter(j => j.category === 'bank').map(job => (
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
                  ))}
                </div>
              </section>

              {/* Private Jobs Section */}
              <section>
                <div className="flex justify-between items-end mb-6">
                  <h2 className="section-title">বেসরকারি চাকরি</h2>
                  <a href="#" className="text-sm font-bold text-bd-green flex items-center gap-1 hover:underline">
                    সবগুলো দেখুন <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
                <div className="grid gap-4">
                  {filteredJobs.filter(j => j.category === 'private').map(job => (
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
                          <GraduationCap className="w-4 h-4 text-bd-green" /> {job.education}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* SEO Titles / Latest Updates Section */}
              <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-bd-red" /> আজকের বিশেষ আপডেট
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "সরকারি চাকরির খবর ২০২৬: আজ ২৫ ফেব্রুয়ারি প্রকাশিত সকল নিয়োগ বিজ্ঞপ্তি",
                    "সড়ক ও জনপথ অধিদপ্তর (RHD) নিয়োগ বিজ্ঞপ্তি ২০২৬ - ১৮৮ পদে আবেদন করুন",
                    "সাপ্তাহিক চাকরির খবর ২০২৬: এই সপ্তাহের সেরা সরকারি ও বেসরকারি চাকরি",
                    "ডিসি অফিস নিয়োগ বিজ্ঞপ্তি ২০২৬ | সকল জেলার জেলা প্রশাসকের কার্যালয় চাকরি",
                    "ব্যাংক জব সার্কুলার ২০২৬: বাংলাদেশ ব্যাংকসহ সকল ব্যাংকের নিয়োগ আপডেট",
                    "প্রাথমিক শিক্ষক নিয়োগ বিজ্ঞপ্তি ২০২৬: আবেদন পদ্ধতি ও পরীক্ষার তারিখ",
                    "এনজিও নিয়োগ ২০২৬: ব্র্যাক এবং আশা এনজিওতে বিশাল নিয়োগ বিজ্ঞপ্তি",
                    "বাংলাদেশ রেলওয়ে নিয়োগ ২০২৬: নতুন সার্কুলার এবং অনলাইনে আবেদনের নিয়ম",
                    "পুলিশ নিয়োগ ২০২৬: কনস্টেবল এবং এসআই পদে আবেদনের যোগ্যতা ও সময়সূচি",
                    "আজকের চাকরির খবর ২০২৬: ২৫ ফেব্রুয়ারি প্রকাশিত সকল সরকারি নিয়োগ"
                  ].map((title, i) => (
                    <a key={i} href="#" className="text-sm text-slate-600 hover:text-bd-green flex items-start gap-2 group">
                      <span className="text-bd-red font-bold">{i + 1}.</span>
                      <span className="group-hover:underline">{title}</span>
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
                    { icon: Briefcase, label: 'সরকারি চাকরি', count: 124 },
                    { icon: Building2, label: 'ব্যাংক জব', count: 45 },
                    { icon: GraduationCap, label: 'বেসরকারি চাকরি', count: 89 },
                    { icon: FileText, label: 'অ্যাডমিট কার্ড', count: 12 },
                    { icon: Trophy, label: 'পরীক্ষার ফলাফল', count: 34 },
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

              {/* Important Notice */}
              <div className="bg-bd-red/5 rounded-2xl p-6 border border-bd-red/10">
                <h3 className="font-bold text-bd-red mb-3">জরুরি নোটিশ</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  আবেদনের সময় অবশ্যই সঠিক তথ্য প্রদান করবেন এবং রঙিন ছবি ও স্বাক্ষর স্ক্যান করে আপলোড করবেন। আবেদনের কপিটি ভবিষ্যতে ব্যবহারের জন্য ডাউনলোড করে প্রিন্ট করে রাখুন।
                </p>
              </div>
            </div>
          </div>
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
            <div>
              <h4 className="text-white font-bold mb-4">লিঙ্কসমূহ</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">আমাদের সম্পর্কে</a></li>
                <li><a href="#" className="hover:text-white">যোগাযোগ</a></li>
                <li><a href="#" className="hover:text-white">প্রাইভেসি পলিসি</a></li>
                <li><a href="#" className="hover:text-white">শর্তাবলী</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">ফলো করুন</h4>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-bd-green hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-bd-green hover:text-white transition-colors">
                  <Send className="w-5 h-5" />
                </a>
              </div>
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
                  {selectedJob.id === '1' && (
                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                      <p>• বয়স সীমা: ১৮ থেকে ৩০ বছর (কোটার ক্ষেত্রে ৩২ বছর)।</p>
                      <p>• বেতন স্কেল: ৯,৩০০ - ২২,৪৯০/- (গ্রেড-১৬) এবং সরকারি বিধি মোতাবেক অন্যান্য সুবিধা।</p>
                      <p>• আবেদন শুরুর তারিখ: ২৫ ফেব্রুয়ারি ২০২৬</p>
                    </div>
                  )}
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