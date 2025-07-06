import { useInView } from 'react-intersection-observer';

const VideoPlayer = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div ref={ref} className="flex justify-center items-center py-8">
      <div className="w-full max-w-4xl px-4">
        {inView && (
            <video autoPlay muted loop playsInline className="w-full rounded-lg shadow-lg">
  <source
    src="https://res.cloudinary.com/dbandd0k7/video/upload/kdmhau0y0cv4matopvry.mp4"
    type="video/mp4"
  />
  Your browser does not support the video tag.
</video>

        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
