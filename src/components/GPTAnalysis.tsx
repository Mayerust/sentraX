import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Sparkles, MessageSquare } from 'lucide-react';

interface GPTAnalysisProps {
  analysis: string;
}

export const GPTAnalysis: React.FC<GPTAnalysisProps> = ({ analysis }) => {
  return (
    <Card className="border-cyber-blue/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyber-blue/20 text-cyber-blue">
            <Brain className="w-5 h-5" />
          </div>
          GPT-4 Analysis Engine
          <Badge variant="outline" className="ml-auto bg-cyber-blue/10 text-cyber-blue border-cyber-blue/50">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {analysis ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-cyber-blue">
              <MessageSquare className="w-4 h-4" />
              Live Analysis
            </div>
            <div className="bg-muted/50 rounded-lg p-4 border border-cyber-blue/20">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-cyber-blue animate-glow-pulse mt-2" />
                <div className="space-y-2 flex-1">
                  <p className="text-sm font-medium text-cyber-blue">GPT-4 Recommendation</p>
                  <p className="text-sm leading-relaxed">{analysis}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-cyber-blue/10 flex items-center justify-center mx-auto">
              <Brain className="w-6 h-6 text-cyber-blue animate-glow-pulse" />
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground">Waiting for data to analyze...</p>
              <p className="text-sm text-muted-foreground">
                GPT-4 will provide intelligent insights during each pentest phase
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="text-center space-y-2">
            <div className="text-lg font-semibold text-cyber-blue">Real-time</div>
            <div className="text-sm text-muted-foreground">Analysis</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-lg font-semibold text-cyber-green">Contextual</div>
            <div className="text-sm text-muted-foreground">Recommendations</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-lg font-semibold text-cyber-purple">Advanced</div>
            <div className="text-sm text-muted-foreground">Reasoning</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};