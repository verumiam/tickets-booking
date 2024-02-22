import { useEffect } from 'react';
import { setCurrency } from '../../entities/ticketList/model/slices/filterSlices';
import { useAppDispatch } from './hooks';
import { getUrlParams } from '../helpers/getUrlParams';

export const useCurrencyFilter = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handlePageChange = () => {
      const URLparams = getUrlParams();
      const newCurrencyValue = URLparams.get('currency')?.toUpperCase();

      if (newCurrencyValue && ['RUB', 'EUR', 'USD'].includes(newCurrencyValue)) {
        dispatch(setCurrency(newCurrencyValue));
      } else {
        dispatch(setCurrency('RUB'));
        changeCurrency('RUB');
      }
    };

    handlePageChange();

    window.addEventListener('popstate', handlePageChange);

    return () => {
      window.removeEventListener('popstate', handlePageChange);
    };
  }, [dispatch]);

  const changeCurrency = (currency: string) => {
    const URLparams = getUrlParams();
    URLparams.set('currency', currency);
    window.history.pushState(null, '', `?${URLparams.toString()}`);
    dispatch(setCurrency(currency));
  };

  return { changeCurrency };
};
