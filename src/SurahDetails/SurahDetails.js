import React from "react";
import {
  Box,
  Divider,
  Grid,
  GridItem,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

const SurahDetails = ({ audioSurahData }) => {
  const titleColor = useColorModeValue("yellow.400", "yellow.600");
  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Box>
      {audioSurahData && (
        <Box
          p={5}
          shadow="md"
          borderWidth={2}
          borderColor="yellow.400"
          bg={useColorModeValue("gray.100", "gray.700")}
          mb={5}
          rounded="md"
        >
          <Heading
            as="h4"
            size="md"
            color={titleColor}
            fontFamily="Courier New"
            textAlign="center"
            mb={4}
            textShadow="2px 2px 4px #000000"
          >
            {audioSurahData.name}
          </Heading>
          <Divider borderColor={titleColor} />
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            gap={6}
            justifyContent="center"
            alignItems="center"
            mt={4}
          >
            <GridItem>
              <VStack align="center">
                <Text color={textColor}>Number</Text>
                <Text color={textColor}>{audioSurahData.number}</Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack align="center">
                <Text color={textColor}>English Name</Text>
                <Text color={textColor}>{audioSurahData.englishName}</Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack align="center">
                <Text color={textColor}>Revelation Type</Text>
                <Text color={textColor}>{audioSurahData.revelationType}</Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack align="center">
                <Text color={textColor}>English Name Translation</Text>
                <Text color={textColor}>
                  {audioSurahData.englishNameTranslation}
                </Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack align="center">
                <Text color={textColor}>Number of Ayahs</Text>
                <Text color={textColor}>{audioSurahData.numberOfAyahs}</Text>
              </VStack>
            </GridItem>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default SurahDetails;
