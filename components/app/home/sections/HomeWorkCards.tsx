import { useSemester } from "@/context/home";
import { useWorkFilters } from "@/hooks/app";
import { useWorkTracksInfoQuery } from "@/store/api/app";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { TrackCard } from "../cards";

const HomeWorkCards = () => {
  const { workFilters } = useWorkFilters();
  const { semester } = useSemester();
  const { value: semester_id } = semester!!;

  const {
    isLoading,
    isFetching,
    data: workTracksInfo,
    isError,
    refetch,
  } = useWorkTracksInfoQuery({
    upbCode: workFilters.author,
    department_id: workFilters.department,
    semester_id,
  });

  useEffect(() => {
    refetch();
  }, [semester]);

  if (isLoading || isFetching)
    return (
      <TrackCard>
        <TrackCard.Group>
          <TrackCard.Card isLoading={isLoading || isFetching} />
          <TrackCard.Card isLoading={isLoading || isFetching} />
        </TrackCard.Group>
        <TrackCard.Card isLoading={isLoading || isFetching} />
      </TrackCard>
    );

  if (isError || !workTracksInfo) return <Text>Error</Text>;

  if (!semester) {
    return <></>;
  }

  return (
    <TrackCard>
      <TrackCard.Group>
        <TrackCard.Card>
          <TrackCard.Value>{workTracksInfo.open} Tbjos</TrackCard.Value>
          <TrackCard.Label>Abiertos</TrackCard.Label>
        </TrackCard.Card>

        <TrackCard.Card>
          <TrackCard.Value>{workTracksInfo.closed} Tbjos</TrackCard.Value>
          <TrackCard.Label>Cerrados</TrackCard.Label>
        </TrackCard.Card>
      </TrackCard.Group>

      <TrackCard.Card>
        <TrackCard.Value>{workTracksInfo.total} Tbjos</TrackCard.Value>
        <TrackCard.Label>Total</TrackCard.Label>
      </TrackCard.Card>
    </TrackCard>
  );
};

export default HomeWorkCards;
