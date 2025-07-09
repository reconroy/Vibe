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

import { Button } from "@/components/ui/button";
import Header from "./components/Header";
import RightPanel from "./components/RightPanel";
import Configure from "./components/Configure";

// Tooltip-related (dummy for now)
const Tooltip = ({ children }) => children;
const TooltipTrigger = ({ children }) => children;
const TooltipContent = ({ children }) => null;
const TooltipProvider = ({ children }) => children;

// Reusable select component
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
        <div className="absolute z-10 w-full mt-1 mb-1 bottom-full bg-gray-800 border border-white/20 rounded-md">
          {children}
        </div>
      )}
    </div>
  );
};

const SelectItem = ({ value, children, onClick }) => (
  <button
    className="w-full px-3 py-2 text-left text-white hover:bg-white/10"
    onClick={() => {
      onClick?.(value);
    }}
  >
    {children}
  </button>
);

const MeetingPage = () => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);

  const [stream, setStream] = useState(null);
  const [videoTrack, setVideoTrack] = useState(null);
  const [audioTrack, setAudioTrack] = useState(null);

  const [audioLevel, setAudioLevel] = useState(0);
  const [analyser, setAnalyser] = useState(null);

  const [cameras, setCameras] = useState([]);
  const [mics, setMics] = useState([]);
  const [speakers, setSpeakers] = useState([]);

  const videoRef = useRef(null);
  const micAnalyserRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Realtime mic volume visualization
  useEffect(() => {
    if (!stream) return;

    const audioCtx = new AudioContext();
    audioCtxRef.current = audioCtx;

    const source = audioCtx.createMediaStreamSource(stream);
    const analyserNode = audioCtx.createAnalyser();
    analyserNode.fftSize = 512;

    source.connect(analyserNode);
    micAnalyserRef.current = analyserNode;
    setAnalyser(analyserNode);

    const dataArray = new Uint8Array(analyserNode.frequencyBinCount);

    const checkVolume = () => {
      analyserNode.getByteFrequencyData(dataArray);
      const volume = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
      setAudioLevel(volume);
      requestAnimationFrame(checkVolume);
    };

    checkVolume();

    return () => {
      source.disconnect();
      analyserNode.disconnect();
      audioCtx.close();
    };
  }, [stream]);

  // Init media stream
  useEffect(() => {
    const init = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        setCameras(devices.filter(d => d.kind === "videoinput"));
        setMics(devices.filter(d => d.kind === "audioinput"));
        setSpeakers(devices.filter(d => d.kind === "audiooutput"));

        const media = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(media);
        setVideoTrack(media.getVideoTracks()[0]);
        setAudioTrack(media.getAudioTracks()[0]);

        if (videoRef.current) {
          videoRef.current.srcObject = media;
        }
      } catch (e) {
        console.error("Error accessing media devices", e);
      }
    };
    init();
  }, []);

  const toggleMic = () => {
    if (!audioTrack) return;
    audioTrack.enabled = !audioTrack.enabled;
    setIsMicOn(audioTrack.enabled);
  };

  const toggleCamera = () => {
    if (!videoTrack) return;
    videoTrack.enabled = !videoTrack.enabled;
    setIsCameraOn(videoTrack.enabled);
  };

  const switchCamera = async (deviceId) => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({ video: { deviceId } });
      const newVideoTrack = videoStream.getVideoTracks()[0];

      stream.removeTrack(videoTrack);
      stream.addTrack(newVideoTrack);
      setVideoTrack(newVideoTrack);

      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (e) {
      console.error("Error switching camera:", e);
    }
  };

  const switchMic = async (deviceId) => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId } });
      const newAudioTrack = audioStream.getAudioTracks()[0];

      stream.removeTrack(audioTrack);
      stream.addTrack(newAudioTrack);
      setAudioTrack(newAudioTrack);

      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (e) {
      console.error("Error switching mic:", e);
    }
  };

  const switchSpeaker = async (deviceId) => {
    if (videoRef.current?.setSinkId) {
      try {
        await videoRef.current.setSinkId(deviceId);
      } catch (e) {
        console.warn("setSinkId failed:", e);
      }
    } else {
      console.warn("Speaker switching not supported in this browser");
    }
  };

  const meetingId = "abc-defg-hij";
  const hostName = "Sarah Chen";
  const participants = [
    { name: "Sarah Chen", avatar: "SC", isHost: true },
    { name: "Alex Rodriguez", avatar: "AR", isHost: false },
    { name: "Maria Kim", avatar: "MK", isHost: false },
    { name: "John Smith", avatar: "JS", isHost: false },
    { name: "Emma Wilson", avatar: "EW", isHost: false },
  ];

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  const formatDate = (date) => date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const copyMeetingId = () => navigator.clipboard.writeText(meetingId);

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

        {/* Layout */}
        <div className="relative z-10 max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[calc(100vh-120px)]">
            {/* Left: Video & Audio + Settings */}
            <Configure
              motion={motion}
              Button={Button}
              isCameraOn={isCameraOn}
              toggleCamera={toggleCamera}
              isMicOn={isMicOn}
              toggleMic={toggleMic}
              isSpeakerMuted={isSpeakerMuted}
              setIsSpeakerMuted={setIsSpeakerMuted}
              audioLevel={audioLevel}
              videoRef={videoRef}
              CameraOff={CameraOff}
              Tooltip={Tooltip}
              TooltipTrigger={TooltipTrigger}
              TooltipContent={TooltipContent}
              Camera={Camera}
              MicOff={MicOff}
              Mic={Mic}
              Speaker={Speaker}
              Settings={Settings}
              Select={Select}
              SelectItem={SelectItem}
              switchCamera={switchCamera}
              switchMic={switchMic}
              switchSpeaker={switchSpeaker}
              cameras={cameras}
              mics={mics}
              speakers={speakers}
            />

            {/* Right */}
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
