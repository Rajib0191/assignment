import React, { useState } from "react";
import Loading from "./misc/Loading";
import ErrorComponent from "./misc/ErrorComponent";
import { Grid } from "@mui/material";
import AddUserModal from "./modal/AddUserModal";
import useUserList from "../hooks/useUserList";
import EmployeeTable from "./EmployeeTable";
import NoDataFound from "./misc/NoDataFound";
import SearchComponent from "./SearchComponent";

const AdminComponent = ({ filterValue }) => {
  const { data, loading, error } = useUserList(filterValue);
  const [searchText, setSearchText] = useState("");
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  let content = null;
  if (loading) {
    content = <Loading />;
  } else if (error) {
    content = <ErrorComponent />;
  } else if (data && data.length > 0) {
    const filteredData = data.filter((item) =>
      item.firstName.toLowerCase().includes(searchText)
    );
    if (filteredData.length > 0) {
      content = <EmployeeTable employees={filteredData} />;
    } else {
      content = <NoDataFound />;
    }
  }
  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <SearchComponent
        searchValue={searchText}
        onChange={(e) => setSearchText(e.target.value.toLowerCase())}
        onClick={() => setShowAddUserModal(true)}
      />

      {content}

      {showAddUserModal && (
        <AddUserModal
          open={showAddUserModal}
          close={() => setShowAddUserModal(false)}
        />
      )}
    </Grid>
  );
};

export default AdminComponent;
