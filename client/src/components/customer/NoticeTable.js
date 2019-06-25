import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';

const NoticeTable = ({data}) => {
  return (
    <Paper style={{width:'100%', overflowX:'auto', marginBottom : '1rem'}}>
      <Table style={{minWidth:"650px"}}>
        <TableHead>
          <TableRow>
            <TableCell colspan="4" align="center">공지 제목</TableCell>
            <TableCell align="center">작성일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map(data => {
              return (
                  <TableRow key={data.seq} className="table-row">
                    <TableCell colspan="4" align="center">
                      <Link to={`/main/notice/view/${data.seq}`}>{data.title}</Link>
                    </TableCell>
                    <TableCell align="center">{data.created.substring(0,10)}</TableCell>
                  </TableRow>
              )  
            })
          }
        </TableBody>
      </Table>
    </Paper>
  );
}

export default NoticeTable;