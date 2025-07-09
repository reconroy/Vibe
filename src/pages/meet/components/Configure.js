const Configure = ({ motion, Button, isCameraOn, toggleCamera, isMicOn, toggleMic, videoRef, Tooltip, TooltipTrigger, TooltipContent, Camera, CameraOff, MicOff, Mic, Speaker, Settings, Select, SelectItem }) => {

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
                    {isCameraOn ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="w-full h-full object-cover rounded-2xl"
                            />
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
                                    onClick={toggleMic}
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
                                    onClick={toggleCamera}
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
    )
}

export default Configure;