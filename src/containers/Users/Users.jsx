import { useEffect, useState } from "react";
import { useFetchUsers } from "../../../hooks/useFetchUsers";
import { Container } from "react-bootstrap";
import "./../../App.css";
import { InputSearch } from "../../components/InputSearch/InputSearch";
import { PageButton } from "../../components/PageButton/PageButton";

export const Users = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const users = useFetchUsers();
  const [searchText, setSearchText] = useState('');

  //GO TO FIRST PAGE WHEN SEARCH START
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  //HANDLER SEARCH
  const handleSearch = (text) => {
    if (text) {
      setSearchText(text.toLowerCase());
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchText) ||
          user.surname.toLowerCase().includes(searchText) ||
          user.email.toLowerCase().includes(searchText) ||
          user.id.toString().includes(searchText)
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    };
  };

  // CALCULATE START AND END INDEX FOR CURRENT PAGE
  const startIndex = (currentPage - 1) * 7;
  const endIndex = currentPage * 7;

  if (!users) {
    return <div>Cargando...</div>;
  };

  return (
    //RENDER USERS
    <Container className="containerData">
      <div className="containerDataScroll">

        {/* USERS TITLE */}
        <div className="dataBorder">
          <div className="dataTitle">Usuarios</div>
        </div>


        {/* INPUT SEARCH */}
        <InputSearch onSearch={handleSearch} />

        <div className="tableContainerData mt-4">
          <div className="tableDataRow">

            {/* USERS TABLE */}
            <div className="tableDataHeader">Nombre</div>
            <div className="tableDataHeader">Email</div>
          </div>


          {/* MAPPING USER DATA */}
          {filteredUsers.slice(startIndex, endIndex).map((user) => {
            return (
              <div className="tableDataRow" key={user.id}>
                <div className="tableDataData">{user.name} {user.surname}</div>
                <div className="tableDataData">{user.email}</div>
              </div>
            )
          })}
        </div>

        {/* PAGINATION */}
        {filteredUsers.length > 7 ? (
          <div className="d-flex justify-content-center align-items-center mt-4 mb-2">
            <PageButton
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              text={'◁'}
              design="left"
            />
            <div className="numberPage">{currentPage}</div>
            <PageButton
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={endIndex >= filteredUsers.length}
              text={'▷'}
              design="right"
            />
          </div>
        ) : ''}
      </div>
    </Container>
  );
};