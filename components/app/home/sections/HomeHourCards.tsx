import { useSemester } from '@/context/home';
import { formatHourNumbers } from '@/helpers/common';
import { useSession } from '@/hooks';
import { useTracksInfoQuery } from '@/store/api/home';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { TrackCard } from '../cards';

const HomeHourCards = () => {

    const { user } = useSession();
    const { upbCode } = user!!;

    const { inscription } = useSemester();
    const { semester_id } = inscription!!;

    const { isLoading, isFetching, data: tracksInfo, isError, refetch } = useTracksInfoQuery({ upbCode, semester_id });

    useEffect(() => {
        refetch();
    }, [inscription]);

    if (isLoading || isFetching) return <TrackCard>
        <TrackCard.Group>
            <TrackCard.Card isLoading={isLoading || isFetching} />
            <TrackCard.Card isLoading={isLoading || isFetching} />
        </TrackCard.Group>
        <TrackCard.Card isLoading={isLoading || isFetching} />
    </TrackCard>

    if (isError || !tracksInfo) return <Text>Error</Text>;

    return (
        <TrackCard>
            <TrackCard.Group>
                <TrackCard.Card>
                    <TrackCard.Value>{formatHourNumbers(tracksInfo.completed)} hrs</TrackCard.Value>
                    <TrackCard.Label>Completo</TrackCard.Label>
                </TrackCard.Card>

                <TrackCard.Card>
                    <TrackCard.Value>{formatHourNumbers(tracksInfo.remaining)} hrs</TrackCard.Value>
                    <TrackCard.Label>Faltante</TrackCard.Label>
                </TrackCard.Card>
            </TrackCard.Group>

            <TrackCard.Card>
                <TrackCard.Value>{formatHourNumbers(tracksInfo.total)} hrs</TrackCard.Value>
                <TrackCard.Label>Total</TrackCard.Label>
            </TrackCard.Card>
        </TrackCard>
    )
}

export default HomeHourCards