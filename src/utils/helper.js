export function sleep(duration = 3000) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}
