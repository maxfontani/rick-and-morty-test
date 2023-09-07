import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CharacterCard } from '../components/character-card';
import { MOCK_CHARACTER } from './mocks';

describe('CharacterCard', () => {
  it('renders the component with character data', () => {
    render(
      <MemoryRouter>
        <CharacterCard character={MOCK_CHARACTER} />
      </MemoryRouter>
    );

    const cardTitle = screen.getByText(MOCK_CHARACTER.name);
    const cardImage = screen.getByRole('img');

    expect(cardTitle).toBeInTheDocument();
    expect(cardImage).toBeInTheDocument();
  });
});

//  In this test suite:
//     We render the CharacterCard component within a MemoryRouter to provide the necessary routing context.
//     We define a mock character object and pass it as a prop to the CharacterCard component during rendering.
//     We use screen.getByText to locate and assert the presence of the character's name and screen.getByRole('img') to locate and assert the presence of the image element.
