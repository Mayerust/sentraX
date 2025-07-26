import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Play, Target, AlertTriangle } from 'lucide-react';

interface TargetInputProps {
  onStartPentest: (targets: string[]) => void;
  isScanning: boolean;
}

export const TargetInput: React.FC<TargetInputProps> = ({ 
  onStartPentest, 
  isScanning 
}) => {
  const [targetInput, setTargetInput] = useState('');
  const [validationError, setValidationError] = useState('');

  const validateIP = (ip: string): boolean => {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipRegex.test(ip.trim());
  };

  const handleStart = () => {
    const targets = targetInput
      .split(/[,\n]/)
      .map(ip => ip.trim())
      .filter(ip => ip.length > 0);

    if (targets.length === 0) {
      setValidationError('Please enter at least one target IP');
      return;
    }

    const invalidIPs = targets.filter(ip => !validateIP(ip));
    if (invalidIPs.length > 0) {
      setValidationError(`Invalid IP format: ${invalidIPs.join(', ')}`);
      return;
    }

    setValidationError('');
    onStartPentest(targets);
  };

  const handleInputChange = (value: string) => {
    setTargetInput(value);
    setValidationError('');
  };

  const exampleTargets = [
    '192.0.2.1',
    '198.51.100.1', 
    '203.0.113.1'
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="targets" className="flex items-center gap-2">
          <Target className="w-4 h-4" />
          Target IPs
        </Label>
        <Textarea
          id="targets"
          placeholder="Enter IP addresses (one per line or comma-separated)&#10;Example: 192.0.2.1, 198.51.100.1"
          value={targetInput}
          onChange={(e) => handleInputChange(e.target.value)}
          disabled={isScanning}
          className="min-h-20 font-mono text-sm"
        />
        
        {validationError && (
          <div className="flex items-center gap-2 text-sm text-destructive">
            <AlertTriangle className="w-4 h-4" />
            {validationError}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Quick Examples:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {exampleTargets.map((ip, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer hover:bg-cyber-green/10 hover:border-cyber-green/50"
              onClick={() => {
                if (!isScanning) {
                  const current = targetInput.trim();
                  const newValue = current ? `${current}, ${ip}` : ip;
                  setTargetInput(newValue);
                }
              }}
            >
              {ip}
            </Badge>
          ))}
        </div>
      </div>

      <Button
        variant="cyber"
        size="lg"
        onClick={handleStart}
        disabled={isScanning || !targetInput.trim()}
        className="w-full"
      >
        <Play className="w-4 h-4 mr-2" />
        {isScanning ? 'Scanning in Progress...' : 'Start Pentest'}
      </Button>

      <div className="text-xs text-muted-foreground space-y-1">
        <p>⚠️ Only test systems you own or have explicit permission to test.</p>
        <p>🔒 This is a demonstration tool for educational purposes.</p>
      </div>
    </div>
  );
};