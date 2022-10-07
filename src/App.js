// @ts-check
import React, { useEffect, useState } from 'react';
import { useAddress, ConnectWallet, useContract, useContractRead } from "@thirdweb-dev/react";
import { Modal, Box, Typography, Card, CardMedia, CardContent, CardActions } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 345,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1,
};

const title =
  document.currentScript?.getAttribute('data-title') || '2021 Championship Chain';
const description =
  document.currentScript?.getAttribute('data-description') || 'This product is gated by an NFT. You must own this NFT to pass the gate. Connect your wallet to prove ownership.';
const image =
  document.currentScript?.getAttribute('data-image') || 'https://i.seadn.io/gae/nhPjtUKGvIjjTawa8Nl1C7MvQi2HjSB7DeAINfGitxFVcWFi3AUgimdCNtPTmoWMdIriWxtObWYHjgvu3CNmXyKg4V1v_ooUhZRTOQ?auto=format&w=3840';
const contractAddress =
  document.currentScript?.getAttribute('data-contract-address') || '0xB1c6F8CD00637FEb16aa426BBfb8220B0437beF4';

export function App() {
  const address = useAddress();
  const { contract } = useContract(contractAddress);
  const { data: balanceOf } = useContractRead(
    contract,
    "balanceOf",
    address,
    0,
  );
  const balance = balanceOf?.toNumber?.() || 0;

  const [open, setOpen] = useState(process.env.NODE_ENV === 'development' || window.location.pathname.includes('/products'));

  useEffect(() => {
    console.log(balance);
    if (balance === 0) return;

    setOpen(false);
  }, [balance]);

  return (
    <Modal
      open={open}
      onClose={() => {}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Card sx={{ boxShadow: 0 }}>
          <CardMedia
            component="img"
            sx={{ objectFit: 'contain', borderRadius: 2, width: '100%', height: '100%' }}
            image={image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
          <CardActions>
            <ConnectWallet />
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
}
