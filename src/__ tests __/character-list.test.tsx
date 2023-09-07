import { MemoryRouter } from 'react-router-dom';
import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { CharacterList } from '../components/character-list';
import { fetchAllCharacters } from '../assets/utils/api';
import { MOCK_CHARACTERS_RESPONSE } from './mocks';
import { SEARCH_PLACEHOLDER } from '../components/nav-bar/constants';

// Mock the useDebounced hook and API function
jest.mock('../hooks/use-debounced', () => ({
  useDebounced: jest.fn(callback => callback),
}));
jest.mock('../assets/utils/api');

describe('CharacterList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with loading state', async () => {
    render(<CharacterList />);

    // Ensure Spinner is displayed while data is being fetched
    await waitFor(() => {
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('character-card')).not.toBeInTheDocument();
  });

  it('fetches characters and displays them when successful', async () => {
    // Mock an API response with characters
    (fetchAllCharacters as jest.Mock).mockResolvedValue(
      MOCK_CHARACTERS_RESPONSE
    );

    render(
      <MemoryRouter>
        <CharacterList />
      </MemoryRouter>
    );

    // Ensure Spinner disappears when data is fetched
    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();

      // Ensure CharacterCard components are displayed
      expect(screen.getAllByTestId('character-card')).toHaveLength(
        MOCK_CHARACTERS_RESPONSE.results.length
      );

      // Verify that the fetchAllCharacters function was called
      expect(fetchAllCharacters).toHaveBeenCalledWith(1, '');
    });
  });

  it('fetches characters with search query', async () => {
    render(
      <MemoryRouter>
        <CharacterList />
      </MemoryRouter>
    );

    act(() => {
      const searchInput = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);
      fireEvent.change(searchInput, { target: { value: 'rick' } });
    });

    // Ensure that the API is called with the updated search query
    await waitFor(() => {
      expect(fetchAllCharacters).toHaveBeenCalledWith(1, 'rick');
    });
  });

  it('fetches characters when pagination changes', async () => {
    render(
      <MemoryRouter>
        <CharacterList />
      </MemoryRouter>
    );

    // Mock an API response with characters
    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });

    // Trigger the "next" pagination
    act(() => {
      const nextButton = screen.getByTestId('next-page');
      fireEvent.click(nextButton);
    });

    // Ensure that the API is called with the updated page
    await waitFor(() => {
      expect(fetchAllCharacters).toHaveBeenCalledWith(1, '');
      expect(fetchAllCharacters).toHaveBeenCalledWith(2, '');
    });
  });
});
