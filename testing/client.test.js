import formatURLToBeHomepage from '../client/client';

test('url is reformatted to point to homepage', () => {
  expect(formatURLToBeHomepage('http://localhost:3000/trivia')).toEqual(
    'http://localhost:3000/'
  );
  expect(
    formatURLToBeHomepage(
      'https://clash-of-software-engineers.herokuapp.com/trvia'
    )
  ).toEqual('https://clash-of-software-engineers.herokuapp.com/');
});
