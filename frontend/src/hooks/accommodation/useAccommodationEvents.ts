import { useEffect, useState } from 'react';
import accommodationEventApi from '../../api/accommodationEventApi';
import type { AccommodationEvent, AccommodationEventDto } from '../../types/accommodation';
import { EventType, eventTypeMap } from '../../types/enums/eventType';

const useAccommodationEvents = () => {
    const [accommodationEvents, setAccommodationEvents] = useState<AccommodationEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const mapAccommodationEvent = (dto: AccommodationEventDto): AccommodationEvent => ({
        id: dto.accommodationId,
        name: dto.accommodationName,
        type: eventTypeMap[dto.eventType] ?? EventType.ACCOMMODATION_RENTED,
        createdAt: new Date(dto.createdAt),
    });

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const response = await accommodationEventApi.findAll();
                setAccommodationEvents(response.data.map(mapAccommodationEvent));
                console.log();
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An error has occured while loading accommodation events!'));
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    return { accommodationEvents, loading, error };
}

export default useAccommodationEvents;