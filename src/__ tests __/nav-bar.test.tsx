import { act, render, screen, fireEvent } from '@testing-library/react';
import { NavBar } from '../components/nav-bar';
import { SEARCH_PLACEHOLDER } from '../components/nav-bar/constants';
import { GetAllCharactersResponse } from '../models/api';

describe('NavBar', () => {
  it('renders the component with arrow icons and input field', () => {
    const mockPaginationInfo = {
      count: 5,
      pages: 34,
      prev: 'prev-url',
      next: 'next-url',
    };
    const mockGetChangePageHandler = jest.fn();
    const mockOnChangeSearch = jest.fn();

    render(
      <NavBar
        paginationInfo={mockPaginationInfo}
        getChangePageHandler={mockGetChangePageHandler}
        onChangeSearch={mockOnChangeSearch}
      />
    );

    const prevArrow = screen.getByAltText('Prev Page');
    const nextArrow = screen.getByAltText('Next Page');
    const inputField = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);

    expect(prevArrow).toBeInTheDocument();
    expect(nextArrow).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
  });

  it('hides prev arrow icon when no prev page exists', () => {
    const mockPaginationInfo = {
      count: 5,
      pages: 34,
      prev: null,
      next: 'next-url',
    } as GetAllCharactersResponse['info'];

    const mockGetChangePageHandler = jest.fn();
    const mockOnChangeSearch = jest.fn();

    render(
      <NavBar
        paginationInfo={mockPaginationInfo}
        getChangePageHandler={mockGetChangePageHandler}
        onChangeSearch={mockOnChangeSearch}
      />
    );

    const prevArrow = screen.queryByAltText('Prev Page');
    const nextArrow = screen.queryByAltText('Next Page');

    expect(prevArrow).not.toBeInTheDocument();
    expect(nextArrow).toBeInTheDocument();
  });

  it('hides next arrow icon when no next page exists', () => {
    const mockPaginationInfo = {
      count: 5,
      pages: 34,
      prev: 'perv-url',
      next: null,
    } as GetAllCharactersResponse['info'];

    const mockGetChangePageHandler = jest.fn();
    const mockOnChangeSearch = jest.fn();

    render(
      <NavBar
        paginationInfo={mockPaginationInfo}
        getChangePageHandler={mockGetChangePageHandler}
        onChangeSearch={mockOnChangeSearch}
      />
    );

    const prevArrow = screen.queryByAltText('Prev Page');
    const nextArrow = screen.queryByAltText('Next Page');

    expect(prevArrow).toBeInTheDocument();
    expect(nextArrow).not.toBeInTheDocument();
  });

  it('calls getChangePageHandler when clicking the arrow icons', () => {
    const mockPaginationInfo = {
      count: 5,
      pages: 34,
      prev: 'prev-url',
      next: 'next-url',
    };
    const mockGetChangePageHandler = jest.fn();
    const mockOnChangeSearch = jest.fn();

    render(
      <NavBar
        paginationInfo={mockPaginationInfo}
        getChangePageHandler={mockGetChangePageHandler}
        onChangeSearch={mockOnChangeSearch}
      />
    );

    const prevArrow = screen.getByAltText('Prev Page');
    const nextArrow = screen.getByAltText('Next Page');

    act(() => {
      fireEvent.click(prevArrow);
      fireEvent.click(nextArrow);
    });

    expect(mockGetChangePageHandler).toHaveBeenCalledTimes(2);
    expect(mockGetChangePageHandler).toHaveBeenCalledWith('prev');
    expect(mockGetChangePageHandler).toHaveBeenCalledWith('next');
  });

  it('calls onChangeSearch when changing the input field', () => {
    const mockPaginationInfo = {
      count: 5,
      pages: 34,
      prev: 'prev-url',
      next: 'next-url',
    };
    const mockGetChangePageHandler = jest.fn();
    const mockOnChangeSearch = jest.fn();

    render(
      <NavBar
        paginationInfo={mockPaginationInfo}
        getChangePageHandler={mockGetChangePageHandler}
        onChangeSearch={mockOnChangeSearch}
      />
    );

    const inputField = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);

    fireEvent.change(inputField, { target: { value: 'search-value' } });

    expect(mockOnChangeSearch).toHaveBeenCalledTimes(1);
    expect(mockOnChangeSearch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'change' })
    );
  });
});
