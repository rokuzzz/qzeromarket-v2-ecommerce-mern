import { Box, Container, IconButton, Typography } from '@mui/material';
import styled from '@mui/material/styles/styled';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

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

  return (
    <FooterWrapper>
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
          More From The Developer
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
    </FooterWrapper>
  );
};

export default Footer;
