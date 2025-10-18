import { CourseLevel, EnquiryStatus, ConfirmationStatus, Currency } from '../types';

export const siteSettings = {
    logoUrl: 'https://i.ibb.co/Q3Bgm9Qv/admission-master.jpg',
    address: 'Rakesh Sharma Building, Knowledge Park-3, Greater Noida, UP-201310',
    email: 'myadmissionmaster@outlook.com',
    phone: '+91-9318479200 +91-9220978596',
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
        name: 'Mangalmay Group Of Institutions',
        type: 'College',
        establishmentYear: 2002,
        affiliatedFrom: 'AKTU, CCSU',
        country: 'India',
        state: 'Uttar Pradesh ',
        district: 'Gautam Buddha Nagar',
        admissionMode: 'UPTAC, Direct',
        about: 'Mangalmay Group of Institutions is one of the premier NAAC accredited Institution with a prime focus on Innovation, Excellence and Nurturing global leaders for a sustainable future. We incorporate Knowledge, Industry experience, Research, and International exposure in our curriculum, to offer comprehensive educational program to the students. The post graduate and graduate programmes offered at Mangalmay are affiliated to AKTU, Lucknow (formally known as U.P.Technical University) and approved by the All India Council for Technical Education (AICTE) Ministry of HRD, New Delhi. Institute is also affiliated to C.C.S University Meerut, vision is to disseminate knowledge in the field of Management, Engineering, Bio-Technology, Commerce and Education. Driven by creativity and curiosity, Mangalmay strive to provide an educationally outstanding experience for students. Mangalmay has been ranked among the best MBA and B.Tech college in Delhi NCR.',
        placement: '6-24 LPA',
        photoUrl: 'https://theacademicinsights.com/wp-content/uploads/2023/03/Mangalmay-Institute.jpg',
        registrationUrl: 'https://myadmissionmaster.com/#/contact',
        logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcup7mgmM91u8G-MCL68CKniAOx1gErqhSFaD6qlIJ6hUAA0VbPflzA3yAME0LW7b1i8o&usqp=CAU',
    },
    {
        id: 2,
        name: 'GNIOT Group Of Institutions',
        type: 'College',
        establishmentYear: 2001,
        affiliatedFrom: 'AKTU, CCSU',
        country: 'India',
        state: 'Uttar Pradesh',
        district: 'Gautam Buddha Nagar',
        admissionMode: 'UPTAC, Online, Direct',
        about: 'Greater Noida Institute of Technology (GNIOT) is one of the premier Institutions in the field of Technical and Management Education. It has been formed by Shri Ram Educational Trust, Noida on no profit basis with a firm determination and commitment to foster a holistic approach towards the development of Engineering and Management Education. The Trust was formed in the year 2000 and the Institute was established in the year 2001. The Trust has had a meteoric rise, and on date, has established a chain of educational institutions covering the fields of engineering and management leading towards Graduate and Post Graduate degrees. Plans are also afoot to introduce Doctoral Programmes in the very near future. It has been approved by AICTE, Ministry of HRD, Goverment of India and affiliated to Dr. A.P.J. Abdul Kalam Technical University, Lucknow The Institute distinguishes itself from other colleges and Institutes due to its holistic approach and unique foresighted planning in providing technical and professional education with the state-of-the-art techniques. The main objective of an Institute is to generate a bunch of highly creative professionals, who can contribute not only in the Human Resource Development but also in the Nation Building Exercise..',
        placement: '4-1CR',
        photoUrl: 'https://colleges18.s3.ap-south-1.amazonaws.com/GNIOT_Greater_Noida_3_6f4dd6e271.jpg',
        registrationUrl: 'https://myadmissionmaster.com/#/contact',
        logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6PEhjxStebVy3VyqxrLpUQjQ5tTasv9R2gy7M_pknjliQ4-CTr7FeP3f6CE9RY6T7hIU&usqp=CAU',
    },
    {
        id: 3,
        name: 'IEC Group Of Institutions',
        type: 'College',
        establishmentYear: 1981,
        affiliatedFrom: 'AKTU, CCSU',
        country: 'India',
        state: 'Uttar Pradesh',
        district: 'Gautam Buddh Nagar',
        admissionMode: 'UPTAC, Online, Direct',
        about: 'IEC with a market capitalization of over 50 crore rupees one of the pioneers in India, in the field of Information Technology has been a frontrunner in imparting IT training and Education at the length and breadth of the Country. IEC Education Limited is Listed on Bombay, Delhi, Greater Noida Stock Exchanges.',
        placement: '4-24 LPA',
        photoUrl: 'https://image-static.collegedunia.com/public/college_data/images/campusimage/1586506583Bldg%208.jpg',
        registrationUrl: 'https://myadmissionmaster.com/#/contact',
        logoUrl: 'https://images.shiksha.com/mediadata/images/1600079346phpPZDNNv.jpg',
    },
    {
        id: 4,
        name: 'Kailash Institute Of Law and Management',
        type: 'College',
        establishmentYear: 2011,
        affiliatedFrom: 'CCSU',
        country: 'India',
        state: 'Uttar Pradesh',
        district: 'Gautam Buddh Nagar',
        admissionMode: 'Online, Direct',
        about: 'Kailash Institute of Law is a leading educational institution affiliated with CCS University, Meerut (a renowned state university established in 1965) and approved by the Bar Council of India (BCI). We are committed to providing high-quality legal, management, and IT education with a focus on academic excellence, industry exposure, and career growth.',
        placement: '100% placement in all courses with an avaerage of 3-6 LPA.',
        photoUrl: 'https://lawkailash.com/wp-content/uploads/2025/03/main_building_gate-edited-1.jpeg',
        registrationUrl: 'https://myadmissionmaster.com/#/contact',
        logoUrl: 'https://lawkailash.com/wp-content/uploads/2024/05/cropped-law_logo_background.png',
    },
];

