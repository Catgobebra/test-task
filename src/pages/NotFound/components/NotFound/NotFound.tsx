import * as React from 'react'
import Header from '../../../../components/Header/Header/Header';
import Error from '../../../../ui/Error';

function NotFound() {
  return (
    <>
    <Header />
    <Error errorMessage="Не найдено" ErrorText="Ошибка" />
    </>
  )
}

export default NotFound;