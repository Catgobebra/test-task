import { useEffect } from 'react';
import { arraysEqual } from '../helpers/equalArray';
import type { FiltersState } from '../../../types/employee';

interface UseSyncAppliedFiltersProps {
  currentName: string | undefined;
  currentGender: string[];
  currentPosition: string[];
  currentStack: string[];
  appliedFilters: FiltersState;
  setAppliedFilters: (filters: FiltersState) => void;
}

export const useSyncAppliedFilters = ({
  currentName,
  currentGender,
  currentPosition,
  currentStack,
  appliedFilters,
  setAppliedFilters,
}: UseSyncAppliedFiltersProps) => {
  useEffect(() => {
    const draft = {
      name: currentName,
      gender: currentGender,
      position: currentPosition,
      stack: currentStack,
    };

    if (
      draft.name !== appliedFilters.name ||
      !arraysEqual(draft.gender, appliedFilters.gender) ||
      !arraysEqual(draft.position, appliedFilters.position) ||
      !arraysEqual(draft.stack, appliedFilters.stack)
    ) {
      setAppliedFilters(draft);
    }
  }, [
    appliedFilters.gender,
    appliedFilters.name,
    appliedFilters.position,
    appliedFilters.stack,
    currentGender,
    currentName,
    currentPosition,
    currentStack,
    setAppliedFilters,
  ]);
};