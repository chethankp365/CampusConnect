'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { HudLabel } from '@/components/ui/HudLabel';
import { BracketCard } from '@/components/ui/BracketCard';
import { PillButton } from '@/components/ui/PillButton';
import { StatusLED } from '@/components/ui/StatusLED';
import { MOCK_MATERIALS } from '@/lib/mock-data';
import {
  FileText,
  Search,
  Upload,
  Download,
  ThumbsUp,
  Bookmark,
  Share2,
  X,
  Sparkles,
  Filter,
  CheckCircle,
  FileCheck,
} from 'lucide-react';
import { toast } from 'sonner';

export default function MaterialsPage() {
  const [materials, setMaterials] = useState(MOCK_MATERIALS);
  const [search, setSearch] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<typeof MOCK_MATERIALS[0] | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDesc, setUploadDesc] = useState('');
  const [uploadSubject, setUploadSubject] = useState('Operating Systems Principles');
  const [uploadSem, setUploadSem] = useState(5);
  const [isUploading, setIsUploading] = useState(false);

  const filtered = materials.filter(m => {
    const matchSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchSem = selectedSemester === 'all' || m.semester === selectedSemester;
    const matchType = selectedType === 'all' || m.type === selectedType;
    return matchSearch && matchSem && matchType;
  });

  const handleUpvote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMaterials(prev =>
      prev.map(m => (m.id === id ? { ...m, upvotes: m.upvotes + 1 } : m))
    );
    toast.success('Material upvoted! +2 XP awarded to contributor.');
  };

  const handleDownload = (material: typeof MOCK_MATERIALS[0]) => {
    toast.info(`Generating short-lived signed link for ${material.title}...`);
    setTimeout(() => {
      toast.success('Download initialized.');
    }, 400);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    setIsUploading(true);
    setTimeout(() => {
      const newEntry = {
        id: `mat_${Date.now()}`,
        title: uploadTitle,
        description: uploadDesc || 'Uploaded lecture resource notes.',
        subject: uploadSubject,
        college: 'RV College of Engineering',
        semester: uploadSem,
        type: 'notes' as const,
        uploaderName: 'Arjun Venkatesh',
        uploaderUsername: 'arjun_v',
        downloads: 0,
        upvotes: 1,
        tags: ['New', 'LectureNotes', 'Verified'],
        aiSummary: 'Auto-extracted 3-line Gemini summary: Core theoretical principles, practical lab exercises, and sample quiz solutions.',
        status: 'approved' as const,
        createdAt: new Date().toISOString(),
      };
      setMaterials([newEntry, ...materials]);
      setIsUploading(false);
      setUploadModalOpen(false);
      setUploadTitle('');
      toast.success('Material submitted! +20 XP awarded upon peer verification.');
    }, 800);
  };

  return (
    <AppShell>
      <div className="space-y-10 font-body">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-zinc-900">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <HudLabel label="ARCHIVE // REPOSITORY" color="cyan" />
              <span className="text-zinc-500 font-mono text-sm">• 840+ Verified Academic Documents</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight">
              Study Materials &amp; Exam Solutions
            </h1>
            <p className="text-zinc-400 font-mono text-sm max-w-2xl">
              Semester-sorted syllabi, handwritten lecture notes, and past 5-year question papers across engineering colleges.
            </p>
          </div>

          <PillButton variant="signal" onClick={() => setUploadModalOpen(true)} className="text-sm px-6 py-3">
            <Upload className="w-4 h-4 mr-2" /> Upload Material (+20 XP)
          </PillButton>
        </div>

        {/* Filter & Search Bar - Spacious */}
        <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-zinc-500 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search by topic, keyword, or course code (e.g. 'Operating Systems', 'CS501', 'Normalization')..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 font-mono text-sm focus:outline-none focus:border-cyan"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedSemester}
                onChange={e => setSelectedSemester(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="px-4 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 font-mono text-sm focus:outline-none"
              >
                <option value="all">All Semesters</option>
                <option value="3">3rd Semester</option>
                <option value="4">4th Semester</option>
                <option value="5">5th Semester</option>
                <option value="6">6th Semester</option>
              </select>

              <select
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                className="px-4 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 font-mono text-sm focus:outline-none"
              >
                <option value="all">All Document Types</option>
                <option value="notes">Lecture Notes</option>
                <option value="question_paper">Question Papers</option>
                <option value="cheatsheet">Formula Cheatsheets</option>
              </select>
            </div>
          </div>
        </div>

        {/* Materials Grid - Generous Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(mat => (
            <BracketCard
              key={mat.id}
              headerTag={`SEM 0${mat.semester} // ${mat.type.toUpperCase()}`}
              glowColor="cyan"
              className="cursor-pointer flex flex-col justify-between p-8 hover:scale-[1.01] transition-transform"
            >
              <div onClick={() => setSelectedMaterial(mat)} className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="font-semibold text-cyan truncate">{mat.subject}</span>
                  <span className="text-zinc-500">{mat.college}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-heading font-semibold text-white group-hover:text-cyan transition-colors line-clamp-2">
                  {mat.title}
                </h3>

                <p className="text-xs sm:text-sm font-mono text-zinc-400 line-clamp-2 leading-relaxed">
                  {mat.description}
                </p>

                {mat.aiSummary && (
                  <div className="p-3.5 rounded-xl bg-cyan/5 border border-cyan/20 text-xs font-mono text-zinc-300">
                    <span className="text-cyan font-bold block mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> GEMINI AI SYNTHESIS
                    </span>
                    <span className="line-clamp-2 leading-relaxed">{mat.aiSummary}</span>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-zinc-900 mt-6 flex items-center justify-between font-mono text-xs sm:text-sm text-zinc-400">
                <button
                  onClick={e => handleUpvote(mat.id, e)}
                  className="flex items-center gap-2 hover:text-acid transition-colors cursor-pointer"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span className="font-bold">{mat.upvotes}</span>
                </button>

                <div className="flex items-center gap-4">
                  <span className="text-zinc-500 text-xs">{mat.downloads} Downloads</span>
                  <button
                    onClick={() => handleDownload(mat)}
                    className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white transition-colors cursor-pointer"
                    title="Download File"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </BracketCard>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedMaterial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="w-full max-w-3xl rounded-3xl bg-zinc-950 border border-zinc-800 p-8 sm:p-10 space-y-6 font-mono text-xs sm:text-sm max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-start justify-between pb-4 border-b border-zinc-800">
                <div className="space-y-1">
                  <HudLabel label={`SEM 0${selectedMaterial.semester} // ${selectedMaterial.type.toUpperCase()}`} color="acid" />
                  <h2 className="text-2xl font-heading font-bold text-white mt-2">
                    {selectedMaterial.title}
                  </h2>
                  <p className="text-zinc-400 text-xs mt-1">
                    Uploaded by @{selectedMaterial.uploaderUsername} • {selectedMaterial.college}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedMaterial(null)}
                  className="p-2 rounded-lg text-zinc-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <span className="text-zinc-500 uppercase tracking-wider block mb-1 text-xs">Description</span>
                  <p className="text-zinc-300 leading-relaxed text-sm">{selectedMaterial.description}</p>
                </div>

                <div className="p-5 rounded-2xl bg-cyan/5 border border-cyan/20 space-y-2">
                  <span className="text-cyan font-bold flex items-center gap-2 text-xs">
                    <Sparkles className="w-4 h-4" /> GEMINI AI SYNTHESIS
                  </span>
                  <p className="text-zinc-200 leading-relaxed text-sm">{selectedMaterial.aiSummary}</p>
                </div>

                <div>
                  <span className="text-zinc-500 uppercase tracking-wider block mb-2 text-xs">Course &amp; Tags</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-medium">
                      {selectedMaterial.subject}
                    </span>
                    {selectedMaterial.tags.map(t => (
                      <span key={t} className="px-3 py-1.5 rounded-lg bg-zinc-900/50 text-zinc-400 text-xs">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-acid font-bold">{selectedMaterial.upvotes} Students Endorsed This Resource</span>
                <PillButton variant="signal" onClick={() => handleDownload(selectedMaterial)} className="text-sm px-6 py-3">
                  <Download className="w-4 h-4 mr-2" /> Download Verified PDF
                </PillButton>
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="w-full max-w-2xl rounded-3xl bg-zinc-950 border border-zinc-800 p-8 space-y-6 font-mono text-xs sm:text-sm">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <span className="font-bold text-white text-base uppercase">UPLOAD STUDY RESOURCE</span>
                <button onClick={() => setUploadModalOpen(false)} className="text-zinc-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-zinc-400 uppercase text-xs">Document Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Computer Networks Sliding Window Lab Notes"
                    value={uploadTitle}
                    onChange={e => setUploadTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-signal text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-400 uppercase text-xs">Subject</label>
                  <select
                    value={uploadSubject}
                    onChange={e => setUploadSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none text-sm"
                  >
                    <option>Operating Systems Principles</option>
                    <option>Database Management Systems</option>
                    <option>Computer Networks</option>
                    <option>Design &amp; Analysis of Algorithms</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-400 uppercase text-xs">Semester</label>
                  <input
                    type="number"
                    min={1}
                    max={8}
                    value={uploadSem}
                    onChange={e => setUploadSem(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none text-sm"
                  />
                </div>

                <div className="p-8 rounded-2xl border-2 border-dashed border-zinc-800 text-center space-y-3 hover:border-signal transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-zinc-500 mx-auto" />
                  <p className="text-zinc-300 text-sm font-medium">Drag &amp; drop PDF, DOCX, PPTX (Max 25 MB)</p>
                  <span className="text-xs text-zinc-500 block">Gemini AI will automatically generate summaries and tag clusters upon upload.</span>
                </div>

                <div className="pt-3 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setUploadModalOpen(false)}
                    className="px-6 py-2.5 rounded-full border border-zinc-800 text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <PillButton variant="signal" type="submit" disabled={isUploading} className="text-sm px-6 py-3">
                    {isUploading ? 'SUBMITTING & AI SCANNING...' : 'SUBMIT RESOURCE (+20 XP)'}
                  </PillButton>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
