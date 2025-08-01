import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Shield, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';

interface Vulnerability {
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  title: string;
  cve?: string;
  description: string;
  remediation: string;
}

interface ReportData {
  timestamp: string;
  targets: string[];
  phases: Array<{
    name: string;
    status: string;
    findings: string[];
  }>;
  vulnerabilities: Vulnerability[];
  summary: string;
}

interface ReportGeneratorProps {
  report: ReportData | null;
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Critical': return 'text-cyber-red border-cyber-red/50 bg-cyber-red/10';
    case 'High': return 'text-cyber-orange border-cyber-orange/50 bg-cyber-orange/10';
    case 'Medium': return 'text-cyber-blue border-cyber-blue/50 bg-cyber-blue/10';
    case 'Low': return 'text-cyber-green border-cyber-green/50 bg-cyber-green/10';
    default: return 'text-muted-foreground border-border bg-muted/10';
  }
};

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({ report }) => {
  const downloadReport = () => {
    if (!report) return;

    const reportText = `
SENTRAX PENETRATION TEST REPORT
=====================================

Generated: ${new Date(report.timestamp).toLocaleString()}
Targets: ${report.targets.join(', ')}

EXECUTIVE SUMMARY
-----------------
${report.summary}

VULNERABILITIES FOUND
---------------------
${report.vulnerabilities.map(vuln => `
• ${vuln.title} (${vuln.severity})
  CVE: ${vuln.cve || 'N/A'}
  Description: ${vuln.description}
  Remediation: ${vuln.remediation}
`).join('')}

PHASE RESULTS
-------------
${report.phases.map(phase => `
${phase.name}: ${phase.status}
Findings: ${phase.findings.length > 0 ? phase.findings.join(', ') : 'None'}
`).join('')}

Report generated by sentraX AI Pentest Framework
    `.trim();

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sentrax-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!report) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted text-muted-foreground">
              <FileText className="w-5 h-5" />
            </div>
            Penetration Test Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground">No report available</p>
              <p className="text-sm text-muted-foreground">
                Complete a penetration test to generate a comprehensive report
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <Card className="border-cyber-green/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyber-green/20 text-cyber-green">
                <Shield className="w-5 h-5" />
              </div>
              Penetration Test Report
              <Badge variant="outline" className="bg-cyber-green/10 text-cyber-green border-cyber-green/50">
                Complete
              </Badge>
            </CardTitle>
            <Button variant="cyber" onClick={downloadReport}>
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Generated</p>
                <p className="font-mono text-sm">{new Date(report.timestamp).toLocaleString()}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Targets</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {report.targets.map((target, index) => (
                  <Badge key={index} variant="outline" className="font-mono text-xs">
                    {target}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Executive Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed">{report.summary}</p>
        </CardContent>
      </Card>

      {/* Vulnerabilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-cyber-orange" />
            Vulnerabilities Found ({report.vulnerabilities.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {report.vulnerabilities.map((vuln, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={getSeverityColor(vuln.severity)}>
                  {vuln.severity}
                </Badge>
                <h4 className="font-semibold">{vuln.title}</h4>
                {vuln.cve && (
                  <Badge variant="outline" className="font-mono text-xs">
                    {vuln.cve}
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-muted-foreground mb-1">Description</p>
                  <p>{vuln.description}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground mb-1">Remediation</p>
                  <p>{vuln.remediation}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Phase Results */}
      <Card>
        <CardHeader>
          <CardTitle>Phase Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {report.phases.map((phase, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyber-green" />
                  <h4 className="font-medium">{phase.name}</h4>
                </div>
                <Badge variant="outline" className="text-cyber-green border-cyber-green/50">
                  {phase.status}
                </Badge>
                {phase.findings.length > 0 && (
                  <div className="text-sm">
                    <p className="text-muted-foreground">Findings:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {phase.findings.map((finding, fIndex) => (
                        <li key={fIndex} className="text-xs">{finding}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};