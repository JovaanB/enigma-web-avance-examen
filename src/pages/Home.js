import React, {useEffect, useState} from 'react';
import md5 from 'md5';

import {Spinner, Button} from 'react-bootstrap';
import {MainLayout} from '../components/layout/MainLayout';
import MyPagination from '../components/utils/MyPagination';
import {ModalFilter} from '../components/home/ModalFilter';

const PUBLIC_KEY = 'af66011d5c351e12011e319ac86663e3';
const PRIVATE_KEY = 'c6576fb32d9f53f8db5accc7f72fe0ff0d7bab6d';

export const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [totalData, setTotalData] = useState(0);

  const ts = Number(new Date());
  const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);
  const offset = currPage > 0 ? (currPage - 1) * 10 : 10;

  const fetchData = () => {
    setIsLoading(true);
    try {
      fetch(
        `https://gateway.marvel.com/v1/public/characters?ts=${ts}&orderBy=name&limit=10&offset=${offset}&apikey=${PUBLIC_KEY}&hash=${hash}`,
      )
        .then(response => response.json())
        .then(result => {
          setData(result.data.results);
          totalData < 1 && setTotalData(result.data.total);
          setIsLoading(false);
        });
    } catch (e) {
      console.log('Error: ', e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetch(
      `https://gateway.marvel.com/v1/public/characters?ts=${ts}&orderBy=name&limit=10&offset=${offset}&apikey=${PUBLIC_KEY}&hash=${hash}`,
    )
      .then(response => response.json())
      .then(result => {
        setData(result.data.results);
      });
  }, [currPage]);

  const afterPageClicked = pageNumber => {
    setCurrPage(pageNumber.currentPage);
  };

  return (
    <MainLayout>
      {isLoading ? (
        <Spinner animation="grow" />
      ) : (
        <>
          <Button variant="light" onClick={() => setShowFilterModal(true)}>
            Filtres
          </Button>
          <div
            className="table-responsive-md"
            style={{
              display: 'block',
              position: 'relative',
              height: '75vh',
              overflow: 'auto',
              width: '75vw',
            }}
          >
            <table
              className="table table-striped table-hover p-4 m-4"
              style={{maxHeight: '50vh', maxWidth: '70vw'}}
            >
              <thead>
                <tr>
                  <th scope="col">Photo</th>
                  <th scope="col">ID</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Description</th>
                  <th scope="col">Nombre de comics</th>
                </tr>
              </thead>
              <tbody>
                {data?.length > 0 &&
                  data.map(one => (
                    <tr key={one.id}>
                      <th scope="col">
                        <img
                          src={`${one.thumbnail.path}.${one.thumbnail.extension}`}
                          alt={one.id}
                          width="40px"
                        />
                      </th>
                      <th scope="row">{one.id}</th>
                      <td>{one.name}</td>
                      <td>{one.description}</td>
                      <td>{one.comics?.available}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <MyPagination
            totalRecords={totalData}
            pageLimit={10}
            pageNeighbours={1}
            onPageChanged={el => afterPageClicked(el)}
          />
          <ModalFilter
            showFilterModal={showFilterModal}
            setShowFilterModal={setShowFilterModal}
          />
        </>
      )}
    </MainLayout>
  );
};
