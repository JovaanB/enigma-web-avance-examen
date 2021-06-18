import React, {useEffect, useState} from 'react';
import md5 from 'md5';

import {Spinner, Button, Form} from 'react-bootstrap';
import {MainLayout} from '../components/layout/MainLayout';
import MyPagination from '../components/utils/MyPagination';
import {ModalFilter} from '../components/home/ModalFilter';
import {DataTable} from '../components/home/DataTable';

const PUBLIC_KEY = 'af66011d5c351e12011e319ac86663e3';
const PRIVATE_KEY = 'c6576fb32d9f53f8db5accc7f72fe0ff0d7bab6d';

export const Home = () => {
  const [data, setData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    picture: false,
    name: '',
    description: '',
    comics: undefined,
  });
  const [sorts, setSorts] = useState(false);

  const ts = Number(new Date());
  const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);
  const offset = currPage > 0 ? (currPage - 1) * limit : limit;

  const fetchData = () => {
    setIsLoading(true);
    fetch(
      `https://gateway.marvel.com/v1/public/characters?ts=${ts}&orderBy=name&limit=100&offset=0&apikey=${PUBLIC_KEY}&hash=${hash}`,
    )
      .then(response => response.json())
      .catch(e => {
        console.log(e);
        setErrorMessage('Une erreur est survenue.');
        setIsLoading(false);
      })
      .then(result => {
        setData(result.data.results);
        setDataFiltered(result.data.results);
        setDataToDisplay(result.data.results.splice(0, limit));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(e);
        setErrorMessage('Une erreur est survenue.');
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const sortDataByName = sorts
      ? dataFiltered.sort((a, b) => (a.name < b.name ? 1 : -1))
      : dataFiltered.sort((a, b) => (a.name > b.name ? 1 : -1));
    const toDisplay =
      sortDataByName.length > 0 && sortDataByName.slice(offset, offset + limit);
    setDataToDisplay(toDisplay);
  }, [currPage, dataFiltered, limit, offset, sorts]);

  const afterPageClicked = pageNumber => {
    setCurrPage(pageNumber.currentPage);
  };

  const resetFilters = () => {
    setDataFiltered(data);
  };

  const afterFilter = () => {
    const dataWithFilters = data
      .filter(el =>
        filters?.picture
          ? el.thumbnail.path !==
              'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' &&
            el.thumbnail.path !==
              'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708'
          : el,
      )
      .filter(el =>
        filters?.name
          ? el.name.toLowerCase().includes(filters.name.toLowerCase())
          : el,
      )
      .filter(el =>
        filters?.description
          ? el.description
              .toLowerCase()
              .includes(filters.description.toLowerCase())
          : el,
      )
      .filter(el =>
        filters?.comics
          ? el.comics.available === parseInt(filters?.comics)
          : el,
      );

    setDataFiltered(dataWithFilters);
  };

  return (
    <MainLayout>
      {isLoading ? (
        <Spinner animation="grow" />
      ) : errorMessage ? (
        <p className="text-danger">{errorMessage}</p>
      ) : (
        <>
          <div className="d-flex justify-content-start">
            <Button variant="light" onClick={() => setShowFilterModal(true)}>
              Filtres
            </Button>
            <Form.Control
              as="select"
              custom
              className="ml-4"
              onChange={e => setLimit(parseInt(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </Form.Control>
          </div>
          <DataTable
            dataToDisplay={dataToDisplay}
            sorts={sorts}
            setSorts={setSorts}
          />
          <MyPagination
            totalRecords={dataFiltered?.length}
            pageLimit={limit}
            pageNeighbours={1}
            onPageChanged={el => afterPageClicked(el)}
          />
          <ModalFilter
            showFilterModal={showFilterModal}
            setShowFilterModal={setShowFilterModal}
            filters={filters}
            setFilters={setFilters}
            afterFilter={afterFilter}
            resetFilters={resetFilters}
          />
        </>
      )}
    </MainLayout>
  );
};
