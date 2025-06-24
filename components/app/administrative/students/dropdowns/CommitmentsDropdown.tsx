import { OptionDropdown } from "@/components/common";
import { useCommitmentsByStudentQuery } from "@/store/api/app";
import React, { useEffect } from "react";
import { Text } from "react-native";

interface Props {
  upbCode: number;
  value: number | null;
  onChange: (item: { label: string; value: number }) => void;
  disabled?: boolean;
  error?: string;
}

const CommitmentsDropdown: React.FC<Props> = ({
  upbCode,
  value,
  onChange,
  disabled = false,
  error,
}) => {
  const { data: commitments = [], isLoading } = useCommitmentsByStudentQuery({
    upbCode,
  });

  const commitmentOptions = commitments.map((c) => ({
    label: `${c.scholarship} (${c.percentage * 100}%) -  ${c.hoursPerSemester} horas`,
    value: c.id,
  }));

  return (
    <>
      <OptionDropdown
        data={commitmentOptions}
        value={commitmentOptions.find((opt) => opt.value === value) ?? null}
        onChange={onChange}
        placeholder="Selecciona una beca"
        disabled={disabled || commitmentOptions.length === 0}
        isLoading={isLoading}
      />
      {error && (
        <Text className="text-red-500 font-outfit-regular mt-2">{error}</Text>
      )}
    </>
  );
};

export default CommitmentsDropdown;
