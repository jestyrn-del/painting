type VideoProps = {
  src: string;
  poster?: string;
  autoPlay?: boolean;
};

function HlsVideo({
  src,
  poster,
  autoPlay = false,
}: VideoProps) {
  return (
    <video
      src={src}
      poster={poster}
      controls
      autoPlay={autoPlay}
      muted={autoPlay}
      loop={autoPlay}
      playsInline
      preload="metadata"
    />
  );
}

export default HlsVideo;