import { useRouter } from 'next/router';
import React from 'react'

const Header = ({ motion, currentTime, formatDate, formatTime, Tooltip, Button, Settings, Calendar, Clock, TooltipTrigger, TooltipContent }) => {
    const router = useRouter();
    return (
        <>
            <motion.header
                className="relative z-10 px-6 py-2 border-b border-white/10"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <motion.div
                            className="text-2xl font-bold text-white"
                            whileHover={{ scale: 1.05 }}
                            onClick={() => router.push("/")}

                        >
                             <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-400 bg-clip-text text-transparent">Vibe</span>
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
        </>
    )
}

export default Header