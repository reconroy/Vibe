import { useState, useEffect, useRef } from "react";
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

import { Button } from "@/components/ui/button"

//major components 
import Header from "./components/Header";
import RightPanel from "./components/RightPanel";
import Configure from "./components/Configure";

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
  const [stream, setStream] = useState(null);
  const [audioOutput, setAudioOutput] = useState(""); // For speaker selection
  const videoRef = useRef(null);
  const [cameras, setCameras] = useState([]);
  const [mics, setMics] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isSpeakerMuted;
    }
  }, [isSpeakerMuted]);


  useEffect(() => {
    const getDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      setCameras(devices.filter(d => d.kind === "videoinput"));
      setMics(devices.filter(d => d.kind === "audioinput"));
      setSpeakers(devices.filter(d => d.kind === "audiooutput"));
    };

    getDevices();
  }, []);
  const switchCamera = async (deviceId) => {
    const newStream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId },
      audio: true,
    });
    setStream(newStream);
    if (videoRef.current) videoRef.current.srcObject = newStream;
  };

  const switchMic = async (deviceId) => {
    const newStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: { deviceId },
    });
    setStream(newStream);
    if (videoRef.current) videoRef.current.srcObject = newStream;
  };

  const switchSpeaker = async (deviceId) => {
    if (videoRef.current && videoRef.current.setSinkId) {
      await videoRef.current.setSinkId(deviceId);
      setAudioOutput(deviceId);
    }
  };


  const toggleMic = () => {
    stream?.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
    });
    setIsMicOn(prev => !prev);
  };

  const toggleCamera = () => {
    stream?.getVideoTracks().forEach(track => {
      track.enabled = !track.enabled;
    });
    setIsCameraOn(prev => !prev);
  };


  useEffect(() => {
    const initMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Failed to get media stream:", err);
      }
    };

    initMedia();
  }, []);


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

        {/* Header */}
        <Header
          motion={motion}
          currentTime={currentTime}
          formatDate={formatDate}
          formatTime={formatTime}
          Tooltip={Tooltip}
          Button={Button}
          Settings={Settings}
          Calendar={Calendar}
          Clock={Clock}
          TooltipTrigger={TooltipTrigger}
          TooltipContent={TooltipContent}
        />

        {/* Main Layout */}
        <div className="relative z-10 max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[calc(100vh-120px)]">

            {/* Left: Video & Audio + Settings */}
            <Configure
              motion={motion}
              isCameraOn={isCameraOn}
              toggleCamera={toggleCamera}
              isMicOn={isMicOn}
              toggleMic={toggleMic}
              videoRef={videoRef}
              CameraOff={CameraOff}
              Tooltip={Tooltip}
              TooltipTrigger={TooltipTrigger}
              TooltipContent={TooltipContent}
              Camera={Camera}
              Button={Button}
              MicOff={MicOff}
              Mic={Mic}
              Speaker={Speaker}
              Settings={Settings}
              Select={Select}
              SelectItem={SelectItem}
            />

            {/* Right Panel */}
            <RightPanel
              motion={motion}
              meetingId={meetingId}
              hostName={hostName}
              participants={participants}
              copyMeetingId={copyMeetingId}
              Button={Button}
              Copy={Copy}
              Users={Users}
            />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MeetingPage;