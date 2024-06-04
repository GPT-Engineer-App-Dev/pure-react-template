import React, { useState } from 'react';
import { Box, Button, Container, Flex, FormControl, FormLabel, Input, VStack, Text } from '@chakra-ui/react';
import { useAnimals, useAddAnimal, useUpdateAnimal, useDeleteAnimal } from '../integrations/supabase/index.js';

const Animals = () => {
  const { data: animals, isLoading, isError } = useAnimals();
  const addAnimalMutation = useAddAnimal();
  const updateAnimalMutation = useUpdateAnimal();
  const deleteAnimalMutation = useDeleteAnimal();

  const [newAnimal, setNewAnimal] = useState({ name: '', species: '', age: '', habitat: '' });
  const [editingAnimal, setEditingAnimal] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAnimal((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAnimal = () => {
    addAnimalMutation.mutate(newAnimal);
    setNewAnimal({ name: '', species: '', age: '', habitat: '' });
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
          <FormLabel>Species</FormLabel>
          <Input name="species" value={newAnimal.species} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Age</FormLabel>
          <Input name="age" value={newAnimal.age} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Habitat</FormLabel>
          <Input name="habitat" value={newAnimal.habitat} onChange={handleChange} />
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
                    name="species"
                    value={animal.species}
                    onChange={(e) => setEditingAnimal({ ...animal, species: e.target.value })}
                  />
                  <Input
                    name="age"
                    value={animal.age}
                    onChange={(e) => setEditingAnimal({ ...animal, age: e.target.value })}
                  />
                  <Input
                    name="habitat"
                    value={animal.habitat}
                    onChange={(e) => setEditingAnimal({ ...animal, habitat: e.target.value })}
                  />
                  <Button onClick={() => handleUpdateAnimal(editingAnimal)}>Save</Button>
                  <Button onClick={() => setEditingAnimal(null)}>Cancel</Button>
                </>
              ) : (
                <>
                  <Text>{animal.name}</Text>
                  <Text>{animal.species}</Text>
                  <Text>{animal.age}</Text>
                  <Text>{animal.habitat}</Text>
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