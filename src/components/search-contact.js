import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useProvider } from "../context/provider";
import styles from "./style.module.css";
import {
  Container,
  Grid,
  InputAdornment,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import spaceimg from "../assets/swr.png";
import { visuallyHidden } from "@mui/utils";
import { styled } from "@mui/material/styles";
import LoadingContainer from "./loading-container";

const columns = [
  { id: "id", label: "ID", minWidth: 40 },
  { id: "name", label: "Name", minWidth: 40 },
  //{ id: "email", label: "Email", minWidth: 40 },
];

function TableHeader(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            className="tableheader"
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function SearchContact(props) {
  const { setContactData } = useProvider();
  const [rowdata, setRowdata] = useState();
  const [showdata, setShowdata] = useState([
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    },
  ]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("symbol");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showerror, setShowerror] = useState(false);
  const [searchs, setsearchs] = useState("");

  const getContacts = () => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      //.then((json) => console.log(json))
      .then((data) => {
        if (data.length > 0) {
          setShowerror(false);
          setLoading(false);
          setRowdata(data);
          setShowdata(data);
        } else {
          setShowerror(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        setShowerror(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    getContacts();
  }, []);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // Table property--------------------------

  const searchContact = (searchedContact) => {
    setsearchs(searchedContact);
    const filteredRows = rowdata.filter((row) => {
      return row.name
        .toString()
        .toLowerCase()
        .includes(searchedContact.toString().toLowerCase());
    });
    if (searchedContact.length < 1) {
      setShowdata(rowdata);
    } else {
      setShowdata(filteredRows);
    }
  };
  const handleTap = (params) => {
    setContactData(params);
  };
  if (loading) {
    return <LoadingContainer />;
  }
  if (showerror) {
    return (
      <>
        <div className="center-loading">
          <div className="error-container">
            <img alt="..." src={spaceimg} className="errorimg" />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <Container sx={{ marginBottom: 1 }}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <TextField
                id="outlined-basic"
                label="Search Contact"
                variant="outlined"
                size="medium"
                value={searchs}
                onChange={(e) => searchContact(e.target.value)}
                sx={{ m: 1, width: "30ch" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Name: </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Container>

        <Grid container justifyContent="center">
          <Paper sx={{ width: "100%" }} elevation={3}>
            <TableContainer
              component={Paper}
              sx={{ maxHeight: 440, minHeight: 240 }}
            >
              <Table stickyHeader={true}>
                <TableHeader
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={showdata.length}
                />
                {showdata.length > 0 ? (
                  <TableBody>
                    {stableSort(showdata, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <StyledTableRow
                            hover
                            tabIndex={-1}
                            key={row.symbol}
                            onClick={() => handleTap(row)}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} onClick={() => {}}>
                                  {value}
                                </TableCell>
                              );
                            })}
                            <TableCell></TableCell>
                          </StyledTableRow>
                        );
                      })}
                  </TableBody>
                ) : (
                  <TableBody>
                    <TableCell textAlign="center">
                      <Typography variant="body1"></Typography>
                      <p>No Contact Found</p>
                    </TableCell>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[2, 5, 10]}
              component="div"
              count={showdata.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </div>
    </>
  );
}
