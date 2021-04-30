import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

const BasicStats = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/basic-stats").then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <>
      <Typography variant="h5" component="h2">
        Basic Stats of Dataset
      </Typography>
      <br />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Total items
              </TableCell>
              <TableCell>{data.total_items}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Unique Items
              </TableCell>
              <TableCell>{data.unique_items}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Average Items Sold Per day
              </TableCell>
              <TableCell>{data.average_items}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BasicStats;
