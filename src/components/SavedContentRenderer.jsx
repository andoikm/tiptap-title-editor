import { useState, useEffect } from 'react';
import StaticHtmlRenderer from './StaticHtmlRenderer';

const SavedContentRenderer = ({ contentId, className = '' }) => {
  const [savedContent, setSavedContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call to fetch saved content
        // Replace this with your actual API endpoint
        const response = await fetch(`/api/content/${contentId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        
        const data = await response.json();
        setSavedContent(data.htmlContent);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (contentId) {
      fetchSavedContent();
    }
  }, [contentId]);

  if (loading) {
    return <div>Loading saved content...</div>;
  }

  if (error) {
    return <div>Error loading content: {error}</div>;
  }

  if (!savedContent) {
    return <div>No content found</div>;
  }

  return (
    <div>
      <h3>Saved Content (with TitleMark functionality):</h3>
      <StaticHtmlRenderer 
        htmlContent={savedContent}
        className={className}
      />
    </div>
  );
};

export default SavedContentRenderer;
