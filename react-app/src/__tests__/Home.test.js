import React from 'react';
import { render , fireEvent } from '@testing-library/react';
import Home from '../components/Home/Home';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Home', () => {
  test('renders Home component without crashing', () => {
    render(<Home />);
  });

  test("updates nameValue state on input change", () => {
    const { getByPlaceholderText } = render(<Home />);
  
    const inputElement = getByPlaceholderText("Player Name");
    fireEvent.change(inputElement, { target: { value: "John Doe" } });
  
    expect(inputElement.value).toBe("John Doe");
  });

  test("updates roomValue state on input change", () => {
    const { container, getByText } = render(<Home />);
  
    const roomDropdown = container.querySelector('#dropdown-basic');  
    expect(roomDropdown).toBeInTheDocument();
    fireEvent.click(roomDropdown);

    const room1Element = getByText("Room 1");
    expect(room1Element).toBeInTheDocument();
    fireEvent.click(room1Element);
  });

});
