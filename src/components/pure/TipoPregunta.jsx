import React from "react";
import { Box, Button, Center, Heading, Stack } from "@chakra-ui/react";
import { Link } from "wouter";

export default function TipoPregunta() {
  return (
    <Box>
      <Center>
        <Heading mt="100px" textAlign="center" fontSize={["lg", "xl"]} mb={4}>
          Seleccione un tipo de pregunta
        </Heading>
      </Center>
      <Center>
        <Stack
          direction={["column", "column", "row"]}
          spacing={2}
          alignItems={["center", "flex-start"]}
          mt="100px"
        >
          <Button
            as={Link}
            to="/formularioPreguntaSimple" // Cambia Link por la ruta directa
            bgColor="principal.100"
            textColor="white"
            w={["100%", "100%", "250px"]}
            display="flex"
            alignItems="center"
            borderRadius="18px"
            _hover={{ backgroundColor: "fondo.100" }}
            mb={[2, 2, 0]}
          >
            Preguntas Simples
          </Button>
          <Button
            as={Link}
            to="/formularioPreguntaImagen"
            bgColor="principal.100"
            textColor="white"
            w={["100%", "100%", "250px"]}
            _hover={{ backgroundColor: "fondo.100" }}
            display="flex"
            alignItems="center"
            borderRadius="18px"
          >
            Preguntas con Imagen
          </Button>
        </Stack>
      </Center>
    </Box>
  );
}
