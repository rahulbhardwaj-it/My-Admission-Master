import React, { useState, useMemo } from 'react';
import InstitutionCard from '../components/InstitutionCard';
import { Institution } from '../types';

interface InstitutionsPageProps {
    institutions: Institution[];
}

const InstitutionsPage: React.FC<InstitutionsPageProps> = ({ institutions }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        type: '',
        country: '',
        state: '',
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filteredInstitutions = useMemo(() => {
        return institutions.filter(inst => {
            return (
                (filters.type ? inst.type === filters.type : true) &&
                (filters.country ? inst.country === filters.country : true) &&
                (filters.state ? inst.state.toLowerCase().includes(filters.state.toLowerCase()) : true) &&
                (searchTerm ? inst.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
            );
        });
    }, [searchTerm, filters, institutions]);

    const uniqueCountries = useMemo(() => [...new Set(institutions.map(i => i.country))], [institutions]);
    const uniqueTypes = useMemo(() => [...new Set(institutions.map(i => i.type))], [institutions]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-brand-blue tracking-tight sm:text-5xl">Our Partner Institutions</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">Explore a wide range of universities and colleges from around the world.</p>
                </div>

                {/* Filters and Search */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50"
                    />
                    <select name="type" value={filters.type} onChange={handleFilterChange} className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50">
                        <option value="">All Types</option>
                        {uniqueTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <select name="country" value={filters.country} onChange={handleFilterChange} className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50">
                        <option value="">All Countries</option>
                        {uniqueCountries.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input
                        type="text"
                        name="state"
                        placeholder="Filter by state..."
                        value={filters.state}
                        onChange={handleFilterChange}
                        className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50"
                    />
                </div>

                {/* Institution List */}
                {filteredInstitutions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredInstitutions.map(institution => (
                            <InstitutionCard key={institution.id} institution={institution} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h3 className="text-2xl font-semibold text-gray-700">No Institutions Found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InstitutionsPage;