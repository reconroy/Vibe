// MeetingPage.js
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
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "./components/Header";
import RightPanel from "./components/RightPanel";
import Configure from "./components/Configure";

const Tooltip = ({ children }) => children;
const TooltipTrigger = ({ children }) => children;
const TooltipContent = ({ children }) => null;
const TooltipProvider = ({ children }) => children;

const Select = ({ children, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue) => {
    setValue(newValue);
    setIsOpen(false);
  };

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
        <div className="absolute bottom-full mb-1 z-10 w-full bg-gray-800 border border-white/20 rounded-md">
          {children(handleChange)}
        </div>
      )}
    </div>
  );
};

const SelectItem = ({ value, children, onClick, onValueChange }) => (
  <button
    className="w-full px-3 py-2 text-left text-white hover:bg-white/10"
    onClick={() => {
      onClick?.(value);
      onValueChange?.(value);
    }}
  >
    {children}
  </button>
);

const MeetingPage = () => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  const [cameras, setCameras] = useState([]);
  const [mics, setMics] = useState([]);
  const [speakers, setSpeakers] = useState([]);

  const [stream, setStream] = useState(null);
  const [videoTrack, setVideoTrack] = useState(null);
  const [audioTrack, setAudioTrack] = useState(null);

  const videoRef = useRef(null);
  const loopbackAudioRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      setCameras(devices.filter(d => d.kind === "videoinput"));
      setMics(devices.filter(d => d.kind === "audioinput"));
      setSpeakers(devices.filter(d => d.kind === "audiooutput"));

      const media = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(media);
      const video = media.getVideoTracks()[0];
      const audio = media.getAudioTracks()[0];
      setVideoTrack(video);
      setAudioTrack(audio);
      if (videoRef.current) videoRef.current.srcObject = media;
    };
    init();
  }, []);

  useEffect(() => {
    if (!stream) return;
    const ctx = new AudioContext();
    const src = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    src.connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);

    const detect = () => {
      analyser.getByteFrequencyData(data);
      const avg = data.reduce((a, b) => a + b, 0) / data.length;
      setAudioLevel(avg);
      requestAnimationFrame(detect);
    };
    detect();
  }, [stream]);

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
    const newStream = await navigator.mediaDevices.getUserMedia({ video: { deviceId } });
    const newVideo = newStream.getVideoTracks()[0];
    stream.removeTrack(videoTrack);
    stream.addTrack(newVideo);
    setVideoTrack(newVideo);
    videoRef.current.srcObject = stream;
  };

  const switchMic = async (deviceId) => {
    const newStream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId } });
    const newAudio = newStream.getAudioTracks()[0];
    stream.removeTrack(audioTrack);
    stream.addTrack(newAudio);
    setAudioTrack(newAudio);
    videoRef.current.srcObject = stream;
  };

  const switchSpeaker = async (deviceId) => {
    if (videoRef.current?.setSinkId) {
      await videoRef.current.setSinkId(deviceId);
    }
  };

  const testMicLoopback = () => {
    if (!audioTrack) return;
    const loopback = new MediaStream([audioTrack]);
    loopbackAudioRef.current.srcObject = loopback;
    loopbackAudioRef.current.play();
    setTimeout(() => {
      loopbackAudioRef.current.pause();
      loopbackAudioRef.current.srcObject = null;
    }, 5000);
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
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (d) => d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const formatDate = (d) => d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const copyMeetingId = () => navigator.clipboard.writeText(meetingId);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-900 relative">
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

        <div className="relative z-10 max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[calc(100vh-120px)]">
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
              testMicLoopback={testMicLoopback}
            />

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

        <audio ref={loopbackAudioRef} className="hidden" />
      </div>
    </TooltipProvider>
  );
};

export default MeetingPage;