import React, { useState, useEffect } from "react";
import "./App.css"; // Import your CSS file
import axios from "axios";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const apiKey = "I7O0ZBTgrBI400l3gGiY8GhZQwYTYh8U"; // Replace with your actual API key

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    await axios
      .get(
        `https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json?api-key=${apiKey}`
      )
      .then((response) => {
        setArticles(response.data.results);
      });
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  return (
    <div className="App">
      {articles ? (
        <>
          <header>
            <h1>NY Times Most Viewed Articles</h1>
          </header>
          <main>
            <ul>
              {articles.map((article, idx) => (
                <li
                  key={article.uri}
                  data-testid={`id-${idx}`}
                  onClick={() => handleArticleClick(article)}
                >
                  <h3>{article.title}</h3>
                  <p>{article.abstract}</p>
                </li>
              ))}
            </ul>
            {selectedArticle && (
              <div className="article-details">
                <h2>{selectedArticle.title}</h2>
                <p>{selectedArticle.abstract}</p>
                <a href={selectedArticle.url}>Read full article</a>
              </div>
            )}
          </main>
        </>
      ) : (
        <header>
          <h1>No Articles</h1>
        </header>
      )}
    </div>
  );
};

export default App;
