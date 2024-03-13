import { MainContent } from '@redux/model';
import { useMemo } from 'react';

export const useUniqueTags = (items: MainContent[]): string[] => {
    const uniqueTags = useMemo(() => {
        const allTags = items.flatMap(item => item.tags);
        return Array.from(new Set(allTags));
    }, [items]);

    return uniqueTags;
};
