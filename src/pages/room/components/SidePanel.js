import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Users, 
  MessageSquare, 
  Send, 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff,
  MoreVertical,
  Crown,
  UserX
} from 'lucide-react';

const SidePanel = ({ 
  isOpen, 
  onClose, 
  activeTab, 
  participants, 
  onMuteParticipant,
  onRemoveParticipant 
}) => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'Sarah Chen',
      message: 'Hello everyone! Thanks for joining the meeting.',
      timestamp: new Date(Date.now() - 300000),
      isLocal: false
    },
    {
      id: 2,
      sender: 'You',
      message: 'Hi Sarah! Happy to be here.',
      timestamp: new Date(Date.now() - 240000),
      isLocal: true
    },
    {
      id: 3,
      sender: 'Alex Rodriguez',
      message: 'Can everyone see my screen?',
      timestamp: new Date(Date.now() - 120000),
      isLocal: false
    }
  ]);

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        sender: 'You',
        message: chatMessage,
        timestamp: new Date(),
        isLocal: true
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatMessage('');
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const panelVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed top-0 right-0 h-full w-80 bg-gray-800 border-l border-gray-700 z-40 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              {activeTab === 'participants' ? (
                <>
                  <Users className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">Participants ({participants.length})</span>
                </>
              ) : (
                <>
                  <MessageSquare className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">Chat</span>
                </>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-700 rounded text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'participants' ? (
              <ParticipantsList 
                participants={participants}
                onMuteParticipant={onMuteParticipant}
                onRemoveParticipant={onRemoveParticipant}
              />
            ) : (
              <ChatPanel
                messages={chatMessages}
                chatMessage={chatMessage}
                setChatMessage={setChatMessage}
                onSendMessage={handleSendMessage}
                formatTime={formatTime}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ParticipantsList = ({ participants, onMuteParticipant, onRemoveParticipant }) => {
  const [hoveredParticipant, setHoveredParticipant] = useState(null);

  return (
    <div className="p-4 space-y-2 overflow-y-auto h-full">
      {participants.map((participant) => (
        <motion.div
          key={participant.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-700 transition-colors"
          onMouseEnter={() => setHoveredParticipant(participant.id)}
          onMouseLeave={() => setHoveredParticipant(null)}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold">
              {participant.avatar}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-white font-medium">
                  {participant.name}
                  {participant.isLocal && ' (You)'}
                </span>
                {participant.isHost && (
                  <Crown className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <div className="flex items-center space-x-1 mt-1">
                {participant.isMuted ? (
                  <MicOff className="w-3 h-3 text-red-500" />
                ) : (
                  <Mic className="w-3 h-3 text-green-500" />
                )}
                {participant.isCameraOff ? (
                  <CameraOff className="w-3 h-3 text-red-500" />
                ) : (
                  <Camera className="w-3 h-3 text-green-500" />
                )}
              </div>
            </div>
          </div>

          {/* Participant Actions */}
          {hoveredParticipant === participant.id && !participant.isLocal && (
            <div className="flex items-center space-x-1">
              <button
                onClick={() => onMuteParticipant(participant.id)}
                className="p-1 hover:bg-gray-600 rounded text-white"
                title="Mute participant"
              >
                <MicOff className="w-4 h-4" />
              </button>
              <button
                onClick={() => onRemoveParticipant(participant.id)}
                className="p-1 hover:bg-gray-600 rounded text-red-400"
                title="Remove participant"
              >
                <UserX className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

const ChatPanel = ({ messages, chatMessage, setChatMessage, onSendMessage, formatTime }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col ${message.isLocal ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                message.isLocal
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-white'
              }`}
            >
              {!message.isLocal && (
                <div className="text-xs text-gray-300 mb-1 font-medium">
                  {message.sender}
                </div>
              )}
              <div className="text-sm">{message.message}</div>
              <div className="text-xs text-gray-300 mt-1">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            onClick={onSendMessage}
            disabled={!chatMessage.trim()}
            className="p-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
