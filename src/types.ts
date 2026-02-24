export interface JobPost {
  id: string;
  title: string;
  organization: string;
  positions?: string | number;
  deadline: string;
  education: string;
  category: 'government' | 'bank' | 'private' | 'admit' | 'result';
  salary?: string;
  experience?: string;
  postedDate: string;
  details?: string;
  applyLink?: string;
  pdfLink?: string;
}

export const SAMPLE_JOBS: JobPost[] = [
  {
    id: '1',
    title: 'সড়ক ও জনপথ অধিদপ্তর নিয়োগ বিজ্ঞপ্তি ২০২৬',
    organization: 'সড়ক ও জনপথ অধিদপ্তর (RHD)',
    positions: '১৮৮টি',
    deadline: '১৫ মার্চ ২০২৬',
    education: 'এইচএসসি/স্নাতক',
    category: 'government',
    postedDate: '২৫ ফেব্রুয়ারি ২০২৬',
    details: 'সড়ক ও জনপথ অধিদপ্তর (RHD) তাদের শূন্য পদসমূহ পূরণের লক্ষে নতুন নিয়োগ বিজ্ঞপ্তি প্রকাশ করেছে। পদের নাম: অফিস সহকারী কাম-কম্পিউটার মুদ্রাক্ষরিক, গাড়িচালক এবং অন্যান্য।',
    applyLink: 'http://rhd.teletalk.com.bd',
    pdfLink: '#'
  },
  {
    id: '2',
    title: 'বাংলাদেশ নৌবাহিনী বেসামরিক পদ নিয়োগ ২০২৬',
    organization: 'বাংলাদেশ নৌবাহিনী',
    positions: '১০২টি',
    deadline: '১০ মার্চ ২০২৬',
    education: '৮ম শ্রেণি/এসএসসি/এইচএসসি',
    category: 'government',
    postedDate: '২৫ ফেব্রুয়ারি ২০২৬'
  },
  {
    id: '3',
    title: 'ব্যাংক এশিয়া লিমিটেড নিয়োগ বিজ্ঞপ্তি ২০২৬',
    organization: 'ব্যাংক এশিয়া লিমিটেড',
    positions: 'রিলেশনশিপ অফিসার',
    deadline: '০৫ মার্চ ২০২৬',
    education: 'স্নাতক',
    category: 'bank',
    salary: 'আলোচনা সাপেক্ষে',
    postedDate: '২৪ ফেব্রুয়ারি ২০২৬'
  },
  {
    id: '4',
    title: 'জেলা প্রশাসকের কার্যালয় (ডিসি অফিস) নিয়োগ ২০২৬',
    organization: 'জেলা প্রশাসকের কার্যালয়, ঢাকা',
    positions: '৪৫টি',
    deadline: '২০ মার্চ ২০২৬',
    education: 'স্নাতক/স্নাতকোত্তর',
    category: 'government',
    postedDate: '২৩ ফেব্রুয়ারি ২০২৬'
  },
  {
    id: '5',
    title: 'স্কয়ার ফার্মাসিউটিক্যালস নিয়োগ বিজ্ঞপ্তি ২০২৬',
    organization: 'স্কয়ার ফার্মাসিউটিক্যালস লিঃ',
    positions: 'মেডিক্যাল প্রমোশন অফিসার',
    deadline: '০২ মার্চ ২০২৬',
    education: 'স্নাতক',
    experience: 'ফ্রেশাররা আবেদন করতে পারবেন',
    category: 'private',
    postedDate: '২২ ফেব্রুয়ারি ২০২৬'
  }
];
