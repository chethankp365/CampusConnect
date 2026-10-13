-- =====================================================================
-- CAMPUS CONNECT SEED DATA
-- 15 Bengaluru Colleges, 120+ Skills by Category, 12+ Badges & Demo Content
-- =====================================================================

-- 1. COLLEGES (15 Bengaluru & Top Karnataka Colleges)
INSERT INTO colleges (name, city, state, email_domain, logo_url, verified) VALUES
('Indian Institute of Science (IISc)', 'Bengaluru', 'Karnataka', 'iisc.ac.in', 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop', true),
('RV College of Engineering (RVCE)', 'Bengaluru', 'Karnataka', 'rvce.edu.in', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop', true),
('BMS College of Engineering (BMSCE)', 'Bengaluru', 'Karnataka', 'bmsce.ac.in', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop', true),
('PES University (Ring Road Campus)', 'Bengaluru', 'Karnataka', 'pes.edu', 'https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd?w=100&h=100&fit=crop', true),
('PES University (Electronic City)', 'Bengaluru', 'Karnataka', 'ec.pes.edu', 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=100&h=100&fit=crop', true),
('M.S. Ramaiah Institute of Technology (MSRIT)', 'Bengaluru', 'Karnataka', 'msrit.edu', 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=100&h=100&fit=crop', true),
('Dayananda Sagar College of Engineering (DSCE)', 'Bengaluru', 'Karnataka', 'dsce.edu.in', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=100&h=100&fit=crop', true),
('Bangalore Institute of Technology (BIT)', 'Bengaluru', 'Karnataka', 'bit-bangalore.edu.in', 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=100&h=100&fit=crop', true),
('Sir M. Visvesvaraya Institute of Technology (SMVIT)', 'Bengaluru', 'Karnataka', 'sirmvit.edu', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&h=100&fit=crop', true),
('New Horizon College of Engineering (NHCE)', 'Bengaluru', 'Karnataka', 'newhorizonindia.edu', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop', true),
('BMS Institute of Technology & Management (BMSIT)', 'Bengaluru', 'Karnataka', 'bmsit.in', 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=100&h=100&fit=crop', true),
('Nitte Meenakshi Institute of Technology (NMIT)', 'Bengaluru', 'Karnataka', 'nmit.ac.in', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=100&h=100&fit=crop', true),
('Christ University (Faculty of Engineering)', 'Bengaluru', 'Karnataka', 'christuniversity.in', 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=100&h=100&fit=crop', true),
('International Institute of Information Technology Bangalore (IIIT-B)', 'Bengaluru', 'Karnataka', 'iiitb.ac.in', 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=100&h=100&fit=crop', true),
('Reva University', 'Bengaluru', 'Karnataka', 'reva.edu.in', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=100&h=100&fit=crop', true)
ON CONFLICT (name) DO NOTHING;

-- 2. BADGES (12+ Badges with Icons and Criteria)
INSERT INTO badges (slug, name, description, icon, criteria) VALUES
('welcome', 'Pioneer Badge', 'Joined the Campus Connect neural grid', 'Sparkles', '{"event": "signup"}'),
('early_bird', 'Early Bird', 'Achieved 100+ XP in the ecosystem', 'Sunrise', '{"min_xp": 100}'),
('first_upload', 'Knowledge Donor', 'Published your first verified study note or paper', 'FileText', '{"action": "approved_upload", "count": 1}'),
('7_day_streak', 'Consistency Cipher', 'Maintained a 7-day active study streak', 'Flame', '{"streak": 7}'),
('30_day_streak', 'Mainframe Veteran', 'Maintained an incredible 30-day active streak', 'Zap', '{"streak": 30}'),
('connector', 'Neural Networker', 'Established 5+ cross-campus student connections', 'Users', '{"connections": 5}'),
('event_hero', 'Campus Voyager', 'Registered and checked in at 3 campus events', 'Ticket', '{"events_checked_in": 3}'),
('top_contributor', 'High Frequency Node', 'Earned 500+ XP contributing notes and help', 'Trophy', '{"min_xp": 500}'),
('team_player', 'Collab Catalyst', 'Joined or led a successful collaboration project', 'Layers', '{"collabs": 1}'),
('mentor', 'Guiding Light', 'Enabled mentorship mode and supported junior peers', 'Compass', '{"is_mentor": true}'),
('code_architect', 'Code Architect', 'Verified proficiency in 5+ software skills', 'Code', '{"skills_verified": 5}'),
('attendance_ace', 'Sentinel of Class', 'Kept attendance above 85% across all courses', 'ShieldCheck', '{"min_attendance": 85}')
ON CONFLICT (slug) DO NOTHING;

-- 3. SKILLS (120+ by category)
INSERT INTO skills (name, category) VALUES
-- Frontend & Web
('React.js', 'Frontend'), ('Next.js', 'Frontend'), ('Vue.js', 'Frontend'), ('Angular', 'Frontend'),
('Svelte', 'Frontend'), ('HTML5', 'Frontend'), ('CSS3 / SCSS', 'Frontend'), ('Tailwind CSS', 'Frontend'),
('TypeScript', 'Frontend'), ('JavaScript (ES6+)', 'Frontend'), ('Three.js', 'Frontend'), ('WebGL', 'Frontend'),
('Framer Motion', 'Frontend'), ('WebAssembly', 'Frontend'), ('Progressive Web Apps (PWA)', 'Frontend'),

-- Backend & Systems
('Node.js', 'Backend'), ('Express.js', 'Backend'), ('NestJS', 'Backend'), ('Python', 'Backend'),
('Django', 'Backend'), ('FastAPI', 'Backend'), ('Flask', 'Backend'), ('Java', 'Backend'),
('Spring Boot', 'Backend'), ('C++', 'Backend'), ('C Programming', 'Backend'), ('Go (Golang)', 'Backend'),
('Rust', 'Backend'), ('C# / .NET', 'Backend'), ('Ruby on Rails', 'Backend'), ('PHP', 'Backend'),
('GraphQL', 'Backend'), ('REST APIs', 'Backend'), ('gRPC', 'Backend'), ('Microservices', 'Backend'),

-- AI & Machine Learning
('PyTorch', 'AI & ML'), ('TensorFlow', 'AI & ML'), ('Keras', 'AI & ML'), ('Scikit-Learn', 'AI & ML'),
('Computer Vision', 'AI & ML'), ('OpenCV', 'AI & ML'), ('Natural Language Processing (NLP)', 'AI & ML'),
('LLMs & Prompt Engineering', 'AI & ML'), ('LangChain', 'AI & ML'), ('LlamaIndex', 'AI & ML'),
('Vector DBs (pgvector/Pinecone)', 'AI & ML'), ('Gemini API', 'AI & ML'), ('HuggingFace', 'AI & ML'),
('Reinforcement Learning', 'AI & ML'), ('Data Analysis (Pandas/NumPy)', 'AI & ML'),

-- Databases & Cloud
('PostgreSQL', 'Cloud & DB'), ('MySQL', 'Cloud & DB'), ('MongoDB', 'Cloud & DB'), ('Redis', 'Cloud & DB'),
('Supabase', 'Cloud & DB'), ('Firebase', 'Cloud & DB'), ('Prisma ORM', 'Cloud & DB'), ('Docker', 'Cloud & DB'),
('Kubernetes', 'Cloud & DB'), ('AWS (Amazon Web Services)', 'Cloud & DB'), ('Google Cloud Platform (GCP)', 'Cloud & DB'),
('Microsoft Azure', 'Cloud & DB'), ('Linux Administration', 'Cloud & DB'), ('CI/CD Pipelines', 'Cloud & DB'),

-- Mobile Development
('Flutter', 'Mobile'), ('React Native', 'Mobile'), ('Kotlin', 'Mobile'), ('Swift', 'Mobile'),
('Jetpack Compose', 'Mobile'), ('Android SDK', 'Mobile'), ('iOS Development', 'Mobile'),

-- Design & Creative
('Figma', 'Design'), ('UI/UX Design', 'Design'), ('Wireframing & Prototyping', 'Design'),
('Design Systems', 'Design'), ('Adobe Illustrator', 'Design'), ('Blender 3D', 'Design'),
('Motion Design', 'Design'), ('Interaction Design', 'Design'),

-- Core Engineering & Hardware
('Data Structures & Algorithms', 'Engineering'), ('Operating Systems', 'Engineering'),
('Computer Networks', 'Engineering'), ('Database Management Systems (DBMS)', 'Engineering'),
('Compiler Design', 'Engineering'), ('System Design', 'Engineering'), ('Object Oriented Programming (OOP)', 'Engineering'),
('Embedded Systems', 'Engineering'), ('Arduino', 'Engineering'), ('Raspberry Pi', 'Engineering'),
('IoT (Internet of Things)', 'Engineering'), ('VLSI Design', 'Engineering'), ('MATLAB', 'Engineering'),

-- Cybersecurity
('Network Security', 'Security'), ('Web Security & OWASP', 'Security'), ('Cryptography', 'Security'),
('Penetration Testing', 'Security'), ('Reverse Engineering', 'Security'), ('Ethical Hacking', 'Security'),

-- Soft Skills & Leadership
('Product Management', 'Leadership'), ('Agile & Scrum', 'Leadership'), ('Public Speaking', 'Leadership'),
('Technical Writing', 'Leadership'), ('Hackathon Mentorship', 'Leadership'), ('Community Building', 'Leadership')
ON CONFLICT (name) DO NOTHING;

-- 4. DEMO SUBJECTS
INSERT INTO subjects (name, code, branch, semester) VALUES
('Data Structures & Applications', 'CS301', 'Computer Science & Engineering', 3),
('Design & Analysis of Algorithms', 'CS402', 'Computer Science & Engineering', 4),
('Database Management Systems', 'CS501', 'Computer Science & Engineering', 5),
('Computer Networks', 'CS502', 'Computer Science & Engineering', 5),
('Operating Systems Principles', 'CS403', 'Computer Science & Engineering', 4),
('Artificial Intelligence & Machine Learning', 'CS601', 'Computer Science & Engineering', 6),
('Cloud Computing & DevOps', 'CS701', 'Computer Science & Engineering', 7)
ON CONFLICT DO NOTHING;
