import axios from 'axios';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export const fetchVideoData = async (videoId) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${YOUTUBE_API_KEY}`
    );

    if (response.data.items.length === 0) {
      throw new Error('Video not found');
    }

    return response.data.items[0].snippet;
  } catch (error) {
    console.error('Error fetching video data:', error);
    throw error;
  }
};

export const generateTags = (snippet) => {
  const titleWords = snippet.title.split(' ');
  const descriptionWords = snippet.description.split(' ');
  const uniqueWords = Array.from(new Set([...titleWords, ...descriptionWords]));
  return uniqueWords.slice(0, 10);
};

export const generateDescription = (snippet, videoId) => {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const clickableLink = `<a href="${videoUrl}" target="_blank" rel="noopener noreferrer">${videoUrl}</a>`;
  
  return `
    <p><strong>Title:</strong> ${snippet.title}</p>
    <p><strong>Description:</strong> ${snippet.description}</p>
    <p><strong>Watch it here:</strong> ${clickableLink}</p>
  `;
};
