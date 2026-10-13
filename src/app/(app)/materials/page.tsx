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
      <div className="space-y-8 font-body">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HudLabel label="ARCHIVE // REPOSITORY" color="cyan" />
              <span className="text-zinc-500 font-mono text-xs">• 840+ Verified Documents</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-white tracking-tight">
              Study Materials &amp; Exam Solutions
            </h1>
            <p className="text-zinc-400 font-mono text-xs mt-0.5">
              Semester-sorted syllabi, handwritten lecture notes, and question papers across engineering colleges.
            </p>
          </div>

          <PillButton variant="signal" onClick={() => setUploadModalOpen(true)}>
            <Upload className="w-3.5 h-3.5 mr-1.5" /> Upload Material
          </PillButton>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by topic, keyword, or course code (e.g. 'Operating Systems', 'CS501')..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 font-mono text-xs focus:outline-none focus:border-cyan"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedSemester}
                onChange={e => setSelectedSemester(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs focus:outline-none"
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
                className="px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs focus:outline-none"
              >
                <option value="all">All Material Types</option>
                <option value="notes">Notes</option>
                <option value="question_paper">Question Papers</option>
                <option value="cheatsheet">Cheatsheets</option>
              </select>
            </div>
          </div>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(mat => (
            <BracketCard
              key={mat.id}
              headerTag={`SEM 0${mat.semester} // ${mat.type.toUpperCase()}`}
              glowColor="cyan"
              className="cursor-pointer flex flex-col justify-between"
            >
              <div onClick={() => setSelectedMaterial(mat)} className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="truncate">{mat.subject}</span>
                  <span className="text-zinc-500">{mat.college}</span>
                </div>

                <h3 className="text-base font-semibold text-white group-hover:text-cyan transition-colors line-clamp-2">
                  {mat.title}
                </h3>

                <p className="text-xs font-mono text-zinc-400 line-clamp-2 leading-relaxed">
                  {mat.description}
                </p>

                {mat.aiSummary && (
                  <div className="p-2.5 rounded-lg bg-cyan/5 border border-cyan/20 text-[11px] font-mono text-zinc-300">
                    <span className="text-cyan font-bold block mb-0.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> AI SUMMARY
                    </span>
                    <span className="line-clamp-2">{mat.aiSummary}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-zinc-900 mt-4 flex items-center justify-between font-mono text-xs text-zinc-400">
                <button
                  onClick={e => handleUpvote(mat.id, e)}
                  className="flex items-center gap-1.5 hover:text-acid transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{mat.upvotes}</span>
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-zinc-500 text-[10px]">{mat.downloads} DL</span>
                  <button
                    onClick={() => handleDownload(mat)}
                    className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white transition-colors"
                    title="Download File"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </BracketCard>
          ))}
        </div>

        {/* Detail Drawer Modal */}
        {selectedMaterial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-2xl rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-6 font-mono text-xs max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between pb-4 border-b border-zinc-800">
                <div>
                  <HudLabel label={`SEM 0${selectedMaterial.semester} // ${selectedMaterial.type.toUpperCase()}`} color="acid" />
                  <h2 className="text-xl font-heading font-semibold text-white mt-2">
                    {selectedMaterial.title}
                  </h2>
                  <p className="text-zinc-400 text-xs mt-1">
                    Uploaded by @{selectedMaterial.uploaderUsername} • {selectedMaterial.college}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedMaterial(null)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-zinc-500 uppercase tracking-wider block mb-1">Description</span>
                  <p className="text-zinc-300 leading-relaxed">{selectedMaterial.description}</p>
                </div>

                <div className="p-4 rounded-xl bg-cyan/5 border border-cyan/20 space-y-2">
                  <span className="text-cyan font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> GEMINI AI SYNTHESIS
                  </span>
                  <p className="text-zinc-300 leading-relaxed">{selectedMaterial.aiSummary}</p>
                </div>

                <div>
                  <span className="text-zinc-500 uppercase tracking-wider block mb-2">Subject &amp; Tags</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-white">
                      {selectedMaterial.subject}
                    </span>
                    {selectedMaterial.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded bg-zinc-900/50 text-zinc-400 text-[10px]">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-acid font-bold">{selectedMaterial.upvotes} Students Found This Helpful</span>
                <PillButton variant="signal" onClick={() => handleDownload(selectedMaterial)}>
                  <Download className="w-3.5 h-3.5 mr-1.5" /> Download Verified PDF
                </PillButton>
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-5 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="font-bold text-white text-sm uppercase">UPLOAD STUDY RESOURCE</span>
                <button onClick={() => setUploadModalOpen(false)} className="text-zinc-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px]">Document Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Computer Networks Sliding Window Lab Notes"
                    value={uploadTitle}
                    onChange={e => setUploadTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-signal"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px]">Subject</label>
                  <select
                    value={uploadSubject}
                    onChange={e => setUploadSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
                  >
                    <option>Operating Systems Principles</option>
                    <option>Database Management Systems</option>
                    <option>Computer Networks</option>
                    <option>Design &amp; Analysis of Algorithms</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px]">Semester</label>
                  <input
                    type="number"
                    min={1}
                    max={8}
                    value={uploadSem}
                    onChange={e => setUploadSem(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
                  />
                </div>

                {/* Drag & Drop Simulation */}
                <div className="p-6 rounded-xl border-2 border-dashed border-zinc-800 text-center space-y-2 hover:border-signal transition-colors cursor-pointer">
                  <Upload className="w-6 h-6 text-zinc-500 mx-auto" />
                  <p className="text-zinc-400 text-xs">Drag &amp; drop PDF, DOCX, PPTX (Max 25 MB)</p>
                  <span className="text-[10px] text-zinc-600 block">Gemini AI will automatically generate summaries and tag clusters.</span>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setUploadModalOpen(false)}
                    className="px-4 py-2 rounded-full border border-zinc-800 text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <PillButton variant="signal" type="submit" disabled={isUploading}>
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
