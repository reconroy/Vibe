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
import { BackgroundParticles } from "@/components/BackgroundParticles";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      <div className="min-h-screen bg-vibe-dark relative overflow-x-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-vibe-dark via-vibe-dark to-vibe-purple/5" />
          <BackgroundParticles />
        </div>

        <motion.header className="relative z-10 p-6 border-b border-white/10" initial={{ opacity: 0.8 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div className="text-2xl font-bold text-white" whileHover={{ scale: 1.05 }}>Vibe</motion.div>
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
                <TooltipTrigger asChild>
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

        <div className="relative z-10 max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[calc(100vh-120px)]">
            <div className="lg:col-span-2 space-y-6">
              <motion.div className="glass-card relative aspect-video bg-gradient-to-br from-vibe-gray-800 to-vibe-gray-900 rounded-2xl overflow-hidden" initial={{ opacity: 0.9 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  {isCameraOn ? (
                    <div className="relative w-full h-full bg-gradient-to-br from-vibe-purple/20 to-vibe-purple/5 flex items-center justify-center">
                      <div className="w-32 h-32 bg-vibe-purple rounded-full flex items-center justify-center text-white text-4xl font-semibold">
                        You
                      </div>
                      <div className="absolute inset-0 bg-black/10" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-white/60">
                      <CameraOff className="w-16 h-16 mb-4" />
                      <p className="text-lg">Camera is off</p>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <motion.div className="flex items-center space-x-4 glass px-6 py-3 rounded-full" initial={{ opacity: 0.9 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant={isMicOn ? "default" : "destructive"} size="icon" className="rounded-full w-12 h-12" onClick={() => setIsMicOn(!isMicOn)}>
                          {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isMicOn ? "Mute microphone" : "Unmute microphone"}</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant={isCameraOn ? "default" : "destructive"} size="icon" className="rounded-full w-12 h-12" onClick={() => setIsCameraOn(!isCameraOn)}>
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

              <motion.div className="glass-card space-y-4 hover:bg-white/[0.04] transition-all duration-300" initial={{ opacity: 0.9 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} whileHover={{ y: -2 }}>
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Device Settings</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-white/80 flex items-center space-x-2">
                      <Camera className="w-4 h-4" />
                      <span>Camera</span>
                    </label>
                    <Select defaultValue="default-camera">
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default-camera">Default Camera</SelectItem>
                        <SelectItem value="external-camera">External Camera</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-white/80 flex items-center space-x-2">
                      <Mic className="w-4 h-4" />
                      <span>Microphone</span>
                    </label>
                    <Select defaultValue="default-mic">
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default-mic">Default Microphone</SelectItem>
                        <SelectItem value="external-mic">External Microphone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-white/80 flex items-center space-x-2">
                      <Speaker className="w-4 h-4" />
                      <span>Speakers</span>
                    </label>
                    <Select defaultValue="default-speakers">
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default-speakers">Default Speakers</SelectItem>
                        <SelectItem value="headphones">Headphones</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MeetingPage;