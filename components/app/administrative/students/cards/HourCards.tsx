import { TrackCard } from "@/components/app/home/cards";
import { formatHourNumbers } from "@/helpers/common";
import { useLazyTracksInfoQuery } from "@/store/api/app";
import React, { useEffect } from "react";
import { Text } from "react-native";

interface Props {
  upbCode: number;
  semester_id?: number;
  isLoadingInscription: boolean;
}

const HomeHourCards = ({ upbCode, semester_id, isLoadingInscription }: Props) => {
  const [
    triggerGetTracksInfo,
    { data: tracksInfo, isFetching, isLoading, isError },
  ] = useLazyTracksInfoQuery();

  useEffect(() => {
    if (semester_id && !isLoadingInscription) {
      triggerGetTracksInfo({ upbCode, semester_id });
    }
  }, [semester_id, isLoadingInscription]);

  if (isLoading || isFetching || isLoadingInscription)
    return (
      <TrackCard>
        <TrackCard.Group>
          <TrackCard.Card isLoading />
          <TrackCard.Card isLoading />
        </TrackCard.Group>
        <TrackCard.Card isLoading />
      </TrackCard>
    );

  if (isError || !tracksInfo) return <Text>Error</Text>;

  return (
    <>
      <TrackCard>
        <TrackCard.Group>
          <TrackCard.Card>
            <TrackCard.Value>
              {formatHourNumbers(tracksInfo.completed)} hrs
            </TrackCard.Value>
            <TrackCard.Label>Completo</TrackCard.Label>
          </TrackCard.Card>

          <TrackCard.Card>
            <TrackCard.Value>
              {formatHourNumbers(tracksInfo.remaining)} hrs
            </TrackCard.Value>
            <TrackCard.Label>Faltante</TrackCard.Label>
          </TrackCard.Card>
        </TrackCard.Group>

        <TrackCard.Card>
          <TrackCard.Value>
            {formatHourNumbers(tracksInfo.total)} hrs
          </TrackCard.Value>
          <TrackCard.Label>Total</TrackCard.Label>
        </TrackCard.Card>
      </TrackCard>

      {tracksInfo.completed >= tracksInfo.total && (
        <Text className="text-gray-500 font-outfit-regular text-base text-center mt-2">
          ¡Enhorabuena! El estudiante completó sus horas de trabajo becario
        </Text>
      )}
    </>
  );
};

export default HomeHourCards;
