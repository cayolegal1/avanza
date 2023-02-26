import {Modal, Box, Typography, Button} from '@mui/material';
import { pxToRem } from '../services/helpers';

export const BaseModal = ({open, onClose, title, children, onSubmit, errors}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          background: "white",
          borderRadius: "10px",
          width: pxToRem(630),
          padding: `${pxToRem(30)} ${pxToRem(66)}`,
        }}
      >
        <Typography variant="h5" textAlign="center">
          {title}
        </Typography>
        <Box display="flex" flexDirection="column" gap={pxToRem(20)} mt={1}>
          {children}
        </Box>
        <Box display="flex" justifyContent="space-between" gap={pxToRem(16)} mt={2}>
          <Button variant="outlined" onClick={onClose} fullWidth>
            Cancelar
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={onSubmit}
            fullWidth
            disabled={Object.keys(errors).length > 0}
          >
            Crear
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
