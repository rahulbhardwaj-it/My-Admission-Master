
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 5;

const AdminManageArticles = ({ articles, onDeleteArticle }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredArticles = useMemo(() => {
        if (!searchTerm.trim()) {
            return articles;
        }
        const lowercasedFilter = searchTerm.toLowerCase();
        return articles.filter(article =>
            article.title.toLowerCase().includes(lowercasedFilter) ||
            article.author.toLowerCase().includes(lowercasedFilter)
        );
    }, [articles, searchTerm]);

    const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

    const paginatedArticles = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredArticles, currentPage]);
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleDeleteClick = (articleId) => {
        if(window.confirm('Are you sure you want to delete this article?')) {
            onDeleteArticle(articleId);
        }
    };
    
    const goToPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Manage Articles</h2>
                <Link
                    to="/admin/dashboard/articles/add"
                    className="bg-brand-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors"
                >
                    + Add New Article
                </Link>
            </div>
            
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Title</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Author</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date Published</th>
                            <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {paginatedArticles.length > 0 ? paginatedArticles.map(article => (
                            <tr key={article.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="text-left py-3 px-4">{article.title}</td>
                                <td className="text-left py-3 px-4">{article.author}</td>
                                <td className="text-left py-3 px-4">{article.datePublished}</td>
                                <td className="text-center py-3 px-4 space-x-2">
                                    <Link to={`/admin/dashboard/articles/edit/${article.id}`} className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-full">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDeleteClick(article.id)} className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="text-center py-10 text-gray-500">
                                    No articles found matching your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                 <div className="flex justify-between items-center mt-6">
                    <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button 
                             onClick={() => goToPage(currentPage + 1)}
                             disabled={currentPage === totalPages}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminManageArticles;
