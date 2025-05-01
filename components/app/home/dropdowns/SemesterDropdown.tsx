import { OptionDropdown } from "@/components/common";
import { useState } from "react";

type SemesterItem = { label: string, value: number }

const SemesterDropdown = () => {
  const [semester, setSemester] = useState<SemesterItem | null>(null);

  const handleChange = (item: SemesterItem) => {
    setSemester(item);
  };

  const semesters = [
    { label: 'Semestre I-2025', value: 3 },
    { label: 'Semestre II-2024', value: 2 },
    { label: 'Semestre I-2024', value: 1 },
    { label: 'Semestre II-2023', value: 5 },
    { label: 'Semestre I-2023', value: 6 },
  ];

  return (
    <OptionDropdown
      data={semesters}
      placeholder="Semestre"
      onChange={handleChange}
      value={semester} />
  );
}

export default SemesterDropdown;