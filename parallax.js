document.addEventListener('mousemove', ev => {
  const mouseX = 2 * (ev.clientX / window.innerWidth) - 1;
  const mouseY = 2 * (ev.clientY / window.innerHeight) - 1;

  document.body.style.setProperty('--mouse-x', mouseX.toString());
  document.body.style.setProperty('--mouse-y', mouseY.toString());
});

document.addEventListener('scroll', () => {
  const distanceToBottom =
    document.body.clientHeight - window.innerHeight - window.scrollY;

  document.body.style.setProperty(
    '--distance-to-bottom',
    distanceToBottom.toString()
  );
});
