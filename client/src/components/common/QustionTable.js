import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';

const QustionTable = ({data}) => {
  return (
    <Paper style={{width:'100%', overflowX:'auto', marginBottom : '1rem'}}>
      <Table style={{minWidth:"650px"}}>
        <TableHead>
          <TableRow>
            {/* <TableCell align="center">번호</TableCell> */}
            <TableCell align="center">제목</TableCell>
            <TableCell align="center">글쓴이</TableCell>
            <TableCell align="center">작성일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map(data => {
              return (
                data.bIndent === 0 
                ? (
                  <TableRow key={data.seq} className="table-row">
                    <TableCell align="center">
                      <Link to={`/main/customer/question/view/${data.bId}`}>{data.bTitle}</Link>
                    </TableCell>
                    <TableCell align="center">{data.bName}님</TableCell>
                    <TableCell align="center">{data.bDate.substring(0,10)}</TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={data.seq} style={{backgroundColor : '#dfdfdf'}}>
                    <TableCell align="right">
                      <Link to={`/main/customer/question/view/${data.bId}`}>Re : {data.bTitle}</Link>
                    </TableCell>
                    <TableCell align="center">관리자</TableCell>
                    <TableCell align="center">{data.bDate.substring(0,10)}</TableCell>
                  </TableRow>
                )
              )  
            })
          }
        </TableBody>
      </Table>
    </Paper>
  );
}

export default QustionTable;