import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  MicOff,
  Camera,
  CameraOff,
  PhoneOff,
  Settings,
  MoreVertical,
  Users,
  MessageSquare,
  Share,
  Grid3X3,
  Maximize,
  Copy,
  Info,
  Volume2,
  VolumeX
} from 'lucide-react';

const MeetingControls = ({
  isMicOn,
  isCameraOn,
  isSpeakerOn,
  onToggleMic,
  onToggleCamera,
  onToggleSpeaker,
  onEndCall,
  onToggleParticipants,
  onToggleChat,
  onToggleSettings,
  onShareScreen,
  onCopyMeetingLink,
  onToggleFullscreen,
  onAddTestUser,
  participantCount,
  meetingId,
  showControls = true // Always show controls for now
}) => {
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const controlVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 h-20">
      {/* Single Controls Bar - Google Meet Style */}
      <div className="bg-gray-900/95 backdrop-blur-sm px-6 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left side - Meeting info */}
          <div className="flex items-center space-x-4 text-white">
            <span className="text-sm font-medium">Meeting ID: {meetingId}</span>
            <button
              onClick={onCopyMeetingLink}
              className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Link</span>
            </button>
          </div>

          {/* Center - Main Controls */}
          <div className="flex items-center space-x-3">

              {/* Microphone Control */}
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={onToggleMic}
                className={`
                  p-3 rounded-full transition-all duration-200
                  ${isMicOn
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                  }
                `}
              >
                {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </motion.button>

              {/* Camera Control */}
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={onToggleCamera}
                className={`
                  p-3 rounded-full transition-all duration-200
                  ${isCameraOn
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                  }
                `}
              >
                {isCameraOn ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
              </motion.button>

              {/* Speaker Control */}
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={onToggleSpeaker}
                className={`
                  p-3 rounded-full transition-all duration-200
                  ${isSpeakerOn
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                  }
                `}
              >
                {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </motion.button>

              {/* Share Screen */}
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={onShareScreen}
                className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200"
              >
                <Share className="w-5 h-5" />
              </motion.button>

              {/* Add Test User Button */}
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={onAddTestUser}
                className="p-3 rounded-full bg-green-600 hover:bg-green-700 text-white transition-all duration-200"
                title="Add Test User"
              >
                <Users className="w-5 h-5" />
              </motion.button>

              {/* End Call */}
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={onEndCall}
                className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all duration-200"
              >
                <PhoneOff className="w-5 h-5" />
              </motion.button>

          </div>

          {/* Right side - Additional controls and participant count */}
          <div className="flex items-center space-x-4 text-white">
            <div className="flex items-center space-x-2 text-sm">
              <Users className="w-4 h-4" />
              <span>{participantCount} participants</span>
            </div>

            {/* More Options */}
            <div className="relative">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setShowMoreOptions(!showMoreOptions)}
                className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200"
              >
                <MoreVertical className="w-5 h-5" />
              </motion.button>

                {/* More Options Menu */}
                <AnimatePresence>
                  {showMoreOptions && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full mb-2 right-0 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2 min-w-48"
                    >
                      <button
                        onClick={onToggleParticipants}
                        className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center space-x-3"
                      >
                        <Users className="w-5 h-5" />
                        <span>Participants</span>
                      </button>
                      <button
                        onClick={onToggleChat}
                        className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center space-x-3"
                      >
                        <MessageSquare className="w-5 h-5" />
                        <span>Chat</span>
                      </button>
                      <button
                        onClick={onToggleSettings}
                        className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center space-x-3"
                      >
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                      </button>
                      <button
                        onClick={onToggleFullscreen}
                        className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center space-x-3"
                      >
                        <Maximize className="w-5 h-5" />
                        <span>Fullscreen</span>
                      </button>
                      <div className="border-t border-gray-700 my-2"></div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/meet/${meetingId}`);
                          setShowMoreOptions(false);
                        }}
                        className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center space-x-3"
                      >
                        <Copy className="w-5 h-5" />
                        <span>Copy Meeting Link</span>
                      </button>
                      <button
                        className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center space-x-3"
                      >
                        <Info className="w-5 h-5" />
                        <span>Meeting Info</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default MeetingControls;
