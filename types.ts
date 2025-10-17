
export interface Institution {
    id: number;
    name: string;
    type: 'University' | 'College' | 'Polytechnic';
    establishmentYear: number;
    affiliatedFrom: string;
    country: string;
    state: string;
    district: string;
    admissionMode: string;
    about: string;
    placement: string;
    photoUrl: string;
    registrationUrl: string;
    logoUrl: string;
}

export enum CourseLevel {
    UG = 'Undergraduate',
    PG = 'Postgraduate',
    PHD = 'Doctorate',
    DIPLOMA = 'Diploma'
}


export interface Course {
    id: number;
    name: string;
    institutionId: number;
    level: CourseLevel;
    duration: string;
    annualFees: number;
    totalSeats: number;
    facilities: string;
    registrationUrl: string;
}

export enum EnquiryStatus {
    NEW = 'New',
    READ = 'Read',
    ARCHIVED = 'Archived'
}

export interface Enquiry {
    id: number;
    name: string;
    phone: string;
    email: string;
    courseInterest: string;
    dateSubmitted: string;
    status: EnquiryStatus;
}

export interface Article {
    id: number;
    title: string;
    author: string;
    datePublished: string; // YYYY-MM-DD
    imageUrl: string;
    summary: string;
    content: string;
}
