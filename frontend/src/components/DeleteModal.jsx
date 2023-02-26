import React from 'react';
import {Modal, Box, Typography, Button} from '@mui/material';
import { pxToRem } from '../services/helpers';


export const DeleteModal = ({open, onClose, onDelete}) => {
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
          Quieres eliminar este registro?
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          gap={pxToRem(16)}
          mt={2}
        >
          <Button variant="outlined" onClick={onClose} fullWidth>
            Cancelar
          </Button>
          <Button
            variant="outlined"
            color='error'
            onClick={onDelete}
            fullWidth
          >
            Eliminar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
