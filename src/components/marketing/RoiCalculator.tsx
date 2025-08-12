import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, TrendingUp, DollarSign } from "lucide-react";

const RoiCalculator = () => {
  const [monthlySpend, setMonthlySpend] = useState<number>(0);
  const [newPatients, setNewPatients] = useState<number>(0);
  const [avgPatientValue, setAvgPatientValue] = useState<number>(0);
  const [results, setResults] = useState({
    monthlyRevenue: 0,
    roi: 0,
    breakEvenPatients: 0,
    profitMargin: 0
  });

  useEffect(() => {
    const monthlyRevenue = newPatients * avgPatientValue;
    const roi = monthlySpend > 0 ? ((monthlyRevenue - monthlySpend) / monthlySpend) * 100 : 0;
    const breakEvenPatients = avgPatientValue > 0 ? Math.ceil(monthlySpend / avgPatientValue) : 0;
    const profitMargin = monthlyRevenue > 0 ? ((monthlyRevenue - monthlySpend) / monthlyRevenue) * 100 : 0;

    setResults({ monthlyRevenue, roi, breakEvenPatients, profitMargin });
  }, [monthlySpend, newPatients, avgPatientValue]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(1)}%`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-green-500" />
          ROI Calculator
        </CardTitle>
        <CardDescription>Calculate the return on investment for your marketing campaigns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Input Parameters</h3>
            
            <div className="space-y-2">
              <Label htmlFor="monthly-spend">Monthly Marketing Spend</Label>
              <Input
                id="monthly-spend"
                type="number"
                value={monthlySpend || ""}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                placeholder="Enter amount"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-patients">New Patients per Month</Label>
              <Input
                id="new-patients"
                type="number"
                value={newPatients || ""}
                onChange={(e) => setNewPatients(Number(e.target.value))}
                placeholder="Enter number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="avg-patient-value">Average Patient Value</Label>
              <Input
                id="avg-patient-value"
                type="number"
                value={avgPatientValue || ""}
                onChange={(e) => setAvgPatientValue(Number(e.target.value))}
                placeholder="Enter amount"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Results</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Monthly Revenue</span>
                </div>
                <p className="text-2xl font-bold text-green-900">
                  {formatCurrency(results.monthlyRevenue)}
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">ROI</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">
                  {formatPercentage(results.roi)}
                </p>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2 mb-1">
                  <Calculator className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">Break-even Patients</span>
                </div>
                <p className="text-2xl font-bold text-orange-900">
                  {results.breakEvenPatients}
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">Profit Margin</span>
                </div>
                <p className="text-2xl font-bold text-purple-900">
                  {formatPercentage(results.profitMargin)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Recommendations</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            {results.roi > 200 && <p className="text-green-600">✓ Excellent ROI! Consider increasing your marketing budget.</p>}
            {results.roi > 100 && results.roi <= 200 && <p className="text-blue-600">✓ Good ROI. Your campaigns are profitable.</p>}
            {results.roi > 0 && results.roi <= 100 && <p className="text-orange-600">⚠ Moderate ROI. Look for optimization opportunities.</p>}
            {results.roi <= 0 && <p className="text-red-600">⚠ Negative ROI. Review and optimize your campaigns.</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoiCalculator;