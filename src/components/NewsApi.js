import React, { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
  const [articles, setArticles] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=f2de56aa260b49909da2e852d34dd565');
        console.log(response)
        setArticles(response.data.articles);
        setLoading(false);
      } catch (err) {
        setError(err.message); 
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <p className="text-center text-lg text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-600">Error: {error}</p>; 
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl font-bold text-center text-red-600 mb-8">Top News</h1>
      <ul className="space-y-6">
        {articles.map((article, index) => (
          <li key={index} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300">
           <h1 className='text-xl font-bold'>Author: {article.author? article.author :"Unkown Author"}</h1>
            <h2 className="text-2xl font-bold text-gray-900">Title: {article.title}</h2>
            <p className="text-gray-700 mt-2 font-semibold">Description: {article.description}</p>
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full  my-4 object-cover rounded-lg mb-4"
              />
            )}
            <a
              href={article.url}
              className="text-blue-600 mt-4 inline-block text-lg font-semibold hover:underline"
            >
              Read more
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
