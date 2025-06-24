import { OptionDropdown } from "@/components/common";
import { usePercentages } from "@/hooks/app";
import React from "react";

interface Props {
  scholarshipId: number;
  value: number | null;
  onChange: (item: { label: string; value: number }) => void;
  disabled?: boolean;
}

const PercentageDropdown: React.FC<Props> = ({
  scholarshipId,
  value,
  onChange,
  disabled = false,
}) => {
  const { percentages, isLoading } = usePercentages(scholarshipId);

  const percentageOptions = percentages.map((p) => ({
    label: `${p.percentage * 100}% - ${p.hours_per_semester} horas`,
    value: p.id,
  }));

  return (
    <OptionDropdown
      data={percentageOptions}
      value={percentageOptions.find((opt) => opt.value === value) ?? null}
      onChange={onChange}
      placeholder="Selecciona un porcentaje"
      disabled={disabled || percentageOptions.length === 0}
      isLoading={isLoading}
    />
  );
};

export default PercentageDropdown;
