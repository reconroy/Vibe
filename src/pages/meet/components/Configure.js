
const Configure = ({
  motion,
  Button,
  isCameraOn,
  toggleCamera,
  isMicOn,
  toggleMic,
  isSpeakerMuted,
  setIsSpeakerMuted,
  audioLevel,
  videoRef,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Camera,
  CameraOff,
  Mic,
  MicOff,
  Speaker,
  Settings,
  Select,
  SelectItem,
  switchCamera,
  switchMic,
  switchSpeaker,
  cameras,
  mics,
  speakers,
  selectedCamera,
  selectedMic,
  selectedSpeaker,
  toggleMicLoopback,
  isLoopbackActive,
}) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Video Preview */}
      <motion.div
        className="relative aspect-video bg-gradient-to-br from-purple-700/40 via-purple-800/30 to-purple-900/20 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {isCameraOn && cameras.length > 0 ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted={true}
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-white/60">
              <CameraOff className="w-16 h-16 mb-4" />
              <p className="text-lg">
                {cameras.length === 0 ? "No camera available" : "Camera is off"}
              </p>
              {cameras.length === 0 && (
                <p className="text-sm text-white/40 mt-2">
                  Please connect a camera to enable video
                </p>
              )}
            </div>
          )}
        </div>

        {/* Loopback Active Indicator */}
        {isLoopbackActive && (
          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>Mic Test Active</span>
          </div>
        )}

        {/* Control Buttons */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <motion.div
            className="flex items-center space-x-4 bg-black/20 backdrop-blur-md px-3 py-2 rounded-full border border-white/10"
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {/* Mic Toggle */}
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant={isMicOn && mics.length > 0 ? "default" : "destructive"}
                  size="icon"
                  className={`rounded-full w-9 h-9 relative ${
                    audioLevel > 20 && isMicOn ? "ring-2 ring-green-500" : ""
                  } ${mics.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={mics.length > 0 ? toggleMic : undefined}
                  disabled={mics.length === 0}
                >
                  {isMicOn && mics.length > 0 ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {mics.length === 0
                    ? "No microphone available"
                    : isMicOn
                    ? "Mute microphone"
                    : "Unmute microphone"
                  }
                </p>
              </TooltipContent>
            </Tooltip>

            {/* Camera Toggle */}
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant={isCameraOn && cameras.length > 0 ? "default" : "destructive"}
                  size="icon"
                  className={`rounded-full w-9 h-9 ${cameras.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={cameras.length > 0 ? toggleCamera : undefined}
                  disabled={cameras.length === 0}
                >
                  {isCameraOn && cameras.length > 0 ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {cameras.length === 0
                    ? "No camera available"
                    : isCameraOn
                    ? "Turn off camera"
                    : "Turn on camera"
                  }
                </p>
              </TooltipContent>
            </Tooltip>

            {/* Speaker Toggle */}
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant={isSpeakerMuted || speakers.length === 0 ? "destructive" : "default"}
                  size="icon"
                  className={`rounded-full w-9 h-9 ${speakers.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={speakers.length > 0 ? () => setIsSpeakerMuted((prev) => !prev) : undefined}
                  disabled={speakers.length === 0}
                >
                  <Speaker className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {speakers.length === 0
                    ? "No speakers available"
                    : isSpeakerMuted
                    ? "Unmute speaker"
                    : "Mute speaker"
                  }
                </p>
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
          {/* Camera Dropdown */}
          <div className="space-y-2">
            <label className="text-sm text-white/80 flex items-center space-x-2">
              <Camera className="w-4 h-4" />
              <span>Camera</span>
            </label>
            {cameras.length > 0 ? (
              <Select defaultValue={
                cameras.find(cam => cam.deviceId === selectedCamera)?.label ||
                cameras[0]?.label ||
                "Default Camera"
              }>
                {cameras.map((cam) => (
                  <SelectItem
                    key={cam.deviceId}
                    value={cam.deviceId}
                    onClick={(val) => switchCamera(val)}
                  >
                    {cam.label || `Camera ${cam.deviceId.slice(0, 8)}`}
                  </SelectItem>
                ))}
              </Select>
            ) : (
              <div className="w-full px-3 py-2 text-left bg-white/5 border border-white/20 rounded-md text-white/60">
                No cameras available
              </div>
            )}
          </div>

          {/* Microphone Dropdown */}
          <div className="space-y-2">
            <label className="text-sm text-white/80 flex items-center space-x-2">
              <Mic className="w-4 h-4" />
              <span>Microphone</span>
            </label>
            {mics.length > 0 ? (
              <Select defaultValue={
                mics.find(mic => mic.deviceId === selectedMic)?.label ||
                mics[0]?.label ||
                "Default Microphone"
              }>
                {mics.map((mic) => (
                  <SelectItem
                    key={mic.deviceId}
                    value={mic.deviceId}
                    onClick={(val) => switchMic(val)}
                  >
                    {mic.label || `Microphone ${mic.deviceId.slice(0, 8)}`}
                  </SelectItem>
                ))}
              </Select>
            ) : (
              <div className="w-full px-3 py-2 text-left bg-white/5 border border-white/20 rounded-md text-white/60">
                No microphones available
              </div>
            )}
          </div>

          {/* Speaker Dropdown */}
          <div className="space-y-2">
            <label className="text-sm text-white/80 flex items-center space-x-2">
              <Speaker className="w-4 h-4" />
              <span>Speakers</span>
            </label>
            {speakers.length > 0 ? (
              <Select defaultValue={
                speakers.find(spk => spk.deviceId === selectedSpeaker)?.label ||
                speakers[0]?.label ||
                "Default Speakers"
              }>
                {speakers.map((spk) => (
                  <SelectItem
                    key={spk.deviceId}
                    value={spk.deviceId}
                    onClick={(val) => switchSpeaker(val)}
                  >
                    {spk.label || `Speaker ${spk.deviceId.slice(0, 8)}`}
                  </SelectItem>
                ))}
              </Select>
            ) : (
              <div className="w-full px-3 py-2 text-left bg-white/5 border border-white/20 rounded-md text-white/60">
                No speakers available
              </div>
            )}
          </div>
        </div>

        {/* Loopback Test Button */}
        <div className="pt-4">
          <Button
            onClick={mics.length > 0 ? toggleMicLoopback : undefined}
            disabled={mics.length === 0}
            className={`w-full text-white border border-white/20 ${
              mics.length === 0
                ? "opacity-50 cursor-not-allowed bg-white/10"
                : isLoopbackActive
                ? "bg-red-600 hover:bg-red-700"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {mics.length === 0
              ? "🔇 No Microphone Available"
              : isLoopbackActive
              ? "🔇 Stop Microphone Test"
              : "🔊 Test Microphone Loopback"
            }
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Configure;
