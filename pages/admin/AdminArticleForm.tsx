
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Article } from '../../types';

interface AdminArticleFormProps {
    articles?: Article[];
    onAddArticle?: (article: Omit<Article, 'id' | 'datePublished'>) => void;
    onUpdateArticle?: (article: Article) => void;
}

const AdminArticleForm: React.FC<AdminArticleFormProps> = ({ articles, onAddArticle, onUpdateArticle }) => {
    const navigate = useNavigate();
    const { articleId } = useParams<{ articleId?: string }>();
    const isEditMode = Boolean(articleId);

    const [article, setArticle] = useState<Omit<Article, 'id'> | Article>({
        title: '',
        author: '',
        imageUrl: '',
        summary: '',
        content: '',
        datePublished: new Date().toISOString().split('T')[0],
    });

     useEffect(() => {
        if (isEditMode && articles) {
            const articleToEdit = articles.find(i => i.id === parseInt(articleId!));
            if (articleToEdit) {
                setArticle(articleToEdit);
            }
        }
    }, [isEditMode, articleId, articles]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setArticle(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditMode) {
            onUpdateArticle?.(article as Article);
            alert('Article updated successfully!');
        } else {
            onAddArticle?.(article as Omit<Article, 'id'>);
            alert('Article added successfully!');
        }
        navigate('/admin/dashboard/articles');
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{isEditMode ? 'Edit Article' : 'Add New Article'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" name="title" id="title" value={article.title} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
                        <input type="text" name="author" id="author" value={article.author} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                    </div>
                     <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input type="url" name="imageUrl" id="imageUrl" value={article.imageUrl} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold" placeholder="https://example.com/image.jpg"/>
                    </div>
                </div>
                <div>
                    <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Summary</label>
                    <textarea name="summary" id="summary" rows={3} value={article.summary} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"></textarea>
                </div>
                 <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                    <textarea name="content" id="content" rows={10} value={article.content} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"></textarea>
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={() => navigate('/admin/dashboard/articles')} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                     <button type="submit" className="bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-lg hover:bg-yellow-300 transition-colors">
                        {isEditMode ? 'Update Article' : 'Save Article'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminArticleForm;
