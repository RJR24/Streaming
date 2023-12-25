import React from "react";
import YouTube from "react-youtube";
import { Video } from "../../../types";

interface TrailerProps {
  videos: Video[] | undefined;
}

const TrailerComponent: React.FC<TrailerProps> = ({ videos }) => {
  if (!videos || videos.length === 0) return null;

  // Filter videos to get the trailer with name 'Official Trailer'
  const trailerVideo = videos.find(
    (video) => video.name === "Official Trailer"
  );

  return (
    <div className="w-full md:w-1/2 lg:w-2/3 mx-auto">
      <YouTube
        videoId={trailerVideo ? trailerVideo.key : videos[0].key}
        opts={{ width: "100%", height: "500px" }}
      />
    </div>
  );
};

export default TrailerComponent;
