import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Star, Clock, Plus } from 'lucide-react';
import api from '../services/api';
import { useToast } from '@/hooks/use-toast';
interface Book {
    id: number;
    title: string;
    author: string;
    cover: string;
    rating: number;
    pages: number;
    genre: string;
    status: 'read' | 'reading' | 'want-to-read';
}
const BookDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);
                const response = await api.get<Book>(`/api/books/${id}`);
                setBook(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch book details. It might have been removed or the server is unavailable.');
                console.error('Error fetching book:', err);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchBook();
        }
    }, [id]);
    const handleAddBook = async () => {
        if (!book) return;
        try {
            setIsAdding(true);
            const response = await api.put<Book>(`/api/books/${book.id}`, {
                status: 'want-to-read'
            });
            setBook(response.data);
            toast({
                title: "Added to Library",
                description: `"${book.title}" has been added to your reading list.`,
            });
        } catch (err) {
            console.error('Error adding book:', err);
            toast({
                title: "Error",
                description: "Failed to add book. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsAdding(false);
        }
    };
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center max-w-md mx-auto">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    if (error || !book) {
        return (
            <div className="min-h-screen bg-gray-50 max-w-md mx-auto p-4 flex flex-col items-center justify-center text-center">
                <p className="text-red-500 mb-4">{error || "Book not found"}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors"
                >
                    Go Back
                </button>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-50 max-w-md mx-auto pb-20">
            {/* Header */}
            <div className="bg-white px-4 py-4 sticky top-0 z-10 shadow-sm flex items-center">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="ml-2 font-semibold text-lg text-gray-800 line-clamp-1 text-center flex-1 pr-8">
                    Book Details
                </h1>
            </div>
            {/* Content */}
            <main className="p-4">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Cover Area */}
                    <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100 relative flex items-center justify-center">
                        {book.cover ? (
                            <img
                                src={book.cover}
                                alt={book.title}
                                className="h-[80%] object-contain shadow-lg"
                            />
                        ) : (
                            <BookOpen className="text-blue-500" size={64} />
                        )}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full px-3 py-1 shadow-sm flex items-center">
                            <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
                            <span className="text-sm font-semibold text-gray-800">{book.rating}</span>
                        </div>
                    </div>
                    {/* Details */}
                    <div className="p-6 text-center space-y-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-1">{book.title}</h2>
                            <p className="text-gray-600 font-medium">{book.author}</p>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                {book.genre}
                            </span>
                            <span className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                <Clock size={14} className="mr-1" />
                                {book.pages} pages
                            </span>
                        </div>
                        <div className="pt-4 border-t border-gray-100">
                            {book.status === 'want-to-read' ? (
                                <button
                                    disabled
                                    className="w-full py-3 bg-gray-100 text-gray-500 rounded-xl font-medium cursor-not-allowed flex items-center justify-center"
                                >
                                    Already in Library
                                </button>
                            ) : (
                                <button
                                    onClick={handleAddBook}
                                    disabled={isAdding}
                                    className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors shadow-sm flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isAdding ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    ) : (
                                        <>
                                            <Plus size={20} />
                                            <span>Add to Library</span>
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
export default BookDetail;
