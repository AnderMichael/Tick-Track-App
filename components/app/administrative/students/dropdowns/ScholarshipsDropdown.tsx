import React, { useState } from "react";

import { SearchableDropdown } from "@/components/common";
import { useScholarships } from "@/hooks/app";

const ScholarshipDropdown = ({
  onSelect,
  value,
}: {
  value: number | null;
  onSelect: (item: { label: string; value: number }) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { scholarships, isLoading } = useScholarships({
    page: 1,
    limit: 20,
    search: searchTerm,
  });

  const mappedData = scholarships.map((s) => ({
    label: s.name,
    value: s.id,
  }));

  return (
    <SearchableDropdown
      data={mappedData}
      value={mappedData.find((item) => item.value === value) || null}
      onChange={onSelect}
      placeholder="Seleccionar beca"
      isLoading={isLoading}
      onSearchTextChange={(text) => setSearchTerm(text)}
    />
  );
};

export default ScholarshipDropdown;
