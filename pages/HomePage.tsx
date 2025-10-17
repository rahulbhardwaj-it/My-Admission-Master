
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EnquiryForm from '../components/EnquiryForm';
import InstitutionCard from '../components/InstitutionCard';
import ArticleCard from '../components/ArticleCard';
import { Institution, Course, Enquiry, Article } from '../types';

interface HomePageProps {
    institutions: Institution[];
    courses: Course[];
    articles: Article[];
    onAddEnquiry: (enquiry: Omit<Enquiry, 'id' | 'dateSubmitted' | 'status'>) => void;
}

const HomePage: React.FC<HomePageProps> = ({ institutions, courses, articles, onAddEnquiry }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('institution');
    const [searchResults, setSearchResults] = useState<(Institution | {id: number, name: string, institution: Institution})[]>([]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const lowerCaseQuery = searchQuery.toLowerCase();

        if (searchType === 'institution') {
            const results = institutions.filter(inst => inst.name.toLowerCase().includes(lowerCaseQuery));
            setSearchResults(results);
        } else if (searchType === 'course') {
            const results = courses
              .filter(course => course.name.toLowerCase().includes(lowerCaseQuery))
              .map(course => ({
                  ...course,
                  institution: institutions.find(inst => inst.id === course.institutionId)!
              }));
            setSearchResults(results);
        } else {
             const results = institutions.filter(inst => 
                inst.country.toLowerCase().includes(lowerCaseQuery) ||
                inst.state.toLowerCase().includes(lowerCaseQuery) ||
                inst.district.toLowerCase().includes(lowerCaseQuery)
            );
            setSearchResults(results);
        }
    };

    return (
        <div>
            {/* Hero Banner Section */}
            <section className="relative bg-brand-blue text-white h-[60vh] flex items-center justify-center">
                <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{backgroundImage: "url('https://picsum.photos/seed/banner/1920/1080')"}}></div>
                <div className="relative z-10 text-center p-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Admission Open for 2025-26 Session!</h1>
                    <p className="text-xl md:text-2xl mb-8 drop-shadow-md">Your future starts Now. Explore top Institutions and apply now.</p>
                    <Link to="/institutions" className="bg-brand-gold text-brand-blue font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-300 transition duration-300 transform hover:scale-105">
                        Explore Institutions
                    </Link>
                </div>
            </section>

            {/* Search & Enquiry Section */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Left Column: Search */}
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-brand-blue text-center lg:text-left">"Discover Your Dream Institutions, search from Thousands of University Worldwide"</h2>
                            <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                               <div className="flex flex-col sm:flex-row gap-4">
                                    <input 
                                        type="text" 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="flex-grow w-full px-4 py-3 rounded-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50" 
                                        placeholder="Enter keyword..." 
                                    />
                                    <select 
                                        value={searchType}
                                        onChange={(e) => setSearchType(e.target.value)}
                                        className="w-full sm:w-auto px-4 py-3 rounded-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50"
                                    >
                                        <option value="institution">By Institution</option>
                                        <option value="course">By Course</option>
                                        <option value="location">By Location</option>
                                    </select>
                               </div>
                                <button type="submit" className="w-full bg-brand-blue text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition-colors">
                                    Search
                                </button>
                            </form>
                            <div className="mt-6 space-y-4 max-h-96 overflow-y-auto pr-2">
                                {searchResults.length > 0 ? (
                                    searchResults.map(item => (
                                        <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                                            <div>
                                                <h4 className="font-bold text-brand-blue">{'institution' in item ? item.institution.name : item.name}</h4>
                                                <p className="text-sm text-gray-600">
                                                    {'institution' in item ? item.name : `${('type' in item) ? item.type : ''} - ${('state' in item) ? item.state : ''}`}
                                                </p>
                                            </div>
                                            <Link to={ 'institution' in item ? `/courses` : `/institutions/${item.id}`} className="text-brand-blue hover:text-brand-gold font-semibold">
                                                View
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center">No results found. Start a new search.</p>
                                )}
                            </div>
                        </div>
                        {/* Right Column: Enquiry Form */}
                        <div>
                            <EnquiryForm courses={courses} onAddEnquiry={onAddEnquiry} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Recently Added Institutions */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-brand-blue text-center mb-12">Recently Added Institutions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {institutions.slice(0, 3).map(inst => (
                            <InstitutionCard key={inst.id} institution={inst} />
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Latest News Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-12">
                         <h2 className="text-3xl font-bold text-brand-blue">Latest News</h2>
                         <Link to="/blog" className="text-brand-gold font-semibold hover:underline">
                            View All Articles &rarr;
                         </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.slice(0, 3).map(article => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="bg-brand-blue text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-brand-gold mb-4">About My Admission Master</h2>
                    <p className="text-lg leading-relaxed">
                        At MY ADMISSION MASTER, we are dedicated to helping students achieve their academic dreams. With our tagline, 'ADMISSION KE SAATH BHI ADMISSION KE BAAD BHI', we commit to guiding you through every step of your college admission journey – from selecting the perfect institution and course to securing scholarships and settling into your new academic life. Our extensive network of top-tier universities worldwide and personalized counselling services ensure that you find the best fit for your aspirations. Let us master your admission, so you can master your future.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
