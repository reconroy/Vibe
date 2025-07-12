import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Camera, CameraOff, Pin, PinOff, Volume2, VolumeX } from 'lucide-react';

const DynamicGrid = ({ 
  participants, 
  pinnedParticipant, 
  onPinParticipant, 
  containerWidth, 
  containerHeight 
}) => {
  // Calculate optimal grid layout based on participant count
  const calculateGridLayout = (count, width, height) => {
    if (count === 0) return { cols: 1, rows: 1 };
    if (count === 1) return { cols: 1, rows: 1 };
    if (count === 2) return { cols: 2, rows: 1 };
    if (count <= 4) return { cols: 2, rows: 2 };
    if (count <= 6) return { cols: 3, rows: 2 };
    if (count <= 9) return { cols: 3, rows: 3 };
    if (count <= 12) return { cols: 4, rows: 3 };
    if (count <= 16) return { cols: 4, rows: 4 };
    if (count <= 20) return { cols: 5, rows: 4 };
    if (count <= 25) return { cols: 5, rows: 5 };
    
    // For very large meetings, use a scrollable grid
    return { cols: 6, rows: Math.ceil(count / 6) };
  };

  const gridLayout = useMemo(() => {
    const visibleParticipants = pinnedParticipant 
      ? [pinnedParticipant, ...participants.filter(p => p.id !== pinnedParticipant.id)]
      : participants;
    
    return calculateGridLayout(visibleParticipants.length, containerWidth, containerHeight);
  }, [participants.length, pinnedParticipant, containerWidth, containerHeight]);

  const visibleParticipants = useMemo(() => {
    if (pinnedParticipant) {
      return [pinnedParticipant, ...participants.filter(p => p.id !== pinnedParticipant.id)];
    }
    return participants;
  }, [participants, pinnedParticipant]);

  // Calculate tile dimensions
  const tileWidth = containerWidth / gridLayout.cols;
  const tileHeight = containerHeight / gridLayout.rows;

  return (
    <div className="w-full h-full relative bg-gray-900">
      {/* Main Grid Container */}
      <div
        className="grid gap-2 w-full h-full p-4"
        style={{
          gridTemplateColumns: `repeat(${gridLayout.cols}, 1fr)`,
          gridTemplateRows: `repeat(${gridLayout.rows}, 1fr)`,
        }}
      >
        {visibleParticipants.map((participant, index) => (
          <ParticipantTile
            key={participant.id}
            participant={participant}
            isPinned={pinnedParticipant?.id === participant.id}
            onPin={() => onPinParticipant(participant)}
            onUnpin={() => onPinParticipant(null)}
            isMainTile={pinnedParticipant && index === 0}
            tileWidth={tileWidth}
            tileHeight={tileHeight}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

const ParticipantTile = ({ 
  participant, 
  isPinned, 
  onPin, 
  onUnpin, 
  isMainTile,
  tileWidth,
  tileHeight,
  index 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  // Simulate audio level for demo
  useEffect(() => {
    if (!participant.isMuted && !participant.isLocal) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [participant.isMuted, participant.isLocal]);

  const tileVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3,
        delay: index * 0.05 
      }
    },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      variants={tileVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`
        relative bg-gray-800 rounded-xl overflow-hidden border-2 transition-all duration-200 shadow-lg
        ${isPinned ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-gray-600'}
        ${isMainTile ? 'col-span-2 row-span-2' : ''}
        ${audioLevel > 30 && !participant.isMuted ? 'ring-2 ring-green-500/50' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        aspectRatio: isMainTile ? '16/9' : '16/9', // Use 16:9 for all for better appearance
        minHeight: '200px'
      }}
    >
      {/* Video/Avatar Content */}
      <div className="w-full h-full relative">
        {participant.isCameraOff ? (
          // Avatar when camera is off
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
            <div className="text-white text-6xl font-bold mb-2">
              {participant.avatar}
            </div>
            <div className="text-white/80 text-lg font-medium">
              {participant.name}
            </div>
          </div>
        ) : (
          // Video placeholder (in real app, this would be the video stream)
          <div className="w-full h-full bg-gray-700 flex flex-col items-center justify-center">
            <Camera className="w-12 h-12 text-gray-400 mb-2" />
            <span className="text-gray-400 text-sm">Camera On</span>
          </div>
        )}

        {/* Participant Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-white font-medium text-sm truncate">
                {participant.name}
                {participant.isHost && (
                  <span className="ml-2 text-xs bg-purple-600 px-2 py-1 rounded">Host</span>
                )}
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              {/* Mic Status */}
              {participant.isMuted ? (
                <MicOff className="w-4 h-4 text-red-500" />
              ) : (
                <Mic className={`w-4 h-4 ${audioLevel > 30 ? 'text-green-500' : 'text-white'}`} />
              )}
              
              {/* Camera Status */}
              {participant.isCameraOff && (
                <CameraOff className="w-4 h-4 text-red-500" />
              )}
            </div>
          </div>
        </div>

        {/* Hover Controls */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-2 right-2 flex space-x-1"
          >
            {/* Pin/Unpin Button */}
            <button
              onClick={isPinned ? onUnpin : onPin}
              className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            >
              {isPinned ? (
                <PinOff className="w-4 h-4 text-white" />
              ) : (
                <Pin className="w-4 h-4 text-white" />
              )}
            </button>
            
            {/* Volume Control (for remote participants) */}
            {!participant.isLocal && (
              <button className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors">
                <Volume2 className="w-4 h-4 text-white" />
              </button>
            )}
          </motion.div>
        )}

        {/* Audio Level Indicator */}
        {!participant.isMuted && audioLevel > 10 && (
          <div className="absolute top-2 left-2">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((bar) => (
                <div
                  key={bar}
                  className={`w-1 bg-green-500 rounded-full transition-all duration-100 ${
                    audioLevel > bar * 20 ? 'h-4' : 'h-1'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Local User Indicator */}
        {participant.isLocal && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
            You
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DynamicGrid;
