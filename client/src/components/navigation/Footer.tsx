import { Box, Container, Typography } from '@mui/material';
import styled from '@mui/material/styles/styled';

const Footer = () => {
  const FooterWrapper = styled(Container)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-around',
    gap: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      textAlign: 'center',
    },
  }));

  const FooterSectionTitle = styled(Typography)({
    textTransform: 'uppercase',
    fontWeight: 700,
  });

  return (
    <FooterWrapper>
      <Box>
        <FooterSectionTitle variant='subtitle1'>Get Help</FooterSectionTitle>
      </Box>
      <Box>
        <FooterSectionTitle variant='subtitle1'>About QZM</FooterSectionTitle>
      </Box>
      <Box>
        <FooterSectionTitle variant='subtitle1'>More From The Developer</FooterSectionTitle>
      </Box>
      <Box>
        <FooterSectionTitle variant='subtitle1'>Get In Touch</FooterSectionTitle>
      </Box>
    </FooterWrapper>
  );
};

export default Footer;
