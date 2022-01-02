import React, { useEffect } from "react";
import styled from "styled-components";
import { Button, Table } from "react-bootstrap";

import { FiSearch } from "react-icons/fi";
import { Filter, IconButton, MyLoader, TableData } from "../components";

import facultiesApi from "../api/faculties";
import { useDispatch, useSelector } from "react-redux";
import {
  facultiesReceived,
  facultiesRequested,
  facultiesRequestFailed,
  facultySorted,
  getFaculties,
} from "../store/faculties";

const filterItems = [
  { value: "All" },
  { id: 1, value: "Applied Physics" },
  { id: 2, value: "Computer Science" },
  { id: 3, value: "Industrial Psychology" },
  { id: 4, value: "Mathematics" },
];

export default function Faculties({ history }) {
  const dispatch = useDispatch();
  const faculties = useSelector(getFaculties);

  const filtered =
    faculties.sortBy && faculties.sortBy.id
      ? faculties.list.filter(
          (faculty) => faculty.dept === faculties.sortBy.value
        )
      : faculties.list;

  useEffect(() => {
    getFacultyList();
  }, []);

  const handleSearch = () => history.push("/dashboard/faculties/search");

  const getFacultyList = async () => {
    try {
      dispatch(facultiesRequested());
      const response = await facultiesApi.getFaculties();
      dispatch(facultiesReceived(response.data));
    } catch (error) {
      return dispatch(facultiesRequestFailed(error));
    }
  };

  const handleItemSelect = (item) => dispatch(facultySorted(item));

  const handleNavigateFaculty = (id) =>
    history.push(`/dashboard/faculties/${id}`);

  return (
    <Appcontainer>
      <AppHeader>
        <h4 className="m-0">Faculties</h4>
        <IconContainer>
          <Button onClick={handleSearch}>Search</Button>
        </IconContainer>
      </AppHeader>
      <Filter
        items={filterItems}
        selectedItem={faculties.sortBy}
        onSelectItem={handleItemSelect}
      />
      {faculties.loading ? (
        <MyLoader />
      ) : (
        <Table borderless className="mt-2 w-100">
          <TableHead>
            <TableHeader>Profile</TableHeader>
            <TableHeader>Email Address</TableHeader>
            <TableHeader>First Name</TableHeader>
            <TableHeader>Last Name</TableHeader>
            <TableHeader>Department</TableHeader>
            <TableHeader>Position</TableHeader>
          </TableHead>
          <tbody>
            {filtered.map((faculty) => (
              <TableData
                key={faculty._id}
                userInfo={faculty}
                onNavigate={handleNavigateFaculty}
              />
            ))}
          </tbody>
        </Table>
      )}
    </Appcontainer>
  );
}

const Appcontainer = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
  padding: 0.5rem;
`;

const AppHeader = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid ${(props) => props.theme.colors.secondary};
`;

const IconContainer = styled.div`
  > * {
    margin-left: 5px;
  }
`;

const TableHead = styled.thead`
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const TableHeader = styled.th`
  padding: 1rem;
  font-weight: 500;
`;
