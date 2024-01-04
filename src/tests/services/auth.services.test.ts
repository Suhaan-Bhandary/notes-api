describe('env', () => {
  test('hi', () => {
    console.log(process.env['DATABASE']);
    expect(1 + 2).toBe(3);
  });
});
