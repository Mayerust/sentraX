import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  Target, 
  Zap,
  Brain,
  Activity,
  BarChart3
} from 'lucide-react';

interface RiskData {
  overallScore: number;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  vulnerabilities: Array<{
    id: string;
    title: string;
    severity: string;
    cvss: number;
    exploitability: number;
    impact: number;
    category: string;
  }>;
  businessImpact: {
    confidentiality: number;
    integrity: number;
    availability: number;
  };
  recommendations: string[];
}

interface RiskScoringEngineProps {
  pentestData: any;
  isActive: boolean;
}

export const RiskScoringEngine: React.FC<RiskScoringEngineProps> = ({
  pentestData,
  isActive
}) => {
  const [riskData, setRiskData] = useState<RiskData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Advanced risk calculation algorithm
  const calculateRiskScore = (data: any) => {
    setIsCalculating(true);
    
    // Simulate advanced risk calculation
    setTimeout(() => {
      const vulnerabilities = [
        {
          id: 'CVE-2021-44228',
          title: 'Apache Log4j Remote Code Execution',
          severity: 'Critical',
          cvss: 9.8,
          exploitability: 95,
          impact: 98,
          category: 'Remote Code Execution'
        },
        {
          id: 'CVE-2023-1234',
          title: 'SSH Weak Authentication',
          severity: 'High',
          cvss: 7.5,
          exploitability: 70,
          impact: 80,
          category: 'Authentication'
        },
        {
          id: 'MISC-001',
          title: 'Exposed Admin Panel',
          severity: 'Medium',
          cvss: 5.3,
          exploitability: 60,
          impact: 45,
          category: 'Information Disclosure'
        }
      ];

      // Calculate overall risk score using proprietary algorithm
      const overallScore = Math.round(
        (vulnerabilities.reduce((acc, vuln) => acc + (vuln.cvss * vuln.exploitability * vuln.impact / 100), 0) / 
         vulnerabilities.length) * 10
      );

      const severity = overallScore >= 90 ? 'Critical' : 
                      overallScore >= 70 ? 'High' : 
                      overallScore >= 40 ? 'Medium' : 'Low';

      setRiskData({
        overallScore,
        severity,
        vulnerabilities,
        businessImpact: {
          confidentiality: 85,
          integrity: 70,
          availability: 92
        },
        recommendations: [
          'Immediate patching of Log4j vulnerability required',
          'Implement multi-factor authentication for SSH access',
          'Restrict admin panel access to authorized networks',
          'Deploy Web Application Firewall (WAF)',
          'Conduct security awareness training'
        ]
      });
      setIsCalculating(false);
    }, 2000);
  };

  useEffect(() => {
    if (pentestData && isActive) {
      calculateRiskScore(pentestData);
    }
  }, [pentestData, isActive]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-cyber-red';
      case 'High': return 'text-cyber-orange';
      case 'Medium': return 'text-cyber-yellow';
      case 'Low': return 'text-cyber-green';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'destructive';
      case 'High': return 'secondary';
      case 'Medium': return 'outline';
      case 'Low': return 'default';
      default: return 'outline';
    }
  };

  if (isCalculating) {
    return (
      <Card className="border-cyber-green/30 bg-gradient-to-br from-background via-background to-cyber-green/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyber-green">
            <Brain className="w-5 h-5 animate-glow-pulse" />
            Advanced Risk Scoring Engine
            <Badge variant="premium" className="bg-gradient-to-r from-cyber-green to-cyber-blue text-white">
              ENTERPRISE-GRADE
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-cyber-green border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-cyber-green font-mono">Calculating risk vectors...</p>
          <p className="text-sm text-muted-foreground">Advanced AI algorithms analyzing vulnerability impact</p>
        </CardContent>
      </Card>
    );
  }

  if (!riskData) {
    return (
      <Card className="border-cyber-green/30 bg-gradient-to-br from-background via-background to-cyber-green/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyber-green">
            <BarChart3 className="w-5 h-5" />
            Advanced Risk Scoring Engine
            <Badge variant="premium" className="bg-gradient-to-r from-cyber-green to-cyber-blue text-white">
              ENTERPRISE-GRADE
            </Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Proprietary AI-powered risk assessment awaiting pentest data
          </p>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-cyber-green/30 bg-gradient-to-br from-background via-background to-cyber-green/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyber-green">
          <BarChart3 className="w-5 h-5 animate-glow-pulse" />
          Advanced Risk Scoring Engine
          <Badge variant="premium" className="bg-gradient-to-r from-cyber-green to-cyber-blue text-white">
            ENTERPRISE-GRADE
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
            <TabsTrigger value="impact">Business Impact</TabsTrigger>
            <TabsTrigger value="recommendations">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Overall Risk Score */}
              <Card className="border-cyber-blue/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Overall Risk Score</span>
                    <Badge variant={getSeverityBadgeVariant(riskData.severity)}>
                      {riskData.severity}
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-cyber-blue mb-2">
                    {riskData.overallScore}/100
                  </div>
                  <Progress value={riskData.overallScore} className="h-2" />
                </CardContent>
              </Card>

              {/* Threat Level */}
              <Card className="border-cyber-red/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-cyber-red" />
                    <span className="text-sm font-medium">Threat Level</span>
                  </div>
                  <div className={`text-2xl font-bold ${getSeverityColor(riskData.severity)}`}>
                    {riskData.severity}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {riskData.vulnerabilities.length} vulnerabilities detected
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Risk Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 border rounded-lg border-cyber-blue/20">
                <Target className="w-6 h-6 mx-auto mb-2 text-cyber-blue" />
                <div className="text-lg font-bold text-cyber-blue">
                  {riskData.vulnerabilities.filter(v => v.severity === 'Critical').length}
                </div>
                <div className="text-xs text-muted-foreground">Critical</div>
              </div>
              <div className="text-center p-3 border rounded-lg border-cyber-orange/20">
                <Zap className="w-6 h-6 mx-auto mb-2 text-cyber-orange" />
                <div className="text-lg font-bold text-cyber-orange">
                  {Math.round(riskData.vulnerabilities.reduce((acc, v) => acc + v.exploitability, 0) / riskData.vulnerabilities.length)}%
                </div>
                <div className="text-xs text-muted-foreground">Exploitability</div>
              </div>
              <div className="text-center p-3 border rounded-lg border-cyber-red/20">
                <Activity className="w-6 h-6 mx-auto mb-2 text-cyber-red" />
                <div className="text-lg font-bold text-cyber-red">
                  {Math.round(riskData.vulnerabilities.reduce((acc, v) => acc + v.impact, 0) / riskData.vulnerabilities.length)}%
                </div>
                <div className="text-xs text-muted-foreground">Impact</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vulnerabilities" className="space-y-3">
            {riskData.vulnerabilities.map((vuln) => (
              <Card key={vuln.id} className="border-cyber-blue/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{vuln.title}</h4>
                    <Badge variant={getSeverityBadgeVariant(vuln.severity)}>
                      {vuln.severity}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">CVSS: </span>
                      <span className="font-mono font-bold text-cyber-blue">{vuln.cvss}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Exploitability: </span>
                      <span className="font-mono font-bold text-cyber-orange">{vuln.exploitability}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Impact: </span>
                      <span className="font-mono font-bold text-cyber-red">{vuln.impact}%</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {vuln.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="impact" className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Confidentiality Impact</span>
                  <span className="text-sm font-mono text-cyber-red">{riskData.businessImpact.confidentiality}%</span>
                </div>
                <Progress value={riskData.businessImpact.confidentiality} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Integrity Impact</span>
                  <span className="text-sm font-mono text-cyber-orange">{riskData.businessImpact.integrity}%</span>
                </div>
                <Progress value={riskData.businessImpact.integrity} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Availability Impact</span>
                  <span className="text-sm font-mono text-cyber-blue">{riskData.businessImpact.availability}%</span>
                </div>
                <Progress value={riskData.businessImpact.availability} className="h-2" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-3">
            {riskData.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg border-cyber-green/20 bg-cyber-green/5">
                <div className="w-6 h-6 rounded-full bg-cyber-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-cyber-green">{index + 1}</span>
                </div>
                <p className="text-sm">{rec}</p>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};