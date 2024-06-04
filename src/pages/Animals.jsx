import React, { useState } from 'react';
import { Box, Button, Container, Flex, FormControl, FormLabel, Input, VStack, Text } from '@chakra-ui/react';
import { useAnimals, useAddAnimal, useUpdateAnimal, useDeleteAnimal } from '../integrations/supabase/index.js';

const Animals = () => {
  const { data: animals, isLoading, isError } = useAnimals();
  const addAnimalMutation = useAddAnimal();
  const updateAnimalMutation = useUpdateAnimal();
  const deleteAnimalMutation = useDeleteAnimal();

  const [newAnimal, setNewAnimal] = useState({ name: '', type: '', size: '', country_of_origin: '', average_lifetime: '' });
  const [editingAnimal, setEditingAnimal] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAnimal((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAnimal = () => {
    addAnimalMutation.mutate(newAnimal);
    setNewAnimal({ name: '', type: '', size: '', country_of_origin: '', average_lifetime: '' });
  };

  const handleUpdateAnimal = (animal) => {
    updateAnimalMutation.mutate(animal);
    setEditingAnimal(null);
  };

  const handleDeleteAnimal = (id) => {
    deleteAnimalMutation.mutate(id);
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading animals</Text>;

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input name="name" value={newAnimal.name} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Type</FormLabel>
          <Input name="type" value={newAnimal.type} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Size</FormLabel>
          <Input name="size" value={newAnimal.size} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Country of Origin</FormLabel>
          <Input name="country_of_origin" value={newAnimal.country_of_origin} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Average Lifetime</FormLabel>
          <Input name="average_lifetime" value={newAnimal.average_lifetime} onChange={handleChange} />
        </FormControl>
        <Button onClick={handleAddAnimal}>Add Animal</Button>

        <Box w="100%">
          {animals.map((animal) => (
            <Flex key={animal.id} justify="space-between" align="center" py={2}>
              {editingAnimal === animal.id ? (
                <>
                  <Input
                    name="name"
                    value={animal.name}
                    onChange={(e) => setEditingAnimal({ ...animal, name: e.target.value })}
                  />
                  <Input
                    name="type"
                    value={animal.type}
                    onChange={(e) => setEditingAnimal({ ...animal, type: e.target.value })}
                  />
                  <Input
                    name="size"
                    value={animal.size}
                    onChange={(e) => setEditingAnimal({ ...animal, size: e.target.value })}
                  />
                  <Input
                    name="country_of_origin"
                    value={animal.country_of_origin}
                    onChange={(e) => setEditingAnimal({ ...animal, country_of_origin: e.target.value })}
                  />
                  <Input
                    name="average_lifetime"
                    value={animal.average_lifetime}
                    onChange={(e) => setEditingAnimal({ ...animal, average_lifetime: e.target.value })}
                  />
                  <Button onClick={() => handleUpdateAnimal(editingAnimal)}>Save</Button>
                  <Button onClick={() => setEditingAnimal(null)}>Cancel</Button>
                </>
              ) : (
                <>
                  <Text>{animal.name}</Text>
                  <Text>{animal.type}</Text>
                  <Text>{animal.size}</Text>
                  <Text>{animal.country_of_origin}</Text>
                  <Text>{animal.average_lifetime}</Text>
                  <Button onClick={() => setEditingAnimal(animal.id)}>Edit</Button>
                  <Button onClick={() => handleDeleteAnimal(animal.id)}>Delete</Button>
                </>
              )}
            </Flex>
          ))}
        </Box>
      </VStack>
    </Container>
  );
};

export default Animals;