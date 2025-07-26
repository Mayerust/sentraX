import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Brain, Sparkles, Target, Shield } from 'lucide-react';

interface UserPromptWorkflowProps {
  onPromptSubmit: (prompt: string, priority: string) => void;
  isActive: boolean;
}

export const UserPromptWorkflow: React.FC<UserPromptWorkflowProps> = ({
  onPromptSubmit,
  isActive
}) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'stealth' | 'aggressive' | 'comprehensive'>('comprehensive');

  const promptTemplates = [
    {
      id: 'web-focus',
      label: 'Web Application Focus',
      prompt: 'Focus heavily on web application vulnerabilities including OWASP Top 10, SQL injection, XSS, and authentication bypasses. Prioritize web service enumeration.',
      icon: Target
    },
    {
      id: 'stealth-mode',
      label: 'Stealth Operations',
      prompt: 'Execute all phases with maximum stealth. Use minimal scanning techniques, avoid detection, and prioritize low-noise exploitation methods.',
      icon: Shield
    },
    {
      id: 'comprehensive',
      label: 'Comprehensive Assessment',
      prompt: 'Perform thorough analysis across all attack vectors. Include network services, web applications, wireless, and social engineering reconnaissance.',
      icon: Brain
    }
  ];

  const handleSubmit = () => {
    if (customPrompt.trim()) {
      onPromptSubmit(customPrompt, selectedPriority);
      setCustomPrompt('');
    }
  };

  const handleTemplateSelect = (template: any) => {
    setCustomPrompt(template.prompt);
  };

  return (
    <Card className="border-cyber-blue/30 bg-gradient-to-br from-background via-background to-cyber-blue/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyber-blue">
          <Sparkles className="w-5 h-5 animate-glow-pulse" />
          AI-Driven Custom Workflow
          <Badge variant="premium" className="bg-gradient-cyber text-white">
            BEST-IN-CLASS
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Direct the AI with custom objectives for precision pentesting workflows
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Templates */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-cyber-green">Quick Templates:</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {promptTemplates.map((template) => {
              const IconComponent = template.icon;
              return (
                <Button
                  key={template.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleTemplateSelect(template)}
                  className="h-auto p-3 flex flex-col items-start gap-1 hover:border-cyber-blue/50 hover:bg-cyber-blue/5"
                  disabled={isActive}
                >
                  <div className="flex items-center gap-2 w-full">
                    <IconComponent className="w-4 h-4 text-cyber-blue" />
                    <span className="text-xs font-medium">{template.label}</span>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Custom Prompt Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-cyber-green">Custom AI Instructions:</label>
          <Textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="e.g., 'Focus on privilege escalation vulnerabilities and check for misconfigurations in cloud services...'"
            className="min-h-[100px] border-cyber-blue/30 focus:border-cyber-blue bg-background/50"
            disabled={isActive}
          />
        </div>

        {/* Priority Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-cyber-green">Execution Priority:</label>
          <div className="flex gap-2">
            {[
              { id: 'stealth', label: 'Stealth', color: 'cyber-purple' },
              { id: 'aggressive', label: 'Aggressive', color: 'cyber-red' },
              { id: 'comprehensive', label: 'Comprehensive', color: 'cyber-blue' }
            ].map((priority) => (
              <Button
                key={priority.id}
                variant={selectedPriority === priority.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPriority(priority.id as any)}
                disabled={isActive}
                className={`${selectedPriority === priority.id ? 'bg-gradient-cyber' : 'hover:border-cyber-blue/50'}`}
              >
                {priority.label}
              </Button>
            ))}
          </div>
        </div>

        <Button 
          onClick={handleSubmit}
          disabled={!customPrompt.trim() || isActive}
          className="w-full bg-gradient-cyber hover:from-cyber-blue hover:to-cyber-green transition-all duration-300"
        >
          <Brain className="w-4 h-4 mr-2" />
          Apply Custom Workflow
        </Button>
      </CardContent>
    </Card>
  );
};