import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

const VoiceButton = ({ onTranscript, className = '' }) => {
  const { isListening, transcript, isSupported, startListening, stopListening, resetTranscript } = useSpeechRecognition();

  const handleClick = () => {
    if (isListening) {
      stopListening();
      if (transcript && onTranscript) {
        onTranscript(transcript);
        resetTranscript();
      }
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return (
      <div className="text-center p-4 bg-yellow-100 text-yellow-800 rounded-lg">
        Trình duyệt của bạn không hỗ trợ nhận diện giọng nói
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <button
        onClick={handleClick}
        className={`
          relative w-20 h-20 rounded-full flex items-center justify-center
          transition-all duration-300 shadow-lg
          ${isListening
            ? 'bg-red-500 hover:bg-red-600 animate-pulse'
            : 'bg-blue-500 hover:bg-blue-600'
          }
        `}
      >
        {isListening ? (
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
            <rect x="6" y="4" width="8" height="12" rx="1" />
          </svg>
        ) : (
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a2 2 0 00-2 2v6a2 2 0 104 0V4a2 2 0 00-2-2z" />
            <path d="M5 9a1 1 0 011 1 4 4 0 008 0 1 1 0 112 0 6 6 0 01-5 5.917V17h2a1 1 0 110 2H7a1 1 0 110-2h2v-1.083A6 6 0 014 10a1 1 0 011-1z" />
          </svg>
        )}
      </button>

      <p className="text-sm font-medium text-gray-600">
        {isListening ? 'Đang nghe...' : 'Nhấn để nói'}
      </p>

      {transcript && (
        <div className="w-full max-w-md p-3 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-700">{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceButton;
