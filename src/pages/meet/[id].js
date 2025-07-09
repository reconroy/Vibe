import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  Settings,
  Users,
  Clock,
  Calendar,
  Speaker,
  Copy
} from "lucide-react";

const BackgroundParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-500/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

const Button = ({ children, className = "", variant = "default", size = "default", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none disabled:opacity-50";
  
  const variants = {
    default: "bg-purple-600 text-white hover:bg-purple-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    ghost: "hover:bg-white/10 text-white",
  };
  
  const sizes = {
    default: "px-4 py-2 rounded-md",
    icon: "w-10 h-10 rounded-md",
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Select = ({ children, defaultValue, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  
  return (
    <div className="relative">
      <button
        className="w-full px-3 py-2 text-left bg-white/5 border border-white/20 rounded-md text-white flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-white/20 rounded-md">
          {children}
        </div>
      )}
    </div>
  );
};

const SelectItem = ({ value, children, onClick }) => (
  <button
    className="w-full px-3 py-2 text-left text-white hover:bg-white/10"
    onClick={() => onClick?.(value)}
  >
    {children}
  </button>
);

const Tooltip = ({ children }) => children;
const TooltipTrigger = ({ children }) => children;
const TooltipContent = ({ children }) => null;
const TooltipProvider = ({ children }) => children;

const MeetingPage = () => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  const meetingId = "abc-defg-hij";
  const hostName = "Sarah Chen";
  const participants = [
    { name: "Sarah Chen", avatar: "SC", isHost: true },
    { name: "Alex Rodriguez", avatar: "AR", isHost: false },
    { name: "Maria Kim", avatar: "MK", isHost: false },
    { name: "John Smith", avatar: "JS", isHost: false },
    { name: "Emma Wilson", avatar: "EW", isHost: false },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const copyMeetingId = () => {
    navigator.clipboard.writeText(meetingId);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-900 relative overflow-x-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/5" />
          <BackgroundParticles />
        </div>

        {/* Header */}
        <motion.header 
          className="relative z-10 p-6 border-b border-white/10" 
          initial={{ opacity: 0.8 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div 
                className="text-2xl font-bold text-white" 
                whileHover={{ scale: 1.05 }}
              >
                Vibe
              </motion.div>
              <div className="hidden md:block w-px h-8 bg-white/20" />
              <div className="hidden md:flex items-center space-x-6 text-white/80">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{formatDate(currentTime)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-mono">{formatTime(currentTime)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10">
                    <Settings className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </motion.header>

        {/* Main Layout */}
        <div className="relative z-10 max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[calc(100vh-120px)]">
            
            {/* Left: Video + Settings */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Preview */}
              <motion.div 
                className="relative aspect-video bg-gradient-to-br from-purple-700/40 via-purple-800/30 to-purple-900/20 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10" 
                initial={{ opacity: 0.9 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {isCameraOn ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="w-32 h-32 bg-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-semibold shadow-2xl">
                        You
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-white/60">
                      <CameraOff className="w-16 h-16 mb-4" />
                      <p className="text-lg">Camera is off</p>
                    </div>
                  )}
                </div>

                {/* Control Buttons */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <motion.div 
                    className="flex items-center space-x-4 bg-black/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/10" 
                    initial={{ opacity: 0.9 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 0.2 }}
                  >
                    <Tooltip>
                      <TooltipTrigger>
                        <Button 
                          variant={isMicOn ? "default" : "destructive"} 
                          size="icon" 
                          className="rounded-full w-12 h-12" 
                          onClick={() => setIsMicOn(!isMicOn)}
                        >
                          {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isMicOn ? "Mute microphone" : "Unmute microphone"}</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger>
                        <Button 
                          variant={isCameraOn ? "default" : "destructive"} 
                          size="icon" 
                          className="rounded-full w-12 h-12" 
                          onClick={() => setIsCameraOn(!isCameraOn)}
                        >
                          {isCameraOn ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isCameraOn ? "Turn off camera" : "Turn on camera"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </motion.div>
                </div>
              </motion.div>

              {/* Device Settings */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4 hover:bg-white/[0.04] transition-all duration-300" 
                initial={{ opacity: 0.9 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.2 }} 
                whileHover={{ y: -2 }}
              >
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Device Settings</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: <Camera className="w-4 h-4" />, label: "Camera", id: "Default Camera" },
                    { icon: <Mic className="w-4 h-4" />, label: "Microphone", id: "Default Microphone" },
                    { icon: <Speaker className="w-4 h-4" />, label: "Speakers", id: "Default Speakers" },
                  ].map((device, idx) => (
                    <div key={idx} className="space-y-2">
                      <label className="text-sm text-white/80 flex items-center space-x-2">
                        {device.icon}
                        <span>{device.label}</span>
                      </label>
                      <Select defaultValue={device.id}>
                        <SelectItem value={device.id}>{device.id}</SelectItem>
                        <SelectItem value={`External ${device.label}`}>External {device.label}</SelectItem>
                      </Select>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Panel */}
            <div className="space-y-6">
              {/* Meeting Details */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4 text-white" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold">Meeting Details</h3>
                <div className="bg-white/5 p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/60">Meeting ID</p>
                    <p className="text-sm font-mono">{meetingId}</p>
                  </div>
                  <Button size="icon" variant="ghost" onClick={copyMeetingId}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="text-xs text-white/60">Host</p>
                  <p className="text-sm">{hostName}</p>
                </div>
              </motion.div>

              {/* Participants */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4 text-white" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5" /> Participants ({participants.length})
                </h3>
                <div className="space-y-2">
                  {participants.slice(0, 2).map((p, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">
                        {p.avatar}
                      </div>
                      <div className="flex items-center gap-2">
                        <p>{p.name}</p>
                        {p.isHost && <span className="bg-purple-600/40 text-xs px-2 py-0.5 rounded-md">Host</span>}
                      </div>
                    </div>
                  ))}
                  {participants.length > 2 && (
                    <p className="text-sm text-white/50">+{participants.length - 2} more participants</p>
                  )}
                </div>
              </motion.div>

              {/* Join Button */}
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.4 }}
              >
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-6 rounded-xl shadow-xl">
                  Join Now
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MeetingPage;