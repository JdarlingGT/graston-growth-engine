"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, XCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFilterStore } from "@/hooks/useFilterStore";
import { conditions, languages, clinicianTypes } from "@/lib/constants";
import { Condition, Language } from "@/types";

const FilterPanel: React.FC = () => {
  const {
    searchTerm,
    clinicianType,
    condition,
    language,
    tiers,
    acceptingNewPatients,
    setSearchTerm,
    setClinicianType,
    setCondition,
    setLanguage,
    setTiers,
    setAcceptingNewPatients,
    clearFilters, // Destructure the new clearFilters action
  } = useFilterStore();

  const handleTierChange = (tier: string, checked: boolean) => {
    setTiers(
      checked ? [...tiers, tier] : tiers.filter((t) => t !== tier)
    );
  };

  return (
    <div className="p-4 border-b lg:border-r bg-white shadow-sm space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by name, clinic, or location..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 text-muted-foreground hover:bg-transparent"
            onClick={() => setSearchTerm("")}
          >
            <XCircle className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Select
        value={clinicianType || ""}
        onValueChange={(value) => setClinicianType(value === "" ? null : value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Clinician Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Clinician Types</SelectItem>
          {clinicianTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={condition || ""}
        onValueChange={(value) => setCondition(value === "" ? null : (value as Condition))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Condition Treated" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Conditions</SelectItem>
          {conditions.map((cond) => (
            <SelectItem key={cond} value={cond}>
              {cond}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={language || ""}
        onValueChange={(value) => setLanguage(value === "" ? null : (value as Language))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Language Spoken" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Languages</SelectItem>
          {languages.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {lang}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="space-y-2">
        <p className="text-sm font-medium">Membership Tier</p>
        <div className="flex flex-col space-y-1">
          {["Premier", "Preferred", "Free"].map((tier) => (
            <div key={tier} className="flex items-center space-x-2">
              <Checkbox
                id={`tier-${tier}`}
                checked={tiers.includes(tier)}
                onCheckedChange={(checked) =>
                  handleTierChange(tier, checked as boolean)
                }
              />
              <Label htmlFor={`tier-${tier}`}>{tier}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="accepting-new-patients"
          checked={acceptingNewPatients}
          onCheckedChange={(checked) =>
            setAcceptingNewPatients(checked as boolean)
          }
        />
        <Label htmlFor="accepting-new-patients">Accepting New Patients</Label>
      </div>

      <Button variant="outline" className="w-full" onClick={clearFilters}>
        Clear All Filters
      </Button>
    </div>
  );
};

export default FilterPanel;