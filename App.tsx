import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import { searchBooks } from './services/geminiService';
import { BookResult, SearchState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<SearchState>({
    query: '',
    isLoading: false,
    results: [],
    error: null,
    hasSearched: false,
  });

  const handleSearch = async (query: string) => {
    setState(prev => ({ ...prev, query, isLoading: true, error: null, hasSearched: true }));
    
    try {
      const results = await searchBooks(query);
      setState(prev => ({ ...prev, isLoading: false, results }));
    } catch (error: any) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        results: [], 
        error: "We encountered an issue connecting to the library database. Please try again later." 
      }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-sans selection:bg-indigo-100 selection:text-indigo-800">
      
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center text-white">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
               </svg>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            LibriSearch <span className="text-indigo-600">AI</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-8">
            Instantly find downloadable ebooks, PDFs, and open-access documents from libraries and archives across the web.
          </p>
          
          <SearchBar onSearch={handleSearch} isLoading={state.isLoading} />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {state.error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{state.error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State / Initial Instructions */}
        {!state.hasSearched && !state.isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-8">
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Smart Search</h3>
              <p className="text-gray-500 text-sm">Our AI scans the web for the most relevant file repositories.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Direct Access</h3>
              <p className="text-gray-500 text-sm">We try to link directly to PDF or download pages when available.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Legal Sources</h3>
              <p className="text-gray-500 text-sm">Prioritizes open libraries like Project Gutenberg and Internet Archive.</p>
            </div>
          </div>
        )}

        {/* Results Grid */}
        {state.hasSearched && !state.isLoading && state.results.length === 0 && !state.error && (
             <div className="text-center py-20">
                <p className="text-xl text-gray-500">No results found for "{state.query}".</p>
                <p className="text-gray-400 mt-2">Try checking the spelling or searching for a different book.</p>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {state.results.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} LibriSearch AI. Links are provided by search engines. Please ensure compliance with copyright laws in your region.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;