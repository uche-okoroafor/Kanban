import { getByText, render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import MockAuthProvider from '../../mocks/mockUseAuthProvider';

test('kanban title', async () => {
  render(<Dashboard />);
  const headerElement = screen.getByRole('heading', { name: 'Kanban' });
  expect(headerElement).toBeInTheDocument();
});

// describe('Dashboard tests', () => {
//   test('smoke test', () => {
//     render(
//       <MockAuthProvider>
//         <Dashboard />
//       </MockAuthProvider>,
//     );
//   });

//   test('loading snapshot test', () => {
//     const { asFragment } = render(
//       <MockAuthProvider>
//         <Dashboard />
//       </MockAuthProvider>,
//     );
//     expect(asFragment).toMatchSnapshot();
//   });

//   test('rendered messages snapshot test', () => {
//     const { asFragment } = render(
//       <MockAuthProvider>
//         <Dashboard />
//       </MockAuthProvider>,
//     );
//     expect(asFragment).toMatchSnapshot();
//   });

//   test('should have loading when waiting for auth provide to check if loggedIn', () => {
//     const { getByRole } = render(<Dashboard />);
//     expect(getByRole('progressbar')).toBeInTheDocument();
//   });

//   test('should have loading when waiting for auth provide to check if loggedIn', async () => {
//     const { getAllByText, getByPlaceholderText } = render(
//       <MockAuthProvider>
//         <Dashboard />
//       </MockAuthProvider>,
//     );
//     expect(getAllByText('Chats')).toHaveLength(1);
//     expect(getByPlaceholderText('Type something...')).toBeInTheDocument();
//   });
// });