export const courses = [
    {
        id: 101,
        name: 'B.Tech in Computer Science',
        institutionId: 1,
        level: CourseLevel.UG,
        duration: '4 Years',
        annualFees: 129000,
        currency: Currency.INR,
        totalSeats: 360,
        facilities: 'State-of-the-art labs, AI research center, Robotics club.',
        registrationUrl: 'https://myadmissionmaster.com/#/contact',
    },
    {
        id: 102,
        name: 'MBA ++',
        institutionId: 1,
        level: CourseLevel.PG,
        duration: '2 Years',
        annualFees: 310000,
        currency: Currency.INR,
        totalSeats: 60,
        facilities: '100% Placement, IIMs Certifications, Industry workshops.',
        registrationUrl: 'https://myadmissionmaster.com/#/contact',
    },
    {
        id: 103,
        name: 'MBA',
        institutionId: 1,
        level: CourseLevel.PG,
        duration: '2 Years',
        annualFees: 160000,
        currency: Currency.INR,
        totalSeats: 60,
        facilities: '100% Placement, Industry workshops.',
        registrationUrl: 'https://myadmissionmaster.com/#/contact',
    },
    {
        id: 201,
        name: 'PGDM',
        institutionId: 2,
        level: CourseLevel.PG,
        duration: '2 Years',
        annualFees: 519000,
        currency: Currency.INR,
        totalSeats: 200,
        facilities: '100% Placement world-wide, 15-day foreign trainings.',
        registrationUrl: 'https://myadmissionmaster.com/#/contact'
    },
    {
        id: 202,
        name: 'MBA',
        institutionId: 2,
        level: CourseLevel.PG,
        duration: '2 Years',
        annualFees: 250000,
        currency: Currency.INR,
        totalSeats: 200,
        facilities: '100% Placement world-wide, Certifications',
        registrationUrl: 'https://myadmissionmaster.com/#/contact'
    },
    {
        id: 301,
        name: 'B.Tech',
        institutionId: 3,
        level: CourseLevel.UG,
        duration: '4 Years',
        annualFees: 123926,
        currency: Currency.INR,
        totalSeats: 600,
        facilities: 'Branch: CS/IT/AIML/DS/EC/ME/CE/EE, 100% Placement, Industrial Training & Certifications',
        registrationUrl: 'https://myadmissionmaster.com/#/contact',
    },
    {
        id: 401,
        name: 'BBA',
        institutionId: 4,
        level: CourseLevel.UG,
        duration: '3 Years',
        annualFees: 55000,
        currency: Currency.INR,
        totalSeats: 120,
        facilities: 'Academics, Indutrial Training & Exposure, Placement',
        registrationUrl: 'https://myadmissionmaster.com/#/contact',
    },
    {
        id: 402,
        name: 'BCA',
        institutionId: 4,
        level: CourseLevel.UG,
        duration: '3 Years',
        annualFees: 55000,
        currency: Currency.INR,
        totalSeats: 120,
        facilities: 'Academics, Indutrial Training & Exposure, Placement',
        registrationUrl: 'https://myadmissionmaster.com/#/contact',
    },
    {
        id: 403,
        name: 'BA. LLB',
        institutionId: 4,
        level: CourseLevel.UG,
        duration: '5 Years',
        annualFees: 55000,
        currency: Currency.INR,
        totalSeats: 120,
        facilities: 'Academics, Moot-Court, Court Session Visits, Police Station Visits, Internship.',
        registrationUrl: 'https://myadmissionmaster.com/#/contact',
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