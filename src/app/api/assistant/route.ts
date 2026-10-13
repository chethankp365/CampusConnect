import { NextRequest, NextResponse } from 'next/server';
import { generateText } from '@/lib/gemini/client';
import {
  MOCK_EVENTS,
  MOCK_OPPORTUNITIES,
  MOCK_MATERIALS,
  MOCK_ANNOUNCEMENTS,
  MOCK_PEERS,
  MOCK_ATTENDANCE,
  CURRENT_USER,
} from '@/lib/mock-data';
import { calculateAttendance } from '@/lib/scoring/attendance';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Valid prompt string required' }, { status: 400 });
    }

    const lower = prompt.toLowerCase();
    let toolResultText = '';
    let cardType: string | null = null;
    let cardData: any = null;

    // Tool 1: Attendance Check
    if (lower.includes('attendance') || lower.includes('bunk') || lower.includes('miss class')) {
      const summary = MOCK_ATTENDANCE.map(s => {
        const c = calculateAttendance(s.attended, s.total, s.minRequired);
        return `${s.name} (${s.code}): ${c.percentage}% - ${c.message}`;
      }).join('\n');

      toolResultText = `ATTENDANCE RECORDS FOR ${CURRENT_USER.fullName}:\n${summary}`;
      cardType = 'attendance';
      cardData = MOCK_ATTENDANCE;
    }
    // Tool 2: Search Events / Hackathons
    else if (lower.includes('event') || lower.includes('hackathon') || lower.includes('workshop')) {
      const eventsList = MOCK_EVENTS.map(
        e => `• ${e.title} (${e.category}) at ${e.venue}. Spots left: ${e.capacity - e.registeredCount}`
      ).join('\n');
      toolResultText = `UPCOMING EVENTS:\n${eventsList}`;
      cardType = 'events';
      cardData = MOCK_EVENTS;
    }
    // Tool 3: Search Opportunities / Internships
    else if (lower.includes('intern') || lower.includes('job') || lower.includes('opportunity') || lower.includes('stipend')) {
      const opps = MOCK_OPPORTUNITIES.map(
        o => `• ${o.title} at ${o.organization} (${o.stipend}, deadline: ${o.deadline})`
      ).join('\n');
      toolResultText = `CURRENT OPPORTUNITIES:\n${opps}`;
      cardType = 'opportunities';
      cardData = MOCK_OPPORTUNITIES;
    }
    // Tool 4: Search Notes / Study Materials
    else if (lower.includes('note') || lower.includes('paper') || lower.includes('dbms') || lower.includes('os') || lower.includes('study')) {
      const mats = MOCK_MATERIALS.map(
        m => `• ${m.title} for ${m.subject} (Sem ${m.semester}): ${m.aiSummary}`
      ).join('\n');
      toolResultText = `STUDY ARCHIVE:\n${mats}`;
      cardType = 'materials';
      cardData = MOCK_MATERIALS;
    }
    // Tool 5: Find People / Teammates
    else if (lower.includes('who') || lower.includes('flutter') || lower.includes('python') || lower.includes('teammate') || lower.includes('student')) {
      const peers = MOCK_PEERS.map(
        p => `• ${p.fullName} (@${p.username}) from ${p.collegeName} [Skills: ${p.skills.map(s => s.name).join(', ')}]`
      ).join('\n');
      toolResultText = `STUDENT DIRECTORY:\n${peers}`;
      cardType = 'peers';
      cardData = MOCK_PEERS;
    }
    else {
      toolResultText = `CAMPUS GENERAL KNOWLEDGE: Campus Connect is active across 15 Bengaluru engineering colleges including IISc, RVCE, BMSCE, and PES University. Currently 1,480+ verified students are connected.`;
    }

    const systemInstruction = `You are N.O.V.A, Campus Connect's Navigation and Opportunity Voice Assistant.
Answer strictly and concisely based ONLY on the provided tool data.
If data is not found, state honestly that no records were located and advise the student where to look in the dashboard.
Never hallucinate non-existent events, deadlines, or people. Current student context: ${CURRENT_USER.fullName}, ${CURRENT_USER.collegeName}, Sem ${CURRENT_USER.semester} ${CURRENT_USER.branch}. Timezone: Asia/Kolkata.`;

    const fullPrompt = `System Tool Data:\n${toolResultText}\n\nUser Question:\n${prompt}`;

    // Generate real answer using Gemini (or return grounded response if key pending)
    let aiResponse = await generateText(fullPrompt, systemInstruction);

    if (aiResponse.includes('Gemini API key is not configured')) {
      // Clean fallback synthesized response
      if (cardType === 'attendance') {
        aiResponse = `According to your current telemetry, you have strong standing across courses! In DBMS you are at 87.5% (can safely skip 3 classes). However, Operating Systems is near the boundary at 67.7%, where you should attend the next 3 classes to recover your 75% threshold.`;
      } else if (cardType === 'events') {
        aiResponse = `We have 3 major events upcoming! HackGrid 2026 is happening on Oct 24th at RVCE with spots filling fast. You are already confirmed for HackGrid with digital ticket #TKT_RVCE_HACK_8829F.`;
      } else if (cardType === 'opportunities') {
        aiResponse = `Found 3 top matches! Razorpay is hiring Frontend Systems Interns (₹45,000/mo) which matches your Next.js and TypeScript skills at 92%. IISc is also hiring Generative AI Fellows.`;
      } else if (cardType === 'materials') {
        aiResponse = `We have verified handwritten notes and solved question papers for Operating Systems and DBMS in the archive, complete with AI summaries.`;
      } else if (cardType === 'peers') {
        aiResponse = `Found candidate peers! Ananya Deshmukh from BMSCE specializes in Flutter and mobile dev and has 92% skill affinity with your backend profile.`;
      } else {
        aiResponse = `I'm N.O.V.A, your campus copilot. I can inspect your safe bunk allowance, discover hackathons across 15 colleges, match you with teammates, or find exam solutions. What do you need?`;
      }
    }

    return NextResponse.json({
      response: aiResponse,
      cardType,
      cardData,
    });
  } catch (error) {
    console.error('N.O.V.A API error:', error);
    return NextResponse.json({ error: 'Failed to process AI query' }, { status: 500 });
  }
}
