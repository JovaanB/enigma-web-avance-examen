import React from 'react';
import {FaArrowDown, FaArrowUp} from 'react-icons/fa';

export const DataTable = ({dataToDisplay, sorts, setSorts}) => {
  return (
    <div
      className="table-responsive-md mx-2 my-2"
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
            <th scope="col" onClick={() => setSorts(!sorts)}>
              Nom {sorts ? <FaArrowDown /> : <FaArrowUp />}
            </th>
            <th scope="col">Description</th>
            <th scope="col">Nombre de comics</th>
          </tr>
        </thead>
        <tbody>
          {dataToDisplay?.length > 0 &&
            dataToDisplay.map(one => (
              <tr key={one.id}>
                <td scope="col">
                  <img
                    src={`${one.thumbnail.path}.${one.thumbnail.extension}`}
                    alt={one.id}
                    width="40px"
                  />
                </td>
                <td scope="row">{one.id}</td>
                <td>{one.name}</td>
                <td>{one.description}</td>
                <td>{one.comics?.available}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
