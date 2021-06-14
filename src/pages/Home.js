import React, {useEffect, useState} from 'react';
import md5 from 'md5';

const PUBLIC_KEY = 'af66011d5c351e12011e319ac86663e3';
const PRIVATE_KEY = 'c6576fb32d9f53f8db5accc7f72fe0ff0d7bab6d';

export const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    const ts = Number(new Date());
    const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);
    try {
      fetch(
        `https://gateway.marvel.com/v1/public/characters?ts=${ts}&orderBy=name&limit=10&offset=10&apikey=${PUBLIC_KEY}&hash=${hash}`,
      )
        .then(response => response.json())
        .then(result => {
          setData(result.data.results);
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

  return (
    <div className="d-flex justify-content-center align-items-center vw-50 vh-100 table-responsive-md">
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <table class="table table-striped table-hover p-4 m-4">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nom</th>
              <th scope="col">Description</th>
              <th scope="col">Nombre de comics</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 &&
              data.map(one => (
                <tr>
                  <th scope="row">{one.id}</th>
                  <td>{one.name}</td>
                  <td>{one.description}</td>
                  <td>{one.comics?.available}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
