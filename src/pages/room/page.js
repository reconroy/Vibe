import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import DynamicGrid from './components/DynamicGrid';
import MeetingControls from './components/MeetingControls';
import SidePanel from './components/SidePanel';
import useWindowDimensions from './hooks/useWindowDimensions';

const MeetingRoom = () => {
  const router = useRouter();
  const { id: meetingId } = router.query;
  const { width, height } = useWindowDimensions();

  // Meeting state
  const [participants, setParticipants] = useState([]);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [pinnedParticipant, setPinnedParticipant] = useState(null);
  const [showControls, setShowControls] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const controlsTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  // Mock participants data - in real app this would come from WebRTC/Socket.io
  useEffect(() => {
    const mockParticipants = [
      {
        id: 'user-1',
        name: 'You',
        isLocal: true,
        isMuted: !isMicOn,
        isCameraOff: !isCameraOn,
        isHost: true,
        avatar: 'YU',
        stream: null
      },
      {
        id: 'user-2',
        name: 'Sarah Chen',
        isLocal: false,
        isMuted: false,
        isCameraOff: false,
        isHost: false,
        avatar: 'SC',
        stream: null
      },
      {
        id: 'user-3',
        name: 'Alex Rodriguez',
        isLocal: false,
        isMuted: true,
        isCameraOff: false,
        isHost: false,
        avatar: 'AR',
        stream: null
      },
      {
        id: 'user-4',
        name: 'Maria Kim',
        isLocal: false,
        isMuted: false,
        isCameraOff: true,
        isHost: false,
        avatar: 'MK',
        stream: null
      },
      {
        id: 'user-5',
        name: 'John Smith',
        isLocal: false,
        isMuted: false,
        isCameraOff: false,
        isHost: false,
        avatar: 'JS',
        stream: null
      },
      {
        id: 'user-6',
        name: 'Emma Wilson',
        isLocal: false,
        isMuted: true,
        isCameraOff: false,
        isHost: false,
        avatar: 'EW',
        stream: null
      }
    ];

    setParticipants(mockParticipants);
  }, [isMicOn, isCameraOn]);

  // Auto-hide controls after inactivity
  useEffect(() => {
    const resetControlsTimeout = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    const handleMouseMove = () => resetControlsTimeout();
    const handleKeyPress = () => resetControlsTimeout();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyPress);
    resetControlsTimeout();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyPress);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // Control handlers
  const handleToggleMic = () => setIsMicOn(!isMicOn);
  const handleToggleCamera = () => setIsCameraOn(!isCameraOn);
  const handleToggleSpeaker = () => setIsSpeakerOn(!isSpeakerOn);
  const handlePinParticipant = (participant) => {
    setPinnedParticipant(pinnedParticipant?.id === participant?.id ? null : participant);
  };
  const handleEndCall = () => {
    router.push('/');
  };
  const handleToggleParticipants = () => setShowParticipants(!showParticipants);
  const handleToggleChat = () => setShowChat(!showChat);
  const handleToggleSettings = () => setShowSettings(!showSettings);
  const handleShareScreen = () => {
    // Screen sharing logic would go here
    console.log('Share screen clicked');
  };
  const handleCopyMeetingLink = () => {
    if (meetingId) {
      navigator.clipboard.writeText(`${window.location.origin}/meet/${meetingId}`);
    }
  };
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleMuteParticipant = (participantId) => {
    // In real app, this would send a signal to mute the participant
    console.log('Mute participant:', participantId);
  };

  const handleRemoveParticipant = (participantId) => {
    // In real app, this would remove the participant from the meeting
    setParticipants(prev => prev.filter(p => p.id !== participantId));
  };

  const handleCloseSidePanel = () => {
    setShowParticipants(false);
    setShowChat(false);
  };

  // Calculate container dimensions (accounting for controls and side panel)
  const containerHeight = height - (showControls ? 120 : 0);
  const containerWidth = width - ((showParticipants || showChat) ? 320 : 0);

  return (
    <div
      ref={containerRef}
      className="h-screen bg-gray-900 relative overflow-hidden"
      onMouseMove={() => setShowControls(true)}
    >
      {/* Dynamic Grid Layout */}
      <div className="h-full transition-all duration-300" style={{ marginRight: (showParticipants || showChat) ? '320px' : '0' }}>
        <DynamicGrid
          participants={participants}
          pinnedParticipant={pinnedParticipant}
          onPinParticipant={handlePinParticipant}
          containerWidth={containerWidth}
          containerHeight={containerHeight}
        />
      </div>

      {/* Side Panel */}
      <SidePanel
        isOpen={showParticipants || showChat}
        onClose={handleCloseSidePanel}
        activeTab={showParticipants ? 'participants' : 'chat'}
        participants={participants}
        onMuteParticipant={handleMuteParticipant}
        onRemoveParticipant={handleRemoveParticipant}
      />

      {/* Meeting Controls */}
      <MeetingControls
        isMicOn={isMicOn}
        isCameraOn={isCameraOn}
        isSpeakerOn={isSpeakerOn}
        onToggleMic={handleToggleMic}
        onToggleCamera={handleToggleCamera}
        onToggleSpeaker={handleToggleSpeaker}
        onEndCall={handleEndCall}
        onToggleParticipants={handleToggleParticipants}
        onToggleChat={handleToggleChat}
        onToggleSettings={handleToggleSettings}
        onShareScreen={handleShareScreen}
        onCopyMeetingLink={handleCopyMeetingLink}
        onToggleFullscreen={handleToggleFullscreen}
        participantCount={participants.length}
        meetingId={meetingId || 'Loading...'}
        showControls={showControls}
      />
    </div>
  );
};

export default MeetingRoom;