import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LoginWrapper = styled(Grid)(({ theme }) => ({
  height: '100vh',
  backgroundColor: theme.palette.background.default,
}));

export const LoginBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));