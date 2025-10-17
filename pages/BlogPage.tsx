
import React from 'react';
import ArticleCard from '../components/ArticleCard';

const BlogPage = ({ articles }) => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-brand-blue tracking-tight sm:text-5xl">Latest News & Insights</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">Stay updated with the latest trends in education, admission tips, and student life.</p>
                </div>

                {/* Articles List */}
                {articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map(article => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h3 className="text-2xl font-semibold text-gray-700">No Articles Found</h3>
                        <p className="text-gray-500 mt-2">Check back soon for our latest updates!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPage;
