import { CourseLevel, EnquiryStatus, ConfirmationStatus } from '../types';

export const siteSettings = {
    logoUrl: 'https://ibb.co/1tVg2ZQG',
    address: 'Rakesh Sharma Building, Knowledge Park-3, Greater Noida, UP-201310',
    email: 'myadmissionmaster@outlook.com',
    phone: '+91-9318479200',
    tagline: '"ADMISSION KE SAATH BHI - ADMISSION KE BAAD BHI"',
    featuredInstitutionIds: [1, 3, 4], // IDs of institutions to feature
};

export const adminCredentials = {
    username: 'admin',
    password: 'admin123'
};

export const institutions = [
    {
        id: 1,
        name: 'Global Tech University',
        type: 'University',
        establishmentYear: 1995,
        affiliatedFrom: 'National Board of Technology',
        country: 'USA',
        state: 'California',
        district: 'Silicon Valley',
        admissionMode: 'Online Test, Interview',
        about: 'A leading university for technology and innovation, located in the heart of Silicon Valley. We focus on practical, hands-on learning.',
        placement: '95% placement rate with top tech companies like Google, Apple, and Microsoft. Average package of $120,000.',
        photoUrl: 'https://picsum.photos/seed/gtu/800/600',
        registrationUrl: '#',
        logoUrl: 'https://i.ibb.co/ZJ9yDq7/logo.png',
    },
    {
        id: 2,
        name: 'National Arts College',
        type: 'College',
        establishmentYear: 1980,
        affiliatedFrom: 'Ministry of Culture',
        country: 'India',
        state: 'Maharashtra',
        district: 'Mumbai',
        admissionMode: 'Portfolio Review, Entrance Exam',
        about: 'A premier institution for fine arts, design, and performing arts. Our alumni are leaders in the creative industries.',
        placement: 'Strong industry connections for internships and projects. Many graduates become successful freelance artists and designers.',
        photoUrl: 'https://picsum.photos/seed/nac/800/600',
        registrationUrl: '#',
        logoUrl: 'https://i.ibb.co/ZJ9yDq7/logo.png',
    },
    {
        id: 3,
        name: 'Heritage Business School',
        type: 'University',
        establishmentYear: 2001,
        affiliatedFrom: 'International Business Council',
        country: 'UK',
        state: 'England',
        district: 'London',
        admissionMode: 'GMAT/GRE, Interview',
        about: 'An elite business school in the financial capital of the world. Our MBA program is globally recognized.',
        placement: 'Top placements in finance, consulting, and marketing sectors. Average MBA salary of £90,000.',
        photoUrl: 'https://picsum.photos/seed/hbs/800/600',
        registrationUrl: '#',
        logoUrl: 'https://i.ibb.co/ZJ9yDq7/logo.png',
    },
    {
        id: 4,
        name: 'Greenfield Medical Institute',
        type: 'College',
        establishmentYear: 1975,
        affiliatedFrom: 'National Medical Council',
        country: 'Canada',
        state: 'Ontario',
        district: 'Toronto',
        admissionMode: 'MCAT, Panel Interview',
        about: 'A top-tier medical school known for its research facilities and hospital affiliations.',
        placement: '100% residency placement rate in top hospitals across North America.',
        photoUrl: 'https://picsum.photos/seed/gmi/800/600',
        registrationUrl: '#',
        logoUrl: 'https://i.ibb.co/ZJ9yDq7/logo.png',
    },
];

