import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import filterStore from '../modules/Select/stores/filter-store';
import {SearchStore} from '../modules/Search';
import { POSITION, GENDER, STACK } from '../pages/EmployeeListPage/constant/constants';

export function useSyncFiltersWithUrl() {
  const [searchParams, setSearchParams] = useSearchParams();

  function arraysEqual(a: string[], b: string[]) {
    if (a.length !== b.length) return false;
    return a.every((val, i) => val === b[i]);
  }

  useEffect(() => {
    const name = searchParams.get('name') || '';
    if (!searchParams.has('name')) {
    SearchStore.clear();
    } else if (SearchStore.search !== name) {
        SearchStore.setSearch(name);
    }
    const gender = searchParams.getAll('gender');
    const position = searchParams.getAll('position');
    const stack = searchParams.getAll('stack');

    if (SearchStore.search !== name) {
      SearchStore.setSearch(name);
    }

    const currentGender = filterStore.getFilterValues('gender');
    const currentPosition = filterStore.getFilterValues('position');
    const currentStack = filterStore.getFilterValues('stack');

    if (
      !arraysEqual(currentGender, gender) ||
      !arraysEqual(currentPosition, position) ||
      !arraysEqual(currentStack, stack)
    ) {

      filterStore.positions = [];
      filterStore.genders = [];
      filterStore.stack = [];

      POSITION.forEach(opt => {
        if (position.includes(opt.value)) filterStore.togglePosition(opt);
      });

      GENDER.forEach(opt => {
        if (gender.includes(opt.value)) filterStore.toggleGender(opt);
      });

      STACK.forEach(opt => {
        if (stack.includes(opt.value)) filterStore.toggleStack(opt);
      });
    }
  }, [searchParams]);

  useEffect(() => {
    const currentParams = new URLSearchParams();

    if (SearchStore.debouncedQuery.trim()) {
      currentParams.set('name', SearchStore.debouncedQuery.trim());
    }

    filterStore.getFilterValues('position').forEach(val => currentParams.append('position', val));
    filterStore.getFilterValues('gender').forEach(val => currentParams.append('gender', val));
    filterStore.getFilterValues('stack').forEach(val => currentParams.append('stack', val));

    const currentUrlParams = searchParams.toString();
    const newParams = currentParams.toString();

    if (currentUrlParams !== newParams) {
      setSearchParams(currentParams, { replace: true });
    }
  }, [
    SearchStore.debouncedQuery,
    filterStore.positions.length,
    filterStore.genders.length,
    filterStore.stack.length,
  ]);
}