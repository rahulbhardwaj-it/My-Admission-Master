
import React from 'react';
import { Link } from 'react-router-dom';

const InstitutionCard = ({ institution, isFeatured = false }) => {
    const cardClasses = `bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 relative ${isFeatured ? 'border-2 border-brand-gold' : ''}`;

    return (
        <div className={cardClasses}>
            {isFeatured && (
                <div className="absolute top-0 left-0 bg-brand-gold text-brand-blue text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-br-lg z-10">
                    Featured
                </div>
            )}
            <div className="relative">
                <img className="h-56 w-full object-cover" src={institution.photoUrl} alt={institution.name} />
                <div className="absolute -bottom-8 right-6">
                    <img className="h-16 w-16 rounded-full object-contain bg-white p-1 border-4 border-white shadow-lg" src={institution.logoUrl} alt={`${institution.name} Logo`} />
                </div>
            </div>
            <div className="p-6 pt-10">
                <h3 className="text-xl font-bold text-brand-blue mb-2">{institution.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{institution.country}, {institution.state}</p>
                <p className="text-gray-700 text-base mb-4 h-20 overflow-hidden">
                    {institution.about.substring(0, 100)}...
                </p>
                <Link 
                    to={`/institutions/${institution.id}`}
                    className="inline-block bg-brand-blue text-white font-bold py-2 px-4 rounded-full hover:bg-blue-800 transition-colors duration-300"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default InstitutionCard;