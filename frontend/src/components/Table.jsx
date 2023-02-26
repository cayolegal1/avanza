import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const BaseTable = ({tableData}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          <TableRow>
            {tableData.columns.map((k, key) => (
              <TableCell key={`${key}_label_${k}`} sx={{fontWeight: 'bold'}}>
                {k.Header}
              </TableCell>
            ))}
          </TableRow>
          {(!tableData.rows || !tableData.rows[0])
            ? <TableRow className="t_body_tr">
                <TableCell>Data Not found</TableCell>
              </TableRow>
            : tableData.rows.map((row, i) => (
              <TableRow
                key={i}
                className="t_body_tr_default"
              >
                {tableData.columns.map((k, ii) => {
                  return (
                    <TableCell key={`${i}_${ii}`}>
                        {k.accesor !== 'actions'
                          ? row[k.accesor].toString()
                          : row[k.accesor]
                        }
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