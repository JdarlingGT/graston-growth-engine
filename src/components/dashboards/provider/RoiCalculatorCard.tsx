import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const RoiCalculatorCard = () => {
  const [leads, setLeads] = useState(10);
  const [conversionRate, setConversionRate] = useState(5); // in percentage
  const [avgDealValue, setAvgDealValue] = useState(500);

  const estimatedRevenue = (leads * (conversionRate / 100) * avgDealValue).toFixed(2);

  return (
    <Card>
      <CardHeader>
        <CardTitle>ROI Calculator</CardTitle>
        <CardDescription>Estimate your potential earnings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="leads">Monthly Leads</Label>
          <Input id="leads" type="number" value={leads} onChange={(e) => setLeads(Number(e.target.value))} />
        </div>
        <div>
          <Label htmlFor="conversionRate">Conversion Rate (%)</Label>
          <Input id="conversionRate" type="number" value={conversionRate} onChange={(e) => setConversionRate(Number(e.target.value))} />
        </div>
        <div>
          <Label htmlFor="avgDealValue">Average Deal Value ($)</Label>
          <Input id="avgDealValue" type="number" value={avgDealValue} onChange={(e) => setAvgDealValue(Number(e.target.value))} />
        </div>
        <div className="pt-2">
          <p className="text-sm text-muted-foreground">Estimated Monthly Revenue:</p>
          <p className="text-3xl font-bold text-primary">${estimatedRevenue}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoiCalculatorCard;