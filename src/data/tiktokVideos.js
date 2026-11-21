import { vlogs } from './vlogs.js'

// Backward-compatible URL shape for code that expects the earlier data module.
export const tiktokVideos = vlogs.map(({ id, videoUrl }) => ({ id, url: videoUrl }))
