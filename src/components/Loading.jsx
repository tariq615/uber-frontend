const Loading = () => {
    return (
      <div className="flex inset-0 items-center justify-center h-screen bg-black bg-opacity-50 z-50">
        <div className="flex flex-col items-center">
          {/* Animation Container */}
          <div className="flex items-center gap-1 h-9">
            {[...Array(5)].map((_, index) => (
              index === 2 ? (
                // Central green dot
                <span 
                  key="center"
                  className="h-5 w-5 rounded-full bg-green-500"
                />
              ) : (
                // Animated dots
                <span 
                  key={index}
                  className="relative flex h-3 w-3"
                >
                  <span className="absolute h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative rounded-full h-3 w-3 bg-green-400" />
                </span>
              )
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Loading;