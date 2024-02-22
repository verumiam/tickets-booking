import { useEffect, useState } from 'react';
import { setTransplants } from '../../entities/ticketList/model/slices/filterSlices';
import { getUrlParams } from '../helpers/getUrlParams';
import { useAppDispatch, useAppSelector } from './hooks';

function useTransplantsFilter() {
  const filterStore = useAppSelector((state) => state.filters.transplants);
  const [selected, setSelected] = useState<number[]>(filterStore);
  const dispatch = useAppDispatch();

  const updateURLParams = (selection: number[]) => {
    const URLparams = getUrlParams();
    URLparams.set('transplants', selection.join('&'));
    window.history.pushState(null, '', `?${URLparams.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const intValue = parseInt(value);

    const newSelection = checked
      ? [...selected, intValue]
      : selected.filter((item) => item !== intValue);

    setSelected(newSelection);
    updateURLParams(newSelection);
    dispatch(setTransplants(newSelection));
  };

  useEffect(() => {
    const handleChangeTransplants = () => {
      const URLparams = getUrlParams();
      const newTransplantsValue = URLparams.get('transplants');

      if (!newTransplantsValue) {
        dispatch(setTransplants([-1]));
        updateURLParams([-1]);
      } else {
        const transplantsArray = newTransplantsValue.split('&').map(Number);
        dispatch(setTransplants(transplantsArray));
        setSelected(transplantsArray);
      }
    };

    handleChangeTransplants();

    window.addEventListener('popstate', handleChangeTransplants);

    return () => {
      window.removeEventListener('popstate', handleChangeTransplants);
    };
  }, [dispatch]);

  return { selected, handleChange };
}

export default useTransplantsFilter;
