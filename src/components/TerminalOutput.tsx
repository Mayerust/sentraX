import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

interface TerminalOutputProps {
  logs: string[];
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ logs }) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-background/95 border border-cyber-green/20 rounded-lg p-4 h-80 overflow-hidden">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-cyber-green/20">
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-full bg-cyber-red"></div>
          <div className="w-3 h-3 rounded-full bg-cyber-orange"></div>
          <div className="w-3 h-3 rounded-full bg-cyber-green"></div>
        </div>
        <span className="text-xs text-muted-foreground font-mono">
          sentraX Terminal v1.0
        </span>
      </div>
      
      <div 
        ref={terminalRef}
        className="h-full overflow-y-auto space-y-1 font-mono text-sm"
      >
        {logs.length === 0 ? (
          <div className="text-muted-foreground flex items-center gap-2">
            <span>root@sentrax:~$</span>
            <span className="animate-terminal-blink">_</span>
          </div>
        ) : (
          <>
            {logs.map((log, index) => (
              <div 
                key={index} 
                className="text-cyber-green leading-relaxed"
              >
                {log}
              </div>
            ))}
            <div className="text-cyber-green flex items-center gap-2">
              <span>root@sentrax:~$</span>
              <span className="animate-terminal-blink">_</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};