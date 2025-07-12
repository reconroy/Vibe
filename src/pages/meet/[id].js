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

  const [deviceNotification, setDeviceNotification] = useState(null);
  const [isLoopbackActive, setIsLoopbackActive] = useState(false);
  const [wasLoopbackActiveBeforeDisconnect, setWasLoopbackActiveBeforeDisconnect] = useState(false);

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
            constraints.audio = {
              deviceId: { exact: micToUse.deviceId },
              // Disable all audio processing to get raw microphone input
              echoCancellation: false,
              noiseSuppression: false,
              autoGainControl: false,
              googEchoCancellation: false,
              googAutoGainControl: false,
              googNoiseSuppression: false,
              googHighpassFilter: false,
              googTypingNoiseDetection: false,
              googAudioMirroring: false
            };
            console.log('Audio constraints (no processing):', constraints.audio);
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

  // Live device monitoring
  useEffect(() => {
    const handleDeviceChange = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const availableCameras = devices.filter(d => d.kind === "videoinput");
        const availableMics = devices.filter(d => d.kind === "audioinput");
        const availableSpeakers = devices.filter(d => d.kind === "audiooutput");

        // Update device lists
        setCameras(availableCameras);
        setMics(availableMics);
        setSpeakers(availableSpeakers);

        // Check if currently selected devices are still available
        const currentCameraExists = selectedCamera && availableCameras.find(cam => cam.deviceId === selectedCamera);
        const currentMicExists = selectedMic && availableMics.find(mic => mic.deviceId === selectedMic);
        const currentSpeakerExists = selectedSpeaker && availableSpeakers.find(spk => spk.deviceId === selectedSpeaker);

        // Handle camera device changes
        if (selectedCamera && !currentCameraExists && availableCameras.length > 0) {
          // Current camera was unplugged, switch to first available
          const newCamera = availableCameras[0];
          setSelectedCamera(newCamera.deviceId);
          saveDevicePreference('camera', newCamera.deviceId);
          await switchCamera(newCamera.deviceId);
          setDeviceNotification(`Camera switched to: ${newCamera.label || 'Default Camera'}`);
          setTimeout(() => setDeviceNotification(null), 3000);
        } else if (availableCameras.length === 0 && isCameraOn) {
          // No cameras available, mute camera
          setIsCameraOn(false);
          if (videoTrack) {
            videoTrack.enabled = false;
          }
          setDeviceNotification('Camera disconnected - video muted');
          setTimeout(() => setDeviceNotification(null), 3000);
        }

        // Handle microphone device changes
        if (selectedMic && !currentMicExists && availableMics.length > 0) {
          // Current mic was unplugged, switch to first available
          const newMic = availableMics[0];
          setSelectedMic(newMic.deviceId);
          saveDevicePreference('mic', newMic.deviceId);
          await switchMic(newMic.deviceId);
          setDeviceNotification(`Microphone switched to: ${newMic.label || 'Default Microphone'}`);
          setTimeout(() => setDeviceNotification(null), 3000);
        } else if (availableMics.length === 0 && (isMicOn || isLoopbackActive)) {
          // No mics available, mute microphone and stop loopback
          setIsMicOn(false);
          if (audioTrack) {
            audioTrack.enabled = false;
          }
          // Remember loopback state before stopping it
          if (isLoopbackActive) {
            setWasLoopbackActiveBeforeDisconnect(true);
            loopbackAudioRef.current.pause();
            loopbackAudioRef.current.srcObject = null;
            setIsLoopbackActive(false);
          }
          setDeviceNotification('Microphone disconnected - audio muted');
          setTimeout(() => setDeviceNotification(null), 3000);
        } else if (availableMics.length > 0 && wasLoopbackActiveBeforeDisconnect && !isLoopbackActive) {
          // Microphones became available again and loopback was previously active
          if (audioTrack) {
            const loopback = new MediaStream([audioTrack]);
            loopbackAudioRef.current.srcObject = loopback;
            loopbackAudioRef.current.play();
            setIsLoopbackActive(true);
            setWasLoopbackActiveBeforeDisconnect(false);
            setDeviceNotification('Microphone reconnected - loopback resumed');
            setTimeout(() => setDeviceNotification(null), 3000);
          }
        }

        // Handle speaker device changes
        if (selectedSpeaker && !currentSpeakerExists && availableSpeakers.length > 0) {
          // Current speaker was unplugged, switch to first available
          const newSpeaker = availableSpeakers[0];
          setSelectedSpeaker(newSpeaker.deviceId);
          saveDevicePreference('speaker', newSpeaker.deviceId);
          await switchSpeaker(newSpeaker.deviceId);
          setDeviceNotification(`Speaker switched to: ${newSpeaker.label || 'Default Speaker'}`);
          setTimeout(() => setDeviceNotification(null), 3000);
        } else if (availableSpeakers.length === 0) {
          // No speakers available, mute speaker
          setIsSpeakerMuted(true);
          setDeviceNotification('Speaker disconnected - audio muted');
          setTimeout(() => setDeviceNotification(null), 3000);
        }

      } catch (error) {
        console.error('Error handling device change:', error);
      }
    };

    // Listen for device changes
    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);

    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange);
    };
  }, []); // Empty dependency array to avoid re-registering the listener

  useEffect(() => {
    if (!audioTrack || !isMicOn) {
      setAudioLevel(0);
      return;
    }

    let animationId;
    let audioContext;

    try {
      audioContext = new AudioContext();

      // Create a stream with only the audio track for analysis
      const audioStream = new MediaStream([audioTrack]);
      const src = audioContext.createMediaStreamSource(audioStream);
      const analyser = audioContext.createAnalyser();

      // Configure analyser for better sensitivity
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.3;
      analyser.minDecibels = -90;
      analyser.maxDecibels = -10;

      src.connect(analyser);
      const timeDataArray = new Uint8Array(analyser.fftSize);

      const detect = () => {
        if (audioContext.state === 'closed') return;

        // Use time domain data for more accurate real-time audio level detection
        analyser.getByteTimeDomainData(timeDataArray);

        // Calculate RMS from time domain data
        let sum = 0;
        for (let i = 0; i < timeDataArray.length; i++) {
          const sample = (timeDataArray[i] - 128) / 128; // Convert to -1 to 1 range
          sum += sample * sample;
        }
        const rms = Math.sqrt(sum / timeDataArray.length);

        // Scale to 0-100 range with better sensitivity
        const scaledLevel = Math.min(100, rms * 200);

        // Debug logging (remove in production)
        if (scaledLevel > 1) {
          console.log(`Audio level: ${scaledLevel.toFixed(1)}%, RMS: ${rms.toFixed(3)}`);
        }

        setAudioLevel(scaledLevel);
        animationId = requestAnimationFrame(detect);
      };

      detect();
    } catch (error) {
      console.error('Error setting up audio level detection:', error);
      setAudioLevel(0);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close();
      }
    };
  }, [audioTrack, isMicOn]); // Depend on audioTrack and isMicOn

  // Cleanup loopback only when component unmounts (leaving page)
  useEffect(() => {
    return () => {
      if (isLoopbackActive && loopbackAudioRef.current) {
        loopbackAudioRef.current.pause();
        loopbackAudioRef.current.srcObject = null;
      }
    };
  }, []); // Empty dependency array - only runs on unmount

  const toggleMic = () => {
    if (!audioTrack || mics.length === 0) return;
    const newState = !isMicOn;
    audioTrack.enabled = newState;
    setIsMicOn(newState);
    console.log(`Microphone ${newState ? 'enabled' : 'disabled'}, camera state unchanged:`, isCameraOn);
  };

  const toggleCamera = () => {
    if (!videoTrack || cameras.length === 0) return;
    const newState = !isCameraOn;
    videoTrack.enabled = newState;
    setIsCameraOn(newState);
    console.log(`Camera ${newState ? 'enabled' : 'disabled'}, microphone state unchanged:`, isMicOn);
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

        // Get new audio stream with selected microphone (no processing)
        const audioConstraints = {
          deviceId: { exact: deviceId },
          // Disable all audio processing to get raw microphone input
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          googEchoCancellation: false,
          googAutoGainControl: false,
          googNoiseSuppression: false,
          googHighpassFilter: false,
          googTypingNoiseDetection: false,
          googAudioMirroring: false
        };
        console.log('Switching mic with constraints (no processing):', audioConstraints);
        const newAudioStream = await navigator.mediaDevices.getUserMedia({
          audio: audioConstraints
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

        // If loopback was active, restart it with new microphone
        if (isLoopbackActive) {
          const loopback = new MediaStream([newAudioTrack]);
          loopbackAudioRef.current.srcObject = loopback;
          loopbackAudioRef.current.play();
        }
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

  const toggleMicLoopback = () => {
    if (!audioTrack) return;

    if (isLoopbackActive) {
      // Turn off loopback
      console.log('Stopping microphone loopback');
      loopbackAudioRef.current.pause();
      loopbackAudioRef.current.srcObject = null;
      setIsLoopbackActive(false);
    } else {
      // Turn on loopback
      console.log('Starting microphone loopback with raw audio track');
      const loopback = new MediaStream([audioTrack]);
      loopbackAudioRef.current.srcObject = loopback;
      loopbackAudioRef.current.play();
      setIsLoopbackActive(true);
      console.log('Loopback audio element playing:', !loopbackAudioRef.current.paused);
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

        {/* Device Change Notification */}
        {deviceNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg border border-purple-500"
          >
            {deviceNotification}
          </motion.div>
        )}

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
              toggleMicLoopback={toggleMicLoopback}
              isLoopbackActive={isLoopbackActive}
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

        <audio
          ref={loopbackAudioRef}
          className="hidden"
          autoPlay
          playsInline
          controls={false}
        />
      </div>
    </TooltipProvider>
  );
};

export default MeetingPage;