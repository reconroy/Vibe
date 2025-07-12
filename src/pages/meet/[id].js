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
import { Select } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/selectItem";

const Tooltip = ({ children }) => children;
const TooltipTrigger = ({ children }) => children;
const TooltipContent = ({ children }) => null;
const TooltipProvider = ({ children }) => children;

const MeetingPage = () => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  const [cameras, setCameras] = useState([]);
  const [mics, setMics] = useState([]);
  const [speakers, setSpeakers] = useState([]);

  const [selectedCamera, setSelectedCamera] = useState(null);
  const [selectedMic, setSelectedMic] = useState(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  const [stream, setStream] = useState(null);
  const [videoTrack, setVideoTrack] = useState(null);
  const [audioTrack, setAudioTrack] = useState(null);

  const videoRef = useRef(null);
  const loopbackAudioRef = useRef(null);

  // Local storage keys
  const STORAGE_KEYS = {
    camera: 'vibe_selected_camera',
    mic: 'vibe_selected_mic',
    speaker: 'vibe_selected_speaker'
  };

  // Load device preferences from localStorage
  const loadDevicePreferences = () => {
    try {
      return {
        camera: localStorage.getItem(STORAGE_KEYS.camera),
        mic: localStorage.getItem(STORAGE_KEYS.mic),
        speaker: localStorage.getItem(STORAGE_KEYS.speaker)
      };
    } catch (error) {
      console.warn('Failed to load device preferences:', error);
      return { camera: null, mic: null, speaker: null };
    }
  };

  // Save device preference to localStorage
  const saveDevicePreference = (type, deviceId) => {
    try {
      localStorage.setItem(STORAGE_KEYS[type], deviceId);
    } catch (error) {
      console.warn(`Failed to save ${type} preference:`, error);
    }
  };

  // Initialize devices and media
  useEffect(() => {
    const init = async () => {
      try {
        // Get available devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        const availableCameras = devices.filter(d => d.kind === "videoinput");
        const availableMics = devices.filter(d => d.kind === "audioinput");
        const availableSpeakers = devices.filter(d => d.kind === "audiooutput");

        setCameras(availableCameras);
        setMics(availableMics);
        setSpeakers(availableSpeakers);

        // Load saved preferences
        const preferences = loadDevicePreferences();

        // Determine which devices to use
        let cameraToUse = null;
        let micToUse = null;
        let speakerToUse = null;

        // Camera selection
        if (availableCameras.length > 0) {
          const savedCamera = availableCameras.find(cam => cam.deviceId === preferences.camera);
          cameraToUse = savedCamera || availableCameras[0];
          setSelectedCamera(cameraToUse.deviceId);
          if (!savedCamera) saveDevicePreference('camera', cameraToUse.deviceId);
        } else {
          setIsCameraOn(false);
        }

        // Microphone selection
        if (availableMics.length > 0) {
          const savedMic = availableMics.find(mic => mic.deviceId === preferences.mic);
          micToUse = savedMic || availableMics[0];
          setSelectedMic(micToUse.deviceId);
          if (!savedMic) saveDevicePreference('mic', micToUse.deviceId);
        } else {
          setIsMicOn(false);
        }

        // Speaker selection
        if (availableSpeakers.length > 0) {
          const savedSpeaker = availableSpeakers.find(spk => spk.deviceId === preferences.speaker);
          speakerToUse = savedSpeaker || availableSpeakers[0];
          setSelectedSpeaker(speakerToUse.deviceId);
          if (!savedSpeaker) saveDevicePreference('speaker', speakerToUse.deviceId);
        } else {
          setIsSpeakerMuted(true);
        }

        // Get media stream with selected devices
        if (cameraToUse || micToUse) {
          const constraints = {};
          if (cameraToUse) {
            constraints.video = { deviceId: { exact: cameraToUse.deviceId } };
          }
          if (micToUse) {
            constraints.audio = { deviceId: { exact: micToUse.deviceId } };
          }

          const media = await navigator.mediaDevices.getUserMedia(constraints);
          setStream(media);

          const videoTracks = media.getVideoTracks();
          const audioTracks = media.getAudioTracks();

          if (videoTracks.length > 0) {
            setVideoTrack(videoTracks[0]);
          }
          if (audioTracks.length > 0) {
            setAudioTrack(audioTracks[0]);
          }

          if (videoRef.current) {
            videoRef.current.srcObject = media;
          }
        }
      } catch (error) {
        console.error('Failed to initialize media devices:', error);
        // If we can't get media, disable all controls
        setIsCameraOn(false);
        setIsMicOn(false);
        setIsSpeakerMuted(true);
      }
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
    try {
      if (stream && videoTrack) {
        // Stop current video track
        videoTrack.stop();

        // Get new video stream with selected camera
        const newVideoStream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: deviceId } }
        });

        const newVideoTrack = newVideoStream.getVideoTracks()[0];

        // Replace video track in existing stream
        stream.removeTrack(videoTrack);
        stream.addTrack(newVideoTrack);

        // Update state
        setVideoTrack(newVideoTrack);
        setSelectedCamera(deviceId);
        saveDevicePreference('camera', deviceId);

        // Update video element
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Maintain camera on/off state
        newVideoTrack.enabled = isCameraOn;
      }
    } catch (error) {
      console.error('Failed to switch camera:', error);
    }
  };

  const switchMic = async (deviceId) => {
    try {
      if (stream && audioTrack) {
        // Stop current audio track
        audioTrack.stop();

        // Get new audio stream with selected microphone
        const newAudioStream = await navigator.mediaDevices.getUserMedia({
          audio: { deviceId: { exact: deviceId } }
        });

        const newAudioTrack = newAudioStream.getAudioTracks()[0];

        // Replace audio track in existing stream
        stream.removeTrack(audioTrack);
        stream.addTrack(newAudioTrack);

        // Update state
        setAudioTrack(newAudioTrack);
        setSelectedMic(deviceId);
        saveDevicePreference('mic', deviceId);

        // Maintain mic on/off state
        newAudioTrack.enabled = isMicOn;
      }
    } catch (error) {
      console.error('Failed to switch microphone:', error);
    }
  };

  const switchSpeaker = async (deviceId) => {
    try {
      if (videoRef.current && videoRef.current.setSinkId) {
        await videoRef.current.setSinkId(deviceId);
        setSelectedSpeaker(deviceId);
        saveDevicePreference('speaker', deviceId);
      }
    } catch (error) {
      console.error('Failed to switch speaker:', error);
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
              selectedCamera={selectedCamera}
              selectedMic={selectedMic}
              selectedSpeaker={selectedSpeaker}
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