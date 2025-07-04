import { Container, Typography, Box } from "@mui/material";

const About = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "calc(100vh - 64px)", // Full screen minus navbar
        backgroundColor: "#fefefe",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        boxSizing: "border-box",
      }}
    >
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          What are PFAS?
        </Typography>
        <Typography paragraph>
          PFAS (Per- and Polyfluoroalkyl Substances) are a group of man-made chemicals
          that are widely used for their water- and grease-resistant properties. They
          are often found in non-stick cookware, waterproof clothing, cosmetics, food
          packaging, and cleaning products.
        </Typography>

        <Typography paragraph>
          PFAS are also known as "forever chemicals" because they do not break down
          easily in the environment or the human body. Some of the most well-known PFAS include:
        </Typography>

        <ul>
          <li>
            <strong>PFOA</strong> – Linked to kidney and testicular cancer
          </li>
          <li>
            <strong>PFOS</strong> – Associated with thyroid disease and immune system effects
          </li>
          <li>
            <strong>GenX</strong> – A newer PFAS with similar health concerns
          </li>
        </ul>

        <Typography paragraph>
          Exposure to PFAS may lead to health issues including cancer, hormone disruption,
          immune system suppression, liver damage, and developmental problems in children.
        </Typography>

        <Typography paragraph>
          Always check product ingredient lists and consider alternatives that are labeled PFAS-free.
        </Typography>
      </Container>
    </Box>
  );
};

export default About;

