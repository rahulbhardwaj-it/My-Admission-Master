
import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';

interface ArticleCardProps {
    article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
            <Link to={`/blog/${article.id}`}>
                <img className="h-56 w-full object-cover" src={article.imageUrl} alt={article.title} />
            </Link>
            <div className="p-6 flex-grow flex flex-col">
                <div className="mb-4">
                    <p className="text-sm text-gray-500">{article.datePublished} &bull; {article.author}</p>
                    <h3 className="text-xl font-bold text-brand-blue mt-1">
                        <Link to={`/blog/${article.id}`} className="hover:text-brand-gold transition-colors duration-300">{article.title}</Link>
                    </h3>
                </div>
                <p className="text-gray-700 text-base mb-4 flex-grow">
                    {article.summary}
                </p>
                <Link 
                    to={`/blog/${article.id}`}
                    className="inline-block self-start bg-brand-blue text-white font-bold py-2 px-4 rounded-full hover:bg-blue-800 transition-colors duration-300"
                >
                    Read More
                </Link>
            </div>
        </div>
    );
};

export default ArticleCard;
