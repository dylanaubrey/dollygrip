import concurrently from 'concurrently';

export default async () => {
  try {
    await concurrently([
      {
        command: 'lerna run compile-watch --stream --parallel',
      },
    ]);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
};
