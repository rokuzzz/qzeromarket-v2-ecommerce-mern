import { Box, Container, Divider, IconButton, Typography } from '@mui/material';
import styled from '@mui/material/styles/styled';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  const FooterLinkWrapper = styled(Container)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: 'auto',
    margin: '12px 24px 24px',
    [theme.breakpoints.down('md')]: {
      margin: '12px 0px 24px',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      textAlign: 'center',
    },
  }));

  const FooterSectionTitle = styled(Typography)({
    textTransform: 'uppercase',
    fontSize: '0.9rem',
    fontWeight: 700,
    lineHeight: 3,
  });

  const FooterLink = styled(Typography)(({ theme }) => ({
    fontSize: '0.8rem',
    fontWeight: 300,
    lineHeight: 2,
    cursor: 'pointer',
    '&:hover': {
      opacity: '70%',
    },
  }));

  const CopyrightText = styled(Typography)({
    fontSize: '0.8rem',
    fontWeight: 500,
    lineHeight: 2,
  });

  return (
    <>
      <Divider variant='middle' />
      <FooterLinkWrapper maxWidth={false}>
        <Box>
          <FooterSectionTitle variant='subtitle1'>Get Help</FooterSectionTitle>
          <FooterLink>Order Status</FooterLink>
          <FooterLink>Shipping and Delivery</FooterLink>
          <FooterLink>Returns</FooterLink>
          <FooterLink>Payment Options</FooterLink>
          <FooterLink>Contact Us</FooterLink>
        </Box>
        <Box>
          <FooterSectionTitle variant='subtitle1'>About QZM</FooterSectionTitle>
          <FooterLink>About Us</FooterLink>
          <FooterLink>News</FooterLink>
          <FooterLink>Careers at QZM</FooterLink>
          <FooterLink>Investors</FooterLink>
        </Box>
        <Box>
          <FooterSectionTitle variant='subtitle1'>
            From the Dev
          </FooterSectionTitle>
          <FooterLink>Nokia Luncher</FooterLink>
          <FooterLink>QZM V1</FooterLink>
          <FooterLink>Fake Store API</FooterLink>
          <FooterLink>Other Projects</FooterLink>
        </Box>
        <Box>
          <FooterSectionTitle variant='subtitle1'>
            Get In Touch
          </FooterSectionTitle>
          <FooterLink>Developer Social Media</FooterLink>
          <IconButton aria-label='Instagram'>
            <InstagramIcon />
          </IconButton>
          <IconButton aria-label='LinkedIn'>
            <LinkedInIcon />
          </IconButton>
          <IconButton aria-label='GitHub'>
            <GitHubIcon />
          </IconButton>
        </Box>
      </FooterLinkWrapper>
      <Divider variant='middle' />
      <Container
        sx={{
          height: '70px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CopyrightText>© 2023 QZM</CopyrightText>
      </Container>
    </>
  );
};

export default Footer;
