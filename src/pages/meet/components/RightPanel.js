import React from 'react'
import { useRouter } from 'next/router'

const RightPanel = ({ motion, meetingId, hostName, participants, copyMeetingId, Button, Copy, Users }) => {
    const router = useRouter();
    return (
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
                <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-6 rounded-xl shadow-xl"
                    onClick={() => router.push(`/room/${meetingId}`)}
                >
                    Join Now
                </Button>
            </motion.div>
        </div>
    )
}

export default RightPanel