export const courses = [
    {
        id: 101,
        name: 'B.Tech in Computer Science',
        institutionId: 1,
        level: CourseLevel.UG,
        duration: '4 Years',
        annualFees: 25000,
        totalSeats: 120,
        facilities: 'State-of-the-art labs, AI research center, Robotics club.',
        registrationUrl: '#',
    },
    {
        id: 102,
        name: 'M.Sc in Data Science',
        institutionId: 1,
        level: CourseLevel.PG,
        duration: '2 Years',
        annualFees: 30000,
        totalSeats: 60,
        facilities: 'Big Data lab, Cloud computing access, Industry workshops.',
        registrationUrl: '#',
    },
    {
        id: 201,
        name: 'Bachelor of Fine Arts (BFA)',
        institutionId: 2,
        level: CourseLevel.UG,
        duration: '3 Years',
        annualFees: 15000,
        totalSeats: 100,
        facilities: 'Art studios, Photography lab, Exhibition gallery.',
        registrationUrl: '#',
    },
    {
        id: 301,
        name: 'Master of Business Administration (MBA)',
        institutionId: 3,
        level: CourseLevel.PG,
        duration: '2 Years',
        annualFees: 50000,
        totalSeats: 150,
        facilities: 'Bloomberg terminal, Case study library, Global immersion program.',
        registrationUrl: '#',
    },
    {
        id: 401,
        name: 'Doctor of Medicine (MD)',
        institutionId: 4,
        level: CourseLevel.PHD,
        duration: '4 Years',
        annualFees: 60000,
        totalSeats: 80,
        facilities: 'Anatomy labs, Simulation center, Affiliated teaching hospitals.',
        registrationUrl: '#',
    },
     {
        id: 202,
        name: 'Diploma in Graphic Design',
        institutionId: 2,
        level: CourseLevel.DIPLOMA,
        duration: '1 Year',
        annualFees: 12000,
        totalSeats: 50,
        facilities: 'Mac labs with latest design software, Printing press.',
        registrationUrl: '#',
    },
];

export const enquiries = [
    {
        id: 1,
        name: 'Alice Johnson',
        phone: '555-0101',
        email: 'alice.j@example.com',
        courseInterest: 'B.Tech in Computer Science',
        dateSubmitted: '2023-10-26',
        status: EnquiryStatus.NEW,
    },
    {
        id: 2,
        name: 'Bob Williams',
        phone: '555-0102',
        email: 'bob.w@example.com',
        courseInterest: 'Master of Business Administration (MBA)',
        dateSubmitted: '2023-10-25',
        status: EnquiryStatus.READ,
    },
    {
        id: 3,
        name: 'Charlie Brown',
        phone: '555-0103',
        email: 'charlie.b@example.com',
        courseInterest: 'Bachelor of Fine Arts (BFA)',
        dateSubmitted: '2023-10-24',
        status: EnquiryStatus.ARCHIVED,
    },
     {
        id: 4,
        name: 'Diana Prince',
        phone: '555-0104',
        email: 'diana.p@example.com',
        courseInterest: 'M.Sc in Data Science',
        dateSubmitted: '2023-10-27',
        status: EnquiryStatus.NEW,
    },
];

