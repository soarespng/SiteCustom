import { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import { Container, Grid2, Card, CardContent, Typography, Button, TextField, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const swiper = useSwiper();

  useEffect(() => {
    const fetchData = async () => {
      const { data: propertiesData } = await supabase.from('properties').select('*');
      if (propertiesData) {
        setProperties(propertiesData);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Container maxWidth={false} disableGutters style={{ position: 'relative', padding: 0 }}>
        <img
          src="https://images.squarespace-cdn.com/content/v1/5890b78186e6c0dcab4b46bb/1574622624744-ZEYTDS3RRJI8FMZ56HIX/TheOceanAgency-Indo.jpg?format=2500w"
          alt="Background"
          style={{ width: '100%', height: '85vh', objectFit: 'cover' }}
        />
        <Container maxWidth="sm" style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <Typography variant="h4" gutterBottom>Encontre um lar para chamar de seu</Typography>
          <form>
            <TextField fullWidth label="Cidade" margin="normal" />
            <TextField fullWidth label="Bairro" margin="normal" />
            <Grid2 container spacing={2}>
              <Grid2 item xs={6}>
                <TextField
                  select
                  fullWidth
                  label="Valor total até"
                  margin="normal"
                >
                  <MenuItem value="">Selecione</MenuItem>
                  {/* Adicione outras opções conforme necessário */}
                </TextField>
              </Grid2>
              <Grid2 item xs={6}>
                <TextField
                  select
                  fullWidth
                  label="Nº de quartos"
                  margin="normal"
                >
                  <MenuItem value="">Selecione</MenuItem>
                  {/* Adicione outras opções conforme necessário */}
                </TextField>
              </Grid2>
            </Grid2>
            <Button
              component={Link}
              to="/CreateHome"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '20px' }}
            >
              Buscar Imóveis
            </Button>
          </form>
        </Container>
      </Container>

      <Container maxWidth="lg" style={{ marginTop: '40px' }}>
        <Typography variant="h5" gutterBottom>Destaques</Typography>
        <Grid2 container spacing={4}>
          {properties.map((property) => (
            <Grid2 item key={property.id} xs={12} sm={6} md={4}>
              <Card>
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                >
                  {property.data.imagens && property.data.imagens.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        alt={`Imagem ${index + 1}`}
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                      />
                      <button onClick={() => swiper.slideNext()}></button>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {property.data.tipo}
                  </Typography>
                  <Typography variant="h6" component="h2">
                    {property.data.endereco.logradouro}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {property.data.endereco.bairro}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/property/${property.id}`}
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '10px' }}
                  >
                    Ver Detalhes
                  </Button>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </>
  );
};

export default Home;
