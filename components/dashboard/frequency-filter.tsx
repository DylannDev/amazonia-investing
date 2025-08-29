import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

interface FrequencyFilterProps {
  selectedFrequency: string;
  onFrequencyChange: (value: string) => void;
}

export function FrequencyFilter({
  selectedFrequency,
  onFrequencyChange,
}: FrequencyFilterProps) {
  return (
    <div className="flex flex-col gap-2 items-start">
      <Label htmlFor="frequency-select" className="text-sm font-medium">
        Fréquence
      </Label>
      <Select value={selectedFrequency} onValueChange={onFrequencyChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Toutes les fréquences" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les fréquences</SelectItem>
          <SelectItem value="weekly">Hebdomadaire</SelectItem>
          <SelectItem value="monthly">Mensuelle</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