export const articles = [
    {
        id: 1,
        title: 'Top 5 Emerging Fields in Technology for 2025',
        author: 'Dr. Jane Foster',
        datePublished: '2023-10-28',
        imageUrl: 'https://picsum.photos/seed/techtrends/800/600',
        summary: 'Explore the most promising tech fields that are set to dominate the job market in the coming years. From AI to quantum computing, find out where the future is headed.',
        content: 'The world of technology is ever-evolving, and staying ahead of the curve is crucial for aspiring students. Here are the top five emerging fields to watch:\n\n1. **Artificial Intelligence and Machine Learning:** No surprise here. AI continues to expand its reach across all industries, from healthcare to finance.\n\n2. **Quantum Computing:** While still in its nascent stages, quantum computing promises to revolutionize problem-solving capabilities.\n\n3. **Biotechnology:** The intersection of biology and technology is leading to breakthroughs in medicine, agriculture, and environmental science.\n\n4. **Cybersecurity:** As our world becomes more digital, the need for robust cybersecurity professionals has never been higher.\n\n5. **Sustainable Technology:** With a growing focus on climate change, careers in renewable energy and green tech are on the rise. Pursuing a degree in any of these fields can lead to a rewarding and impactful career.'
    },
    {
        id: 2,
        title: 'How to Write a Winning Scholarship Essay',
        author: 'John Doe',
        datePublished: '2023-10-25',
        imageUrl: 'https://picsum.photos/seed/essay/800/600',
        summary: 'Securing a scholarship can be a game-changer for your education. Learn our expert tips for crafting a compelling essay that stands out to admission committees.',
        content: 'A scholarship essay is your chance to tell your story. Here are some tips:\n\n- **Start with a strong hook:** Grab the reader\'s attention from the first sentence.\n- **Be authentic:** Write in your own voice and share genuine experiences.\n- **Address the prompt directly:** Make sure you understand what the scholarship committee is asking for and tailor your essay accordingly.\n- **Proofread meticulously:** Typos and grammatical errors can leave a negative impression. Read your essay aloud and have someone else review it.'
    },
    {
        id: 3,
        title: 'The Importance of Internships in Your College Journey',
        author: 'Emily Carter',
        datePublished: '2023-10-22',
        imageUrl: 'https://picsum.photos/seed/internship/800/600',
        summary: 'Internships are more than just a resume-builder. Discover how practical experience can shape your career path and give you a competitive edge after graduation.',
        content: 'While classroom learning is fundamental, internships provide invaluable real-world experience. They allow you to apply theoretical knowledge to practical challenges, build a professional network, and explore different career paths within your field. Many companies also use their internship programs as a pipeline for full-time hires, so excelling in your role can lead directly to a job offer upon graduation.'
    },
    {
        id: 4,
        title: 'Navigating Student Life: A Guide for Freshers',
        author: 'Admin',
        datePublished: '2023-10-20',
        imageUrl: 'https://picsum.photos/seed/studentlife/800/600',
        summary: 'Starting university is an exciting new chapter. Here are some tips to help you make the most of your first year, from academics to social life.',
        content: 'Your first year of university is a time of transition and growth. To make it a success, focus on time management, don\'t be afraid to ask for help from professors or advisors, get involved in campus clubs to meet new people, and prioritize your well-being. Remember, it\'s a marathon, not a sprint!'
    },
    {
        id: 5,
        title: 'Study Abroad: Is It Right for You?',
        author: 'Dr. Maria Rodriguez',
        datePublished: '2023-10-18',
        imageUrl: 'https://picsum.photos/seed/abroad/800/600',
        summary: 'Studying abroad can be a life-changing experience, offering cultural immersion and a global perspective. We weigh the pros and cons to help you decide if it fits your academic goals.',
        content: 'Studying abroad offers numerous benefits, including cultural enrichment, language skills, and a global network. However, it also comes with challenges like cost, being away from home, and adapting to a new educational system. Carefully research programs, consider your budget, and talk to students who have studied abroad to make an informed decision.'
    }
];

export const sessions = [
    { id: 1, year: '2025-26' },
    { id: 2, year: '2026-27' }
];

export const confirmations = [
    {
        id: 1,
        sessionId: 1, // 2025-26
        studentName: 'Priya Sharma',
        contact: '9876543210',
        course: 'B.Tech in Computer Science',
        institutionId: 1, // Global Tech University
        consultantName: 'Mr. Gupta',
        status: ConfirmationStatus.CONFIRMED,
    },
    {
        id: 2,
        sessionId: 1, // 2025-26
        studentName: 'Rohan Verma',
        contact: 'rohan.v@example.com',
        course: 'Master of Business Administration (MBA)',
        institutionId: 3, // Heritage Business School
        consultantName: 'Ms. Davis',
        status: ConfirmationStatus.IN_PROGRESS,
    },
    {
        id: 3,
        sessionId: 2, // 2026-27
        studentName: 'Anjali Mehta',
        contact: '9123456789',
        course: 'Doctor of Medicine (MD)',
        institutionId: 4, // Greenfield Medical Institute
        consultantName: 'Mr. Gupta',
        status: ConfirmationStatus.CONFIRMED,
    },
];