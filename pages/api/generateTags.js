import { fetchVideoData, generateTags, generateDescription } from '../../utils/youtube';

export default async function handler(req, res) {
  const { videoId } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: 'Missing videoId parameter' });
  }

  try {
    const videoData = await fetchVideoData(videoId);
    const tags = generateTags(videoData);
    const description = generateDescription(videoData, videoId);

    res.status(200).json({ tags, description });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch video data' });
  }
}
