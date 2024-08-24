import { useState } from 'react';
import axios from 'axios';

const VideoForm = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      setError('Invalid YouTube URL');
      return;
    }

    setError('');
    try {
      const response = await axios.get(`/api/generateTags?videoId=${videoId}`);
      setTags(response.data.tags);
      setDescription(response.data.description);
    } catch (error) {
      console.error('Failed to generate tags and description', error);
      setError('Failed to generate tags and description');
    }
  };

  const extractVideoId = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">YouTube Tagging and Description Generator</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter YouTube video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          onClick={handleGenerate}
          className="bg-blue-500 text-white p-2 mt-2 w-full"
        >
          Generate
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {tags.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Tags</h2>
          <ul className="list-disc pl-5">
            {tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>
      )}
      {description && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Description</h2>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      )}
    </div>
  );
};

export default VideoForm;
