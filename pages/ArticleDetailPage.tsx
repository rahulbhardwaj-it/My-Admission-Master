
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Article } from '../types';

interface ArticleDetailPageProps {
    articles: Article[];
}

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ articles }) => {
    const { articleId } = useParams<{ articleId: string }>();
    const article = articles.find(a => a.id === parseInt(articleId || ''));

    if (!article) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold text-brand-blue">Article not found</h1>
                <Link to="/blog" className="text-brand-gold hover:underline mt-4 inline-block">Back to Blog</Link>
            </div>
        );
    }

    return (
        <div className="bg-white">
            {/* Header Section */}
            <div className="relative h-96">
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-brand-blue bg-opacity-60" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-48 relative">
                <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-blue">{article.title}</h1>
                        <p className="text-lg text-gray-500 mt-4">
                            By {article.author} on {article.datePublished}
                        </p>
                    </div>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                        {article.content}
                    </div>
                    <div className="mt-12 text-center">
                         <Link to="/blog" className="inline-block bg-brand-gold text-brand-blue font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition-colors duration-300">
                            &larr; Back to All Articles
                         </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetailPage;
