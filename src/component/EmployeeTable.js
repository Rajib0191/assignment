import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TablePagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import ButtonComp from "./utils/Button";

const EmployeeTable = ({ employees }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ background: "#42a5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                First Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                Last Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                Employee Type
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                Division
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "#fff" }}
              >
                District
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "#fff" }}
              >
                View Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((employee) => (
                <TableRow key={employee.empID}>
                  <TableCell>{employee.firstName}</TableCell>
                  <TableCell>{employee.lastName}</TableCell>
                  <TableCell>{employee.employeeType}</TableCell>
                  <TableCell>{employee.disvision}</TableCell>
                  <TableCell align="center">{employee.district}</TableCell>
                  <TableCell align="center">
                    <Link to={`/users/${employee.empID}`}>
                      <ButtonComp
                        variant={"contained"}
                        size={"small"}
                        color={"success"}
                        placeholder={"Details"}
                      ></ButtonComp>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[7, 10, 15]}
        component="div"
        count={employees?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default EmployeeTable;
