import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BasePerson, BaseRoom, BaseBooking, DataTableData } from '../pages/types';


// type LayoutProps = {
//   data: DataTableData
// }

export const BaseLayout = ({data}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          <TableRow>
            {data.columns.map((k, key) => (
              <TableCell key={`${key}_label_${k}`}>
                {k.Header}
              </TableCell>
            ))}
          </TableRow>
          {(!data.rows || !data.rows[0])
            ? <TableRow className="t_body_tr">
                <TableCell>Not found data</TableCell>
              </TableRow>
            : data.rows.map((row, i) => (
              <TableRow
                key={i}
                className="t_body_tr_default"
              >
                {data.columns.map((k, ii) => {
                  console.log(row[k.accesor])
                  return (
                    <TableCell key={`${i}_${ii}`}>
                        {/* @ts-ignore */}
                        {JSON.stringify(row)}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
