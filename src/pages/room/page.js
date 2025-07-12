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
  const showControls = true; // Always show controls for now
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    const savedMicState = localStorage.getItem('vibe-mic-state');
    const savedCameraState = localStorage.getItem('vibe-camera-state');
    const savedSpeakerState = localStorage.getItem('vibe-speaker-state');

    if (savedMicState !== null) setIsMicOn(JSON.parse(savedMicState));
    if (savedCameraState !== null) setIsCameraOn(JSON.parse(savedCameraState));
    if (savedSpeakerState !== null) setIsSpeakerOn(JSON.parse(savedSpeakerState));
  }, []);

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
      }
    ];

    setParticipants(mockParticipants);
  }, [isMicOn, isCameraOn]);

  // Controls are always visible for now - removed auto-hide functionality

  // Control handlers
  const handleToggleMic = () => {
    const newState = !isMicOn;
    setIsMicOn(newState);
    localStorage.setItem('vibe-mic-state', JSON.stringify(newState));
  };

  const handleToggleCamera = () => {
    const newState = !isCameraOn;
    setIsCameraOn(newState);
    localStorage.setItem('vibe-camera-state', JSON.stringify(newState));
  };

  const handleToggleSpeaker = () => {
    const newState = !isSpeakerOn;
    setIsSpeakerOn(newState);
    localStorage.setItem('vibe-speaker-state', JSON.stringify(newState));
  };

  const handleAddTestUser = () => {
    const testUsers = [
      { id: 'user-2', name: 'Sarah Chen', avatar: 'SC', isMuted: false, isCameraOff: false },
      { id: 'user-3', name: 'Alex Rodriguez', avatar: 'AR', isMuted: true, isCameraOff: false },
      { id: 'user-4', name: 'Maria Kim', avatar: 'MK', isMuted: false, isCameraOff: true },
      { id: 'user-5', name: 'John Smith', avatar: 'JS', isMuted: false, isCameraOff: false },
      { id: 'user-6', name: 'Emma Wilson', avatar: 'EW', isMuted: true, isCameraOff: false }
    ];

    const nextUser = testUsers.find(user => !participants.some(p => p.id === user.id));
    if (nextUser) {
      setParticipants(prev => [...prev, { ...nextUser, isLocal: false, isHost: false, stream: null }]);
    }
  };
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

  // Calculate container dimensions with fixed areas - Google Meet style
  const CONTROLS_HEIGHT = 80; // Reduced height for controls
  const SIDE_PANEL_WIDTH = 320; // Fixed width for side panel

  const containerHeight = height - CONTROLS_HEIGHT;
  const containerWidth = width - ((showParticipants || showChat) ? SIDE_PANEL_WIDTH : 0);

  return (
    <div
      ref={containerRef}
      className="h-screen bg-gray-900 relative overflow-hidden"
    >
      {/* Video Feed Area - Full height with bottom padding for controls */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          right: (showParticipants || showChat) ? `${SIDE_PANEL_WIDTH}px` : '0',
          bottom: `${CONTROLS_HEIGHT}px`
        }}
      >
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

      {/* Meeting Controls - Fixed at bottom */}
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
        onAddTestUser={handleAddTestUser}
        participantCount={participants.length}
        meetingId={meetingId || 'Loading...'}
        showControls={showControls}
      />
    </div>
  );
};

export default MeetingRoom